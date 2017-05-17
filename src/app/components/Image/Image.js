import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YrgoShadow from 'components/YrgoShadow';

import styles from './image.scss';

export default class Image extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired
  }

  static defaultProps = {

  }

  render() {
    return (
      <div className={ styles.wrapper } >
        <YrgoShadow
          className={ `${styles.imageWrapper}` }
          color={ `yrgoLightGreen` }
          offset={ 20 }
        >
          <img className={ styles.image } src={ this.props.src } />
        </YrgoShadow>
      </div>
    );
  }
}
