import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

import styles from './partners.scss';

export default class Partners extends Component {
  static propTypes = {
    partners: PropTypes.array,
  };

  renderPartner(partner) {
    return (
      <div key={partner.name} className={styles.partner}>
        <a href={partner.url} style={{ backgroundImage: `url(${partner.thumbnail})` }} />
      </div>
    );
  }

  render() {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    const {
      partners,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.partnersHeading}>Samarbetspartners</h2>
        <Slider {...settings} className={styles.partnerWrapper}>
          {partners.map(this.renderPartner)}
        </Slider>
      </div>
    );
  }
}
