import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YrgoShadow from 'components/YrgoShadow';

import styles from './image.scss';

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string,
    aspect: PropTypes.number,
    link: PropTypes.string,
  };

  static defaultProps = {
    aspect: 0.65,
  };

  render() {
    const {
      className,
      src,
      aspect,
      link,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <YrgoShadow
          className={`${styles.imageWrapper} ${className || ''}`}
          color={link ? 'yrgoRed' : 'yrgoLightGreen'}
          hover={Boolean(link)}
          offset={20}
        >

          {(link &&
            <a
              href={link}
              className={styles.image}
              style={{ backgroundImage: `url(${src})`, paddingBottom: `${aspect * 100}%` }}
            />) ||
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${src})`, paddingBottom: `${aspect * 100}%` }}
            />}

        </YrgoShadow>
      </div>
    );
  }
}
