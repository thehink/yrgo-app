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
      link = '',
    } = this.props;

    const externUrl = link.match(/https?:/);

    return (
      <YrgoShadow
        className={`${styles.wrapper} ${className || ''}`}
        color={'yrgoRed'}
        offset={10}
        hover
      >
        {externUrl
          ? <a href={link} className={styles.link}>
            <div
              className={`${styles.image} ${imageClass || ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
            <div
              className={`${styles.title} ${titleClass || ''}`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </a>
          : <Link to={link} className={styles.link}>
            <div
              className={`${styles.image} ${imageClass || ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
            <div
              className={`${styles.title} ${titleClass || ''}`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </Link>}

      </YrgoShadow>
    );
  }
}
