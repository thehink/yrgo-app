import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import styles from './subjectCategory.scss';

export default class SubjectCategory extends Component {

  static propTypes = {

  }

  render() {
    return (
      <div className={ `${styles.wrapper} col-6` } >
        <Button className={ styles.buttonWrapper }>
          <a href="#">Link2</a>
        </Button>
      </div>
    );
  }
}
