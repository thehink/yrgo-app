import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YrgoShadow from 'components/YrgoShadow';

import styles from './video.scss';

export default class Video extends Component {
  render() {
    return (
      <div className={ styles.wrapper } >
        <YrgoShadow
          className={ `${styles.contentWrapper}` }
          color={ `yrgoLightGreen` }
          offset={ 20 }
        >
          <iframe src="https://www.youtube.com/embed/gBjO2yYyzU0?rel=0&amp;showinfo=0" width="100%" height="100%" frameborder="0"></iframe>
        </YrgoShadow>
      </div>
    );
  }
}
