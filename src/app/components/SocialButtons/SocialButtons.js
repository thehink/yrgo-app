import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SocialButton from './SocialButton';

import styles from './socialButtons.scss';

export default class SocialButtons extends Component {
  render() {
    return (
      <div className={ `${styles.wrapper} d-flex justify-content-end` } >
        <SocialButton
          href="facebook.com"
          type="facebook"
        />
        <SocialButton
          href="instagram.com"
          type="instagram"
        />
      </div>
    );
  }
}
