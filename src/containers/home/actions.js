export const REQUEST_SUBSCRIPTIONS           = 'containers/home/REQUEST_SUBSCRIPTIONS';
export const REQUEST_SUBSCRIPTIONS_SUCCEEDED = 'containers/home/REQUEST_SUBSCRIPTIONS_SUCCEEDED';
export const REQUEST_SUBSCRIPTIONS_FAILED    = 'containers/home/REQUEST_SUBSCRIPTIONS_FAILED';

export function requestSubscriptions () {
	return { type: REQUEST_SUBSCRIPTIONS };
}

export function requestSubscriptionsSucceeded (subscriptions) {
	return { type: REQUEST_SUBSCRIPTIONS_SUCCEEDED, subscriptions };
}

export function requestSubscriptionsFailed () {
	return { type: REQUEST_SUBSCRIPTIONS_FAILED };
}
