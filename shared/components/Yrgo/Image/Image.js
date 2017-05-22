import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YrgoShadow from 'components/YrgoShadow';

import styles from './image.scss';

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    return (
      <div className={styles.wrapper}>
        <YrgoShadow className={`${styles.imageWrapper}`} color={'yrgoLightGreen'} offset={20}>
          <div className={styles.image} style={{ backgroundImage: `url(${this.props.src})` }} />
        </YrgoShadow>
      </div>
    );
  }
}
