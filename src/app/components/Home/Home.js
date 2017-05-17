import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Parallax from 'components/Parallax';

import styles from './home.scss';

@withRouter
export default class Home extends Component {
  componentWillMount(){
    //console.log('Render HOME!');
  }

  render() {
    return (
      <div className={ styles.wrapper }>
        <Parallax />
      </div>
    );
  }
}
