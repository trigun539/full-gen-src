import { expect }                        from 'chai';
import {
	TOGGLE_TAG_FILTER,
	REQUEST_SUBSCRIPTIONS,
	REQUEST_SUBSCRIPTIONS_SUCCEEDED,
	REQUEST_SUBSCRIPTIONS_FAILED,
	REQUEST_SUBSCRIPTIONS_LOADING,
	REQUEST_COMMENTS,
	REQUEST_COMMENTS_SUCCEEDED,
	REQUEST_COMMENTS_FAILED,
	REQUEST_COMMENTS_LOADING
} from 'containers/home/actions';
import { home as reducer, initialState } from 'containers/home/reducer';

describe('Containers :: Home :: Reducer ::', () => {

	it('should add fetched subscriptions to the state', () => {
		const subscriptions = ['1'];
		const fakeAction = {
			type: REQUEST_SUBSCRIPTIONS_SUCCEEDED, subscriptions
		};
		const newState = reducer(undefined, fakeAction).toJS();

		expect(newState).to.deep.equal({
			...initialState.toJS(),
			subscriptions,
			subscriptionsLoading: false
		});
	});

	it('should update subscriptions loading to false when failing to fetch subscriptions', () => {
		const fakeAction = {
			type: REQUEST_SUBSCRIPTIONS_FAILED	
		};
		const newState = reducer(undefined, fakeAction).toJS();

		expect(newState).to.deep.equal({
			...initialState.toJS(),
			subscriptionsLoading: false
		});
	});

	it('should set subscriptions to loading', () => {
		const fakeAction = {
			type: REQUEST_SUBSCRIPTIONS_LOADING
		};
		const newState = reducer(undefined, fakeAction).toJS();

		expect(newState).to.deep.equal({
			...initialState.toJS(),
			subscriptionsLoading: true
		});
	});

	it('should toggle tag', () => {
		const initialStateJS = initialState.toJS();
		const tags = initialStateJS.tags;
		const tag = 'database';
		const fakeAction = {
			type: TOGGLE_TAG_FILTER, tag
		};
		const newState = reducer(undefined, fakeAction).toJS();

		expect(newState).to.deep.equal({
			...initialStateJS,
			tags: {
				...tags,
				database: { ...tags.database, selected: false }
			}
		});
	});

	it('should load comments', () => {
		const initialStateJS = initialState.toJS();
		const comments = {
			comments: ['sldkfj'],
			page: 1,
			limit: 1
		};
		const fakeAction = {
			type: REQUEST_COMMENTS_SUCCEEDED, comments
		};
		const newState = reducer(undefined, fakeAction).toJS();

		expect(newState).to.deep.equal({
			...initialStateJS,
			comments: comments.comments,
			commentsPage: comments.page,
			commentsLimit: comments.limit,
			commentsLoading: false
		});
	});

	it('should set comments loading = false, loaded all comments = true when no comments are fetched', () => {
		const initialStateJS = initialState.toJS();
		const comments = {
			comments: []
		};
		const fakeAction = {
			type: REQUEST_COMMENTS_SUCCEEDED, comments
		};
		const newState = reducer(undefined, fakeAction).toJS();

		expect(newState).to.deep.equal({
			...initialStateJS,
			commentsLoading: false,
			loadedAllComments: true
		});
	});

	it('should set comments loading to false when comments fail to fetch', () => {
		const initialStateJS = initialState.toJS();
		const fakeAction = {
			type: REQUEST_COMMENTS_FAILED
		};
		const newState = reducer(undefined, fakeAction).toJS();

		expect(newState).to.deep.equal({
			...initialStateJS,
			commentsLoading: false
		});
	});

	it('should set comments to loading', () => {
		const fakeAction = {
			type: REQUEST_COMMENTS_LOADING
		};
		const newState = reducer(undefined, fakeAction).toJS();
		
		expect(newState).to.deep.equal({
			...initialState.toJS(),
			commentsLoading: true
		});
	});
});
