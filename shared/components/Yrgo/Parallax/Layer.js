import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './layer.scss';

export default class Layer extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    x: 0,
    y: 0,
  };

  render() {
    const {
      x,
      y,
    } = this.props;

    return (
      <div
        {...this.props}
        className={`layer ${styles.layer}`}
        style={{ left: `${x * 100}%`, top: `${x * 100}%` }}
      >
        {this.props.children}
      </div>
    );
  }
}
