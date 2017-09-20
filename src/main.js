import 'babel-polyfill';
import { polyfill }                               from 'es6-promise';
import Immutable                                  from 'immutable';
import React                                      from 'react';
import { render }                                 from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory
}                                                 from 'react-router';
import { Provider }                               from 'react-redux';
import { compose, createStore, applyMiddleware }  from 'redux';
import createSagaMiddleware                       from 'redux-saga';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import App                                        from 'containers/app/app';
import Home                                       from 'containers/home/home';
import About                                      from 'containers/about/about';
import NotFound                                   from 'containers/not-found/not-found';
import reducers                                   from './reducers';
import RootSaga                                   from './sagas';


// Polyfilling promises
polyfill();

const sagaMiddleware = createSagaMiddleware();

// MIDDLEWARE
const middlewares = [
  sagaMiddleware,
  routerMiddleware(hashHistory)
];

const enhancers = [
  applyMiddleware(...middlewares)
  // Devtools could go here
];

const initialState = Immutable.Map();

const store = createStore(
  reducers,
  initialState,
  compose(...enhancers)
);

const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toObject();
  }
});

// Create hook for async sagas
store.runSaga = sagaMiddleware.run;
store.asyncSagas = {};

// Run sagas
sagaMiddleware.run(RootSaga);

window.store = store;

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="/about" component={ About } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>
  </Provider>, document.getElementById('container'));
