export const TOGGLE_TAG_FILTER               = 'containers/home/TOGGLE_TAG_FILTER';
export const REQUEST_SUBSCRIPTIONS           = 'containers/home/REQUEST_SUBSCRIPTIONS';
export const REQUEST_SUBSCRIPTIONS_SUCCEEDED = 'containers/home/REQUEST_SUBSCRIPTIONS_SUCCEEDED';
export const REQUEST_SUBSCRIPTIONS_FAILED    = 'containers/home/REQUEST_SUBSCRIPTIONS_FAILED';
export const REQUEST_SUBSCRIPTIONS_LOADING   = 'containers/home/REQUEST_SUBSCRIPTIONS_LOADING';
export const REQUEST_COMMENTS                = 'containers/home/REQUEST_COMMENTS';
export const REQUEST_COMMENTS_SUCCEEDED      = 'containers/home/REQUEST_COMMENTS_SUCCEEDED';
export const REQUEST_COMMENTS_FAILED         = 'containers/home/REQUEST_COMMENTS_FAILED';
export const REQUEST_COMMENTS_LOADING        = 'containers/home/REQUEST_COMMENTS_LOADING';

export function toggleTagFilter (tag) {
	return { type: TOGGLE_TAG_FILTER, tag };
}

export function requestSubscriptions () {
	return { type: REQUEST_SUBSCRIPTIONS };
}

export function requestSubscriptionsSucceeded (subscriptions) {
	return { type: REQUEST_SUBSCRIPTIONS_SUCCEEDED, subscriptions };
}

export function requestSubscriptionsFailed () {
	return { type: REQUEST_SUBSCRIPTIONS_FAILED };
}

export function requestSubscriptionsLoading () {
	return { type: REQUEST_SUBSCRIPTIONS_LOADING };
}

export function requestComments (page, limit) {
	return { type: REQUEST_COMMENTS, page, limit };
}

export function requestCommentsSucceeded (comments) {
	return { type: REQUEST_COMMENTS_SUCCEEDED, comments};
}

export function requestCommentsFailed () {
	return { type: REQUEST_COMMENTS_FAILED };
}

export function requestCommentsLoading () {
	return { type: REQUEST_COMMENTS_LOADING };
}
