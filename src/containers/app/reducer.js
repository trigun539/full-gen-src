import { fromJS }            from 'immutable';
import { INCREASE_TABINDEX } from './actions';

export const initialState = fromJS({
	tabIndex: 1
});

export const config = (state = initialState, action) => {
	switch (action.type) {
		case INCREASE_TABINDEX:
			return state.set('tabIndex', state.get('tabIndex') + 1);
		default:
			return state;
	}
}
