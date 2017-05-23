import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './layer.scss';

export default class Layer extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    rotation: PropTypes.number,
    depth: PropTypes.number,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    rotation: 0,
    depth: 1,
  };

  render() {
    const {
      x,
      y,
      rotation,
      depth,
    } = this.props;

    return (
      <div data-depth={depth} className={`layer ${styles.layer}`}>
        <div
          className={`${styles.layerContent}`}
          style={{
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
