import React, { Component } from 'react';
import { connect }          from 'react-redux';
import styles               from './styles.css';
import { push }             from 'react-router-redux';

export class App extends Component {
	render () {
		const { 
			children, 
			push
		} = this.props;

		return (
			<div className={ styles.app } >
				{ children }
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		push (page) { dispatch(push(page)); }
	};
}

const mapStateToProps = (state) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 
