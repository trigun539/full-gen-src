import { fromJS }                  from 'immutable';
import {
  REQUEST_SUBSCRIPTIONS,
	REQUEST_SUBSCRIPTIONS_SUCCEEDED,
	REQUEST_SUBSCRIPTIONS_FAILED
}                                  from './actions';

export const initialState = fromJS({
	subscriptions: [],
	subscriptionsLoading: true
});

export const home = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SUBSCRIPTIONS:
			return state
				.set('subscriptionsLoading', true);
		case REQUEST_SUBSCRIPTIONS_SUCCEEDED:
			return state
				.set('subscriptions', fromJS(action.subscriptions))
				.set('subscriptionsLoading', false);
		case REQUEST_SUBSCRIPTIONS_FAILED:
			return state
				.set('subscriptionsLoading', false);
		default:
			return state;
	}
}
