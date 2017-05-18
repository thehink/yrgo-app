import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './socialButton.scss';

export default class SocialButton extends Component {

  static propTypes = {
    type: PropTypes.string,
    href: PropTypes.string,
  }

  render() {

    const {
      type,
      href
    } = this.props;

    return (
      <div className={ `${styles.button} ${styles[type]}` } >
        <a href={ href }></a>
      </div>
    );
  }
}
