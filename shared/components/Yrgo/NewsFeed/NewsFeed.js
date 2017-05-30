import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

import NewsItem from './NewsItem';

import styles from './newsFeed.scss';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const RightArrow = (props) => {
  const { className, style, onClick } = props;

  return <div onClick={onClick} style={{ ...style }} className={styles.rightArrow} />;
};

const LeftArrow = (props) => {
  const { className, style, onClick } = props;

  return <div onClick={onClick} style={{ ...style }} className={styles.leftArrow} />;
};

export default class NewsFeed extends Component {
  renderCard(item) {
    return (
      <div key={item.id}>
        <NewsItem
          date={item.created_time}
          text={item.message}
          image={item.full_picture}
          link={'/'}
        />
      </div>
    );
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <RightArrow />,
      prevArrow: <LeftArrow />,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const {
      items,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <h2>NewsFeed</h2>
        <div className={styles.slideWrapper}>
          {Boolean(items.length) &&
            <Slider {...settings} className={styles.cardWrapper}>
              {items.map(this.renderCard)}
            </Slider>}
        </div>
      </div>
    );
  }
}
