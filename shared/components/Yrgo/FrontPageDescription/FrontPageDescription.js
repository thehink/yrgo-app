import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SocialButtons from 'components/SocialButtons';

import styles from './frontPageDescription.scss';

export default class FrontPageDescription extends Component {
  static propTypes = {
    text: PropTypes.string,
    facebook: PropTypes.string,
    instagram: PropTypes.string,
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={'row'}>
          <div className={`col-12 ${styles.content}`}>
            <h2>Yrgo</h2>
            <p>
              {this.props.text}
            </p>
          </div>
        </div>
        <SocialButtons className={`${styles.social}`} />
      </div>
    );
  }
}
