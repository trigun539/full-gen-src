import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { push }             from 'react-router-redux';
import styles               from './styles.css';
import {
  requestSubscriptions
}                           from './actions';
import { MdCancel, MdChat } from 'react-icons/lib/md';

export class Home extends Component {

  componentWillMount () {
    const {
      requestSubscriptions
    } = this.props;

    requestSubscriptions();
  }

  render () {
    const {
      subscriptions,
      subscriptionsLoading,
      push
    } = this.props;

    return (
      <div className={ styles.home } >
        
        <h1 className="title" >Welcome to Full React Generator</h1>

        <button className="button" onClick={ () => { push('/about'); } }>Go to About US</button>
        <button className="button" onClick={ () => { push('/somepage'); } }>Go to not found page</button>

        <h2 className="title is-2">Available Icons</h2>

        <button className="button"><MdCancel /></button>
        <button className="button"><MdChat /></button>

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    subscriptions:         state.get('home').get('subscriptions').toJS(),
    subscriptionsLoading:  state.get('home').get('subscriptionsLoading')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTagFilter (tag) { dispatch(toggleTagFilter(tag)); },
    requestSubscriptions () { dispatch(requestSubscriptions()); },
    push (page) { dispatch(push(page)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home); 
