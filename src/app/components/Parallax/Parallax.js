import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './parallax.scss';

export default class Parallax extends Component {
  render() {
    return (
      <div className={ styles.wrapper } >
        parallax
      </div>
    );
  }
}
