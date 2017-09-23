import { takeLatest }            from 'redux-saga';
import { call, put }             from 'redux-saga/effects';
import {
	REQUEST_SUBSCRIPTIONS,
	requestSubscriptionsSucceeded,
	requestSubscriptionsFailed
}                                from './actions';
import { get }                   from 'axios';

export const API_SUBSCRIPTIONS = '/api/subscriptions';

/**
 * AJAX
 */

export function fetchSubscriptionsFromServer () {
	return get(API_SUBSCRIPTIONS)
		.then(res => res.data);
}

/**
 * SAGA
 */

export function* fetchSubscriptions () {
	try {
		yield put(requestSubscriptionsLoading());
		const subscriptions = yield call(fetchSubscriptionsFromServer);
		yield put(requestSubscriptionsSucceeded(subscriptions));
	} catch (e) {
		const message = 'Unable to retrieve subscriptions';
		yield put(requestSubscriptionsFailed());
	}
}

/**
 * LISTENER
 */

export function* fetchSubscriptionsSaga () {
	yield* takeLatest(REQUEST_SUBSCRIPTIONS, fetchSubscriptions);
}
