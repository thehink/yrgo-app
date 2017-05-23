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
    const {} = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Yrkeshögskoleutbildningar är avgörande för att kunna möta den höga efterfrågan på relevant kompetens. Dessutom har personer med denna typ av utbildning oftast en kort startsträcka innan de är produktiva i branschen.

          Namn Namnsson
          Gruppchef Lorem Ipsum
        </div>
        <div className={styles.image} />
      </div>
    );
  }
}
