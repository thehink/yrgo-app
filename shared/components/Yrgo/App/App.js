import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import Actions from 'store/modules/wordpress';
const { fetchPost, fetchPosts, fetchCourseCategories, fetchCourses } = Actions;

import Header from 'components/Header';
import Footer from 'components/Footer';

import 'styles/bootstrap.global.scss';
import 'styles/common.global.scss';
import styles from './app.scss';

const mapStateToProps = (
  state,
  ownProps,
  // console.log(state);
  // api.posts().id(1)
  // let postId = ownProps.match.params.id;
  // let post = state.wp.posts.items[postId];
  // let fetching = state.wp.posts.isFetching;
  // return { post }
) => ({});

const mapDispatchToProps = {
  fetchPost,
  fetchPosts,
  fetchCourseCategories,
  fetchCourses,
};

export class App extends Component {
  asyncBootstrap() {
    // preload educations & categories
    return Promise.all([this.props.fetchCourseCategories(), this.props.fetchCourses()]);
  }

  componentWillMount() {
    // this.props.fetchPostTypes();
    // console.log('Render APP!');
  }

  render() {
    return (
      <app className="app">
        <Helmet>
          <title>Yrgo</title>
        </Helmet>
        <Header />
        <main className={`${styles.container} container-fluid`}>
          {this.props.children}
        </main>
      </app>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
