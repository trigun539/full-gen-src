import {
  fetchSubscriptionsSaga,
  fetchCommentsSaga
}                                                  from 'containers/home/sagas';

export default function* rootSaga () {
  yield [
    fetchSubscriptionsSaga(),
    fetchCommentsSaga()
  ];
}
