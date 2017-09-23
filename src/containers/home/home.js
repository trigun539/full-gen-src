import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { push }             from 'react-router-redux';
import styles               from './styles.css';
import {
  requestSubscriptions
}                           from './actions';

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

    // Formatting subscriptions
    const formattedSubscriptions = [];

    subscriptions.forEach(x => {
      formattedSubscriptions.push({
        text: x.businessName || x.physicalName,
        link: '',
        tag: x.type
      });
    });

    return (
      <div className={ styles.home } >
        
        <h1 className="title" >Homepage Edited</h1>

        <button className="button" onClick={ () => { push('/about'); } }>Go to About US</button>
        <button className="button" onClick={ () => { push('/somepage'); } }>Go to not found page</button>

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
