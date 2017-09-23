import React       from 'react';
import { connect } from 'react-redux';

const About = () => (
  <div>
    <h1 className="title">About</h1>
    <a className="button" href="/#/">Go Home</a>
  </div>
);

export default connect()(About);
