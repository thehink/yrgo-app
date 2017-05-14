import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { asyncConnect } from 'src/AsyncConnect';

import { withRouter } from 'react-router';

import './app.css';

import { fetchPostTypes } from 'app/actions';

const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  //api.posts().id(1)
  //let postId = ownProps.match.params.id;
  //let post = state.wp.posts.items[postId];
  //let fetching = state.wp.posts.isFetching;
  //return { post }
  return {  };
}

const mapDispatchToProps = {
  fetchPostTypes
};

@asyncConnect({
  fetchPostTypes: (props) => props.fetchPostTypes()
}, mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  componentWillMount(){
    //this.props.fetchPostTypes();
    console.log('Render APP!');
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
