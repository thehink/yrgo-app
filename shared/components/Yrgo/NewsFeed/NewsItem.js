import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './newsItem.scss';

export default class NewsItem extends Component {
  static propTypes = {
    date: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const {
      date,
      link,
      text,
      image,
    } = this.props;

    return (
      <a href="" className={`${styles.wrapper} card`}>
        <div
          className={`${styles.image} card-img-top`}
          alt="Card image cap"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={`${styles.block} card-block`}>
          <small className={styles.date}>{date}</small>
          <p className={`${styles.text} card-text`}>
            {text}
          </p>
        </div>
      </a>
    );
  }
}
