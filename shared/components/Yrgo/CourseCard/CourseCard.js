import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import YrgoShadow from 'components/YrgoShadow';

import styles from './courseCard.scss';

export default class CourseCard extends Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
  };

  render() {
    const {
      className,
      image,
      title,
      link,
    } = this.props;

    return (
      <YrgoShadow
        className={`${styles.wrapper} ${className || ''}`}
        color={'yrgoRed'}
        offset={10}
        hover
      >
        <Link to={link} className={styles.link}>
          <img className={styles.image} src={image} />
          <div className={styles.title}>
            {title}
          </div>
        </Link>
      </YrgoShadow>
    );
  }
}
