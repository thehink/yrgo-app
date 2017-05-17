import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './subjectCategory.scss';

export default class SubjectCategory extends Component {

  static propTypes = {

  }

  render() {
    return (
      <div className={ `${styles.wrapper} col-6` } >
        <div className={ styles.contentWrapper }>
          <div className={ styles.background }></div>
          <div className={ styles.content }>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}
