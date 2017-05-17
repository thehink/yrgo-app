import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ParallaxJS from 'parallax-js';

import Layer from './Layer';

import styles from './parallax.scss';

export default class Parallax extends Component {

  static propTypes = {

  }

  componentDidMount(){
    var parallax = new ParallaxJS(this.scene, {
      relativeInput: true,
      clipRelativeInput: false,
      hoverOnly: false,
      calibrateX: false,
      calibrateY: true,
      invertX: true,
      invertY: true,
      limitX: false,
      limitY: false,
      scalarX: 10,
      scalarY: 10,
      frictionX: 0.1,
      frictionY: 0.1,
      originX: 0.5,
      originY: 0.5,
      precision: 1,
      pointerEvents: false
    });
  }

  render() {
    return (
      <div {...this.props}
        className={ `${styles.wrapper}` }
        ref={(el) => { this.scene = el; }}
        >
        <Layer data-depth={ 0.1 }>
          <div className={ styles.layer1 }></div>
        </Layer>
        <Layer data-depth={ 0.5 }>
          <div className={ styles.layer2 }></div>
        </Layer>
        <Layer data-depth={ 1.0 }>
          <div className={ styles.layer3 }></div>
        </Layer>
      </div>
    );
  }
}
