import { combineReducers }    from 'redux-immutable';
import { config }             from 'containers/app/reducer';
import { home }               from 'containers/home/reducer';
import routerReducer          from './router-reducer';

const reducers = combineReducers({
  config,
  home,
  routing: routerReducer
});

export default reducers;
