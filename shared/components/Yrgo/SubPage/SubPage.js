import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Actions from 'store/modules/wordpress';
const { fetchPages } = Actions;

import styles from './subPage.scss';

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const page = state.wp.pages.ids
    .map(id => state.entities.pages[id])
    .find(page => page.slug === slug);
  const isFetching = state.wp.pages.isFetching;

  return {
    isFetching,
    page,
  };
};

const mapDispatchToProps = {
  fetchPages,
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class SubPage extends Component {
  asyncBootstrap() {
    return this.fetchData();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    if (this.props.page) {
      return true;
    }

    const slug = this.props.match.params.slug;

    return this.props.fetchPage({ slug }, true);
  }

  render() {
    const {
      isFetching,
      page,
    } = this.props;

    return (
      <div className={styles.wrapper} dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    );
  }
}
