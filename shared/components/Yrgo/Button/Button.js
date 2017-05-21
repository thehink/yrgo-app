import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YrgoShadow from 'components/YrgoShadow';

import styles from './button.scss';

export default class Button extends Component {
  render() {
    const {
      className,
    } = this.props;

    return (
      <YrgoShadow className={`${styles.wrapper} ${className}`} color={'yrgoRed'} offset={10} hover>
        <button {...this.props} className={styles.button}>
          {this.props.children}
        </button>
      </YrgoShadow>
    );
  }
}
