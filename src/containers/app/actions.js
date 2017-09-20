export const TOGGLE_NAVIGATION = 'containers/app/TOGGLE_NAVIGATION';
export const INCREASE_TABINDEX = 'containers/app/INCREASE_TABINDEX';
export const TOGGLE_HELP       = 'containers/app/TOGGLE_HELP';
export const SHOW_ALERT        = 'containers/app/SHOW_ALERT';
export const HIDE_ALERT        = 'containers/app/HIDE_ALERT';

export function toggleNavigation () {
	return { type: TOGGLE_NAVIGATION };
}

export function increaseTabIndex () {
	return { type: INCREASE_TABINDEX };
}

export function toggleHelp () {
	return { type: TOGGLE_HELP };
}

export function showAlert (alert) {
	return { type: SHOW_ALERT, alert };
}

export function hideAlert (message) {
	return { type: HIDE_ALERT, message};
}
