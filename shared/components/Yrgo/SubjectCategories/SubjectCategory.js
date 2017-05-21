import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

import styles from './subjectCategory.scss';

export default class SubjectCategory extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  render() {
    const {
      children,
      url,
    } = this.props;

    return (
      <div className={`${styles.wrapper} col-xs-12 col-md-6 p-0`}>
        <Button className={styles.buttonWrapper}>
          <Link to={url}>{children}</Link>
        </Button>
      </div>
    );
  }
}
