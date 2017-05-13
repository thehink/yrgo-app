import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import TestHome from 'components/TestHome';
import NotFound from 'components/NotFound';

import styles from './home.scss';

@withRouter
class Home extends Component {
  componentWillMount(){
    console.log('Render HOME!');
  }

  render() {
    return (
      <div className={ styles.home }>
        <h1>Home </h1>
        <pre>

        </pre>
        <TestHome load={ 1 } />
      </div>
    );
  }
}

export default Home;
