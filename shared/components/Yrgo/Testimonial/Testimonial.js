import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './testimonial.scss';

export default class Testimonial extends Component {
  static propTypes = {
    testimonials: PropTypes.array,
  };

  static defaultProps = {
    testimonials: [],
  };

  render() {
    const {
      testimonials,
    } = this.props;

    const testimonial = testimonials[0];

    return (
      <div className={`${styles.wrapper}`}>
        <div
          className={`${styles.text} pr-0 pr-md-5`}
          dangerouslySetInnerHTML={{ __html: testimonial.text }}
        />
        <div className={`${styles.imageWrapper}`}>
          <div
            className={`${styles.image}`}
            style={{
              backgroundImage: `url(${testimonial.image})`,
            }}
          />
        </div>
      </div>
    );
  }
}
