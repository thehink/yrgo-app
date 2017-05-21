import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SocialButton from './SocialButton';

import styles from './socialButtons.scss';

export default class SocialButtons extends Component {
  render() {
    const {
      className,
    } = this.props;

    return (
      <div className={`${styles.wrapper} d-flex justify-content-end ${className || ''}`}>
        <SocialButton href="facebook.com" type="facebook" />
        <SocialButton href="instagram.com" type="instagram" />
      </div>
    );
  }
}
