import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './coolMessage.scss';

export default class CoolMessage extends Component {
  static propTypes = {
    staticText: PropTypes.string,
    dynamicTexts: PropTypes.array,
    interval: PropTypes.number,
  };

  static defaultProps = {
    staticText: 'FÖR DIG SOM VILL',
    dynamicTexts: ['SKAFFA DIG ETT YRKE', 'DO SOMETHING', 'SAY WHAAT'],
    interval: 1000,
  };

  state = {
    activeText: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.showNextText.bind(this), this.props.interval);
  }

  showNextText() {
    const nextActiveText = (this.state.activeText + 1) % this.props.dynamicTexts.length;

    this.setState({
      activeText: nextActiveText,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  renderDynamicTexts(text, i) {
    return (
      <span
        key={text}
        className={`${styles.dynamicText} ${(i === this.state.activeText && styles.visible) || ''}`}
      >
        {text
          .split('')
          .map((character, i) => <span key={`${text}_char_${character}_${i}`}>{character}</span>)}
      </span>
    );
  }

  render() {
    const {
      staticText,
      dynamicTexts,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <span className={styles.staticText}>
          {staticText}
        </span>
        <span className={`${styles.dynamicString}`}>
          {dynamicTexts.map(this.renderDynamicTexts.bind(this))}
        </span>
      </div>
    );
  }
}
