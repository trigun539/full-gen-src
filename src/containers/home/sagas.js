import { takeLatest }            from 'redux-saga';
import { call, put }             from 'redux-saga/effects';
import {
	REQUEST_SUBSCRIPTIONS,
	REQUEST_COMMENTS,
	requestSubscriptionsSucceeded,
	requestSubscriptionsFailed,
	requestSubscriptionsLoading,
	requestCommentsSucceeded,
	requestCommentsFailed,
	requestCommentsLoading
}                                from './actions';
import { showAlert }             from 'containers/app/actions';
import { get }                   from 'axios';
import subscriptionsJSON         from './subscriptions.json';
import commentsJSON              from './comments.json';

export const API_SUBSCRIPTIONS = '/emr/api/subscriptions';
export const API_COMMENTS      = '/emr/api/comments';

// SUBSCRIPTIONS

export function* fetchSubscriptions () {
	try {
		yield put(requestSubscriptionsLoading());
		// const subscriptions = yield call(fetchSubscriptionsFromServer);
		// yield put(requestSubscriptionsSucceeded(subscriptions));
    // TODO: Remove this static data
		yield put(requestSubscriptionsSucceeded(subscriptionsJSON.data));
	} catch (e) {
		const message = 'Unable to retrieve subscriptions';
		yield put(showAlert({ message, type: 'error' }));
		yield put(requestSubscriptionsFailed());
	}
}

export function fetchSubscriptionsFromServer () {
	return get(API_SUBSCRIPTIONS)
		.then(res => res.data.data);
}

export function* fetchSubscriptionsSaga () {
	yield* takeLatest(REQUEST_SUBSCRIPTIONS, fetchSubscriptions);
}

// COMMENTS

export function* fetchComments (action) {
	try {
		yield put(requestCommentsLoading());
		// const comments = yield call(fetchCommentsFromServer, action.page, action.limit);
		// yield put(requestCommentsSucceeded(comments));
    // TODO: Remove this static data
		yield put(requestCommentsSucceeded({
      comments: commentsJSON.data,
      page: commentsJSON.metadata.page,
      limit: commentsJSON.metadata.limit
    }));
	} catch (e) {
		const message = 'Unable to retrieve comments';
		yield put(showAlert({ message, type: 'error' }));
		yield put(requestCommentsFailed());
	}
}

export function fetchCommentsFromServer (page, limit) {
	return get(`${API_COMMENTS}?page=${page}&limit=${limit}`)
		.then(res => { 
			return {
				comments: res.data.data,
				page: res.data.metadata.page,
				limit: res.data.metadata.limit
			};
		});
}

export function* fetchCommentsSaga () {
	yield* takeLatest(REQUEST_COMMENTS, fetchComments);
}
