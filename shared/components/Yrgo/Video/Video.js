import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YrgoShadow from 'components/YrgoShadow';

import styles from './video.scss';

export default class Video extends Component {
  static propTypes = {
    url: PropTypes.string,
  };

  render() {
    const {
      url,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <YrgoShadow className={`${styles.contentWrapper}`} color={'yrgoLightGreen'} offset={20}>
          <iframe src={`${url}?rel=0&amp;showinfo=0`} width="100%" height="100%" frameBorder="0" />
        </YrgoShadow>
      </div>
    );
  }
}
