import React       from 'react';
import { connect } from 'react-redux';
import styles      from './styles.css';

const About = () => (
  <div className={ styles.wrapper }>
    <h1 className="title">About</h1>
    <a className="button" href="/#/">Go Home</a>
  </div>
);

export default connect()(About);
