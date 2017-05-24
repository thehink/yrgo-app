import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CourseCard from 'components/CourseCard';

import styles from './portfolios.scss';

export default class Portfolios extends Component {
  static propTypes = {
    portfolios: PropTypes.array,
  };

  static defaultProps = {
    portfolios: [],
  };

  renderPortfolio(portfolio) {
    return (
      <div
        key={portfolio.name}
        className={`${styles.cardWrapper} col-xs-12 col-sm-4 col-md-4 col-lg-3`}
      >
        <CourseCard
          link={portfolio.url}
          image={portfolio.image}
          title={portfolio.name}
          titleClass={styles.title}
          imageClass={styles.image}
        />
      </div>
    );
  }

  render() {
    const {
      portfolios,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <h2>Portfolios</h2>
        <div className={`row ${styles.portfoliosWrapper}`}>
          {portfolios.map(this.renderPortfolio.bind(this))}
        </div>
      </div>
    );
  }
}
