import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './textBlock.scss';

export default class TextBlock extends Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
  };

  render() {
    const {} = this.props;

    return <div className={styles.wrapper} />;
  }
}
