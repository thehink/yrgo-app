import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './yrgoShadow.scss';

export default class YrgoShadow extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    offset: PropTypes.number,
    margin: PropTypes.number,
    active: PropTypes.bool,
    hover: PropTypes.bool,
  };

  static defaultProps = {
    color: 'yrgoRed',
    offset: 10,
  };

  render() {
    const {
      color,
      offset,
      active,
      hover,
      className,
    } = this.props;

    return (
      <div
        className={
          `${styles.wrapper} ${className} ${(active && styles.active) || ''} ${(hover && styles.hover) || ''}`
        }
      >
        <div
          className={`${styles.background} ${styles[color]}`}
          style={{ top: offset, left: -offset }}
        />
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
