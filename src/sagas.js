import {
  fetchSubscriptionsSaga
}                                                  from 'containers/home/sagas';

export default function* rootSaga () {
  yield [
    fetchSubscriptionsSaga()
  ];
}
