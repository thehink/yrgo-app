import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './subjectCategories.scss';

export default class Category extends Component {

  static propTypes = {

  }

  render() {
    return (
      <div className={ `${styles.wrapper} row` } >
        { this.props.children }
      </div>
    );
  }
}
