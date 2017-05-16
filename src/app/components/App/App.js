import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import Actions from 'app/store/modules/wordpress';

const { fetchPost, fetchPosts } = Actions;

import './app.css';

const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  //api.posts().id(1)
  //let postId = ownProps.match.params.id;
  //let post = state.wp.posts.items[postId];
  //let fetching = state.wp.posts.isFetching;
  //return { post }
  console.log(state);
  return {  };
}

const mapDispatchToProps = {
  fetchPost,
  fetchPosts
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  asyncBootstrap() {
    //return this.props.posts();
    return this.props.fetchPosts({author: 1});
    //return this.props.fetchPostBySlug();
  }

  componentWillMount(){
    //this.props.fetchPostTypes();
    //console.log('Render APP!');
  }

  render() {
    return (
      <app className="app">
        <h1>App hello</h1>
        { this.props.children }
      </app>
    );
  }
}
