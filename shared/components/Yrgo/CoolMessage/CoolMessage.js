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
    dynamicTexts: ['SKAFFA DIG ETT YRKE', 'byta yrke', 'fördjupa dig i ett yrke'],
    interval: 2000,
  };

  state = {
    lastText: 0,
    activeText: 0,
  };

  componentDidMount() {
    this.timeout = setTimeout(this.showNextText.bind(this), this.props.interval);
  }

  showNextText() {
    const nextActiveText = (this.state.activeText + 1) % this.props.dynamicTexts.length;

    this.setState({
      activeText: nextActiveText,
      lastText: this.state.activeText,
    });

    this.timeout = setTimeout(this.showNextText.bind(this), this.props.interval);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  // {text
  //   .split('')
  //   .map((character, i) => <span key={`${text}_char_${character}_${i}`}>{character}</span>)}

  renderDynamicTexts(text, i) {
    const {
      activeText,
      lastText,
    } = this.state;

    const {
      interval,
    } = this.props;

    return (
      <span
        key={text}
        className={
          `${styles.dynamicText} ${((i === activeText || i === lastText) && styles.visible) || ''}`
        }
        style={{
          animationDuration: `${interval + interval / 8}ms`,
        }}
      >
        {text}
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
