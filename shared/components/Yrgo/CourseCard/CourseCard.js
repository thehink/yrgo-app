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
    titleClass: PropTypes.string,
    imageClass: PropTypes.string,
  };

  render() {
    const {
      className,
      titleClass,
      imageClass,
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
          <div
            className={`${styles.image} ${imageClass || ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={`${styles.title} ${titleClass || ''}`}>
            {title}
          </div>
        </Link>
      </YrgoShadow>
    );
  }
}
