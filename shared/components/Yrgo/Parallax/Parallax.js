import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ParallaxJS from 'parallax-js';

import Layer from './Layer';

import styles from './parallax.scss';

export default class Parallax extends Component {
  static propTypes = {};

  componentDidMount() {
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
      pointerEvents: false,
    });
  }

  render() {
    return (
      <div
        {...this.props}
        className={`${styles.wrapper}`}
        ref={(el) => {
          this.scene = el;
        }}
      >
        <Layer depth={0.1} x={0.4} y={0.03}>
          <div className={`${styles.image} ${styles.kalkylatorShadow}`} />
        </Layer>
        <Layer depth={0.15} x={0.4} y={0.03}>
          <div className={`${styles.image} ${styles.kalkylator}`} />
        </Layer>

        <Layer depth={0.1} x={0.05} y={0.01}>
          <div className={`${styles.image} ${styles.matintstrumentShadow}`} />
        </Layer>
        <Layer depth={0.20} x={0.05} y={0.01}>
          <div className={`${styles.image} ${styles.matintstrument}`} />
        </Layer>

        <Layer depth={0.1} x={0.7} y={0.5}>
          <div className={`${styles.image} ${styles.pingisShadow}`} />
        </Layer>
        <Layer depth={0.25} x={0.7} y={0.5}>
          <div className={`${styles.image} ${styles.pingis}`} />
        </Layer>

        <Layer depth={0.1} x={0.1} y={0.35}>
          <div className={`${styles.image} ${styles.plingShadow}`} />
        </Layer>
        <Layer depth={0.30} x={0.1} y={0.35}>
          <div className={`${styles.image} ${styles.pling}`} />
        </Layer>

        <Layer depth={0.1} x={0.5} y={0.8}>
          <div className={`${styles.image} ${styles.sprutaShadow}`} />
        </Layer>
        <Layer depth={0.25} x={0.5} y={0.8}>
          <div className={`${styles.image} ${styles.spruta}`} />
        </Layer>

        <Layer depth={0.1} x={0.1} y={0.7}>
          <div className={`${styles.image} ${styles.kameraShadow}`} />
        </Layer>
        <Layer depth={0.45} x={0.1} y={0.7}>
          <div className={`${styles.image} ${styles.kamera}`} />
        </Layer>
      </div>
    );
  }
}
