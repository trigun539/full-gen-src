import { expect } from 'chai';
import {
	TOGGLE_TAG_FILTER,
	REQUEST_SUBSCRIPTIONS,
	REQUEST_SUBSCRIPTIONS_SUCCEEDED,
	REQUEST_SUBSCRIPTIONS_FAILED,
	REQUEST_SUBSCRIPTIONS_LOADING,
	REQUEST_COMMENTS,
	REQUEST_COMMENTS_SUCCEEDED,
	REQUEST_COMMENTS_FAILED,
	REQUEST_COMMENTS_LOADING,

	toggleTagFilter,
	requestSubscriptions,
	requestSubscriptionsSucceeded,
	requestSubscriptionsFailed,
	requestSubscriptionsLoading,
	requestComments,
	requestCommentsSucceeded,
	requestCommentsFailed,
	requestCommentsLoading
} from 'containers/home/actions';

describe('Containers :: Home :: Actions ::', () => {

	it('should toggle filter', () => {
		const tag = 'test';
		const action = toggleTagFilter(tag);
		const fakeAction = {
			type: TOGGLE_TAG_FILTER, tag
		};

		expect(action).to.deep.equal(fakeAction);
	});

	it('should request subscriptions', () => {
		const fakeAction = {
			type: REQUEST_SUBSCRIPTIONS
		};

		expect(requestSubscriptions()).to.deep.equal(fakeAction);
	});

	it('should create action for request subscriptions succeeded', () => {
		const subscriptions = 'test';
		const fakeAction = {
			type: REQUEST_SUBSCRIPTIONS_SUCCEEDED, subscriptions
		};

		expect(requestSubscriptionsSucceeded(subscriptions)).to.deep.equal(fakeAction);
	});

	it('should create action for request subscriptions failed', () => {
		const fakeAction = {
			type: REQUEST_SUBSCRIPTIONS_FAILED
		};

		expect(requestSubscriptionsFailed()).to.deep.equal(fakeAction);
	});

	it('should create a subscriptions loading action', () => {
		const fakeAction = {
			type: REQUEST_SUBSCRIPTIONS_LOADING
		};
		expect(requestSubscriptionsLoading()).to.deep.equal(fakeAction);
	});

	it('should create request comments action', () => {
		const page = 1;
		const limit = 1;
		const fakeAction = {
			type: REQUEST_COMMENTS, page, limit
		};
		expect(requestComments(page, limit)).to.deep.equal(fakeAction);
	});

	it('should create request comments succeeded', () => {
		const comments = 'test';
		const fakeAction = {
			type: REQUEST_COMMENTS_SUCCEEDED, comments
		};

		expect(requestCommentsSucceeded(comments)).to.deep.equal(fakeAction);
	});

	it('should create request comments failed', () => {
		const fakeAction = {
			type: REQUEST_COMMENTS_FAILED
		};

		expect(requestCommentsFailed()).to.deep.equal(fakeAction);
	});

	it('should create request comments loading', () => {
		const fakeAction = {
			type: REQUEST_COMMENTS_LOADING
		};

		expect(requestCommentsLoading()).to.deep.equal(fakeAction);
	});

});
