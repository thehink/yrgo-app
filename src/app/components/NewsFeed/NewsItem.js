import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './newsItem.scss';

export default class NewsItem extends Component {
  render() {
    return (
      <div className={ `${styles.wrapper} card` } >
        <img className="card-img-top" src="https://media.giphy.com/media/oimCQlndn6KPe/giphy.gif?response_id=591ca92665ca98ba4cb3b6fd" alt="Card image cap" />
        <div className={ `${styles.block} card-block` }>
          <small className={ styles.date }>16 maj 2017</small>
          <p className={ `${styles.text} card-text` }>Some quick example text to build on the card title and make up the bulk of the cards content.</p>
        </div>
      </div>
    );
  }
}
