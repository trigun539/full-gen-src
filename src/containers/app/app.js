import React, { Component } from 'react';
import { connect }          from 'react-redux';
import styles               from './styles.css';
import Backdrop             from 'components/backdrop/backdrop';
import AlertManager         from 'components/alert-manager/alert-manager';
import Navigation           from 'containers/navigation/navigation';
import ActionBar            from 'containers/action-bar/action-bar';
import Page                 from 'containers/page/page';
import Footer               from 'containers/footer/footer';
import {
	toggleHelp,
	hideAlert
}                           from './actions';
import { push }             from 'react-router-redux';
import Tooltip              from 'react-tooltip';

export class App extends Component {

	componentDidMount () {
		setTimeout(() => {
			Tooltip.rebuild();
		}, 100);
	}

	componentDidUpdate () {
		setTimeout(() => {
			Tooltip.rebuild();
		}, 100);
	}

	render () {
		const { 
			children, 
			push,
			helpOpen,
			toggleHelp,
			alerts,
			hideAlert
		} = this.props;

		return (
			<div className={ styles.app } >

				{ (() => {
					if (helpOpen) {
						return <Backdrop toggleBackdrop={ toggleHelp } />;
					}
				})() }

				{ (() => {
					if (alerts && alerts.length > 0) {
						return <AlertManager alerts={ alerts } onClose={ hideAlert } />;
					}
				})() }

				<Navigation push={ push } />

				<ActionBar />

				<Page>
					{ children }
				</Page>

				<Footer />

				<Tooltip />
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleHelp () { dispatch(toggleHelp()); },
		push (page) { dispatch(push(page)); },
		hideAlert (message) { dispatch(hideAlert(message)); }
	};
}

const mapStateToProps = (state) => {
	return {
		helpOpen:  state.get('config').get('helpOpen'),
		alerts:    state.get('config').get('alerts').toJS()
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 
