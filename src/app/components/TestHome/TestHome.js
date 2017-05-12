import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { asyncConnect } from 'src/AsyncConnect';
import { fetchPostTypes } from 'app/actions';

export default class TestHome extends Component {
  componentWillMount(){
    console.log('Render TESTHOME!');
  }

  componentWillReceiveProps(){
    console.log('componentWillReceiveProps');
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
  }

  render() {
    return (
      <div className="test">
        <h2> Load - { this.props.load } </h2>
      </div>
    );
  }
}
