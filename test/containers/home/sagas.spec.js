import 'babel-polyfill';
import { expect }                from 'chai';
import { takeLatest }            from 'redux-saga';
import { call, put, take }       from 'redux-saga/effects';
import {
  REQUEST_SUBSCRIPTIONS,
  REQUEST_COMMENTS,
  requestSubscriptionsSucceeded,
  requestSubscriptionsFailed,
  requestSubscriptionsLoading,
  requestCommentsSucceeded,
  requestCommentsFailed,
  requestCommentsLoading
}                                from 'containers/home/actions';
import {
  API_SUBSCRIPTIONS,
  API_COMMENTS,
  fetchCommentsSaga,
  fetchComments,
  fetchCommentsFromServer,
  fetchSubscriptionsSaga,
  fetchSubscriptions,
  fetchSubscriptionsFromServer
}                                from 'containers/home/sagas';
import SagaInjector              from 'inject-loader!containers/home/sagas';
import { showAlert }             from 'containers/app/actions';
import nock                      from 'nock';

describe('Containers :: Home :: Sagas ::', () => {
  it('should listen to request comments action', () => {
    const fakeAction = {
      type: REQUEST_COMMENTS,
      page: 1,
      limit: 1
    };
    const generator     = fetchCommentsSaga();
    const expectedYield = take(fakeAction.type);
    const actualYield   = generator.next().value;

    expect(actualYield).to.deep.equal(expectedYield);
  });

  it.skip('should fire request comments loading, fetch comments from server, comments succeeded actions', () => {
    const fakeAction = {
      type: REQUEST_COMMENTS,
      page: 1,
      limit: 1
    };
    const comments = ['first', 'second'];
    const generator = fetchComments(fakeAction);

    const expectedFirstYield = put(requestCommentsLoading());
    // const expectedSecondYield = call(fetchCommentsFromServer, fakeAction.page, fakeAction.limit);
    const expectedThirdYield = put(requestCommentsSucceeded(comments));


    const actualFirstYield = generator.next().value;
    // const actualSecondYield = generator.next().value;
    const actualThirdYield = generator.next(comments).value;

    expect(actualFirstYield).to.deep.equal(expectedFirstYield);
    // expect(actualSecondYield).to.deep.equal(expectedSecondYield);
    expect(actualThirdYield).to.deep.equal(expectedThirdYield);
  });

  it('should fire request comments failed and show alert if failed to retrieve comments', () => {
    const fetchCommentsInjected = SagaInjector({
      './actions': {
        requestCommentsLoading () { throw new Error('somthing happened'); },
        requestCommentsFailed: requestCommentsFailed
      }
    }).fetchComments;
    const fakeAction = {
      type: REQUEST_COMMENTS
    };
    const message = 'Unable to retrieve comments';
    const generator = fetchCommentsInjected(fakeAction);

    expect(generator.next().value).to.deep.equal(put(showAlert({ message, type: 'error'})));
    expect(generator.next().value).to.deep.equal(put(requestCommentsFailed()));
  });

  it('should fetch comments from db', done => {
    const comments = ['first', 'second'];
    const page = 1;
    const limit = 1;
    const fakeResponse = {
      data: comments,
      metadata: {
        page: page,
        limit: limit
      }
    };

    const scope = nock('http://localhost')
      .get(`${API_COMMENTS}?page=${page}&limit=${limit}`)
      .reply(200, fakeResponse);

    const thePromise = fetchCommentsFromServer(page, limit);

    thePromise.then(res => {
      expect(res).to.deep.equal({
        comments: comments,
        page: page,
        limit: limit
      });
      done();
    });
  });

  it.skip('should throw error if not able to fetch comments', done => {
    const page = 1;
    const limit = 1;
    const scope = nock('http://localhost')
      .get(`${API_COMMENTS}?page=${page}&limit=${limit}`)
      .reply(500, 'Some server error');

    const thePromise = fetchCommentsFromServer(page, limit);

    thePromise.then(res => {
      expect(res).to.be.equal('Unable to fetch comments');
      done();
    });
  });

  it('should listen to fetch subscriptions request', () => {
    const generator = fetchSubscriptionsSaga();
    const expectedYield = take(REQUEST_SUBSCRIPTIONS);
    const actualYield = generator.next().value;

    expect(actualYield).to.deep.equal(expectedYield);
  });

  it.skip('should fire request subscriptions loading, fetch subscriptions from server and request subscriptions succeeded', () => {
    const subscriptions = ['first', 'second'];
    const generator = fetchSubscriptions();

    const expectedFirstYield = put(requestSubscriptionsLoading());
    // const expectedSecondYield = call(fetchSubscriptionsFromServer);
    const expectedThirdYield = put(requestSubscriptionsSucceeded(subscriptions));


    const actualFirstYield = generator.next().value;
    // const actualSecondYield = generator.next().value;
    const actualThirdYield = generator.next(subscriptions).value;

    expect(actualFirstYield).to.deep.equal(expectedFirstYield);
    // expect(actualSecondYield).to.deep.equal(expectedSecondYield);
    expect(actualThirdYield).to.deep.equal(expectedThirdYield);
  });

  it('should fire request subscriptions failed and show alert if failed to retrieve subscriptions', () => {
    const fetchSubscriptionsInjected = SagaInjector({
      './actions': {
        requestSubscriptionsLoading () { throw new Error('somthing happened'); },
        requestSubscriptionsFailed: requestSubscriptionsFailed
      }
    }).fetchSubscriptions;
    const fakeAction = {
      type: REQUEST_COMMENTS
    };
    const message = 'Unable to retrieve subscriptions';
    const generator = fetchSubscriptionsInjected(fakeAction);

    expect(generator.next().value).to.deep.equal(put(showAlert({ message, type: 'error'})));
    expect(generator.next().value).to.deep.equal(put(requestSubscriptionsFailed()));
  });

  it('should fetch subscriptions from db', done => {
    const subscriptions = ['first', 'second'];

    const scope = nock('http://localhost')
      .get(API_SUBSCRIPTIONS)
      .reply(200, { data: subscriptions });

    const thePromise = fetchSubscriptionsFromServer();

    thePromise.then(res => {
      expect(res).to.deep.equal(subscriptions);
      done();
    });
  });

  it.skip('should throw error if not able to fetch subscriptions', done => {
    const scope = nock('http://localhost')
      .get(API_SUBSCRIPTIONS)
      .reply(500, 'Some server error');

    const thePromise = fetchSubscriptionsFromServer();

    thePromise.then(res => {
      expect(res).to.be.equal('Unable to retrieve subscriptions');
      done();
    });
  });
});
