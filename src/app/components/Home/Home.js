import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Actions from 'app/store/modules/wordpress';
const { fetchHome } = Actions;

import Image from 'components/Image';
import Parallax from 'components/Parallax';
import SubjectCategories from 'components/SubjectCategories';
import SubjectCategory from 'components/SubjectCategories/SubjectCategory';
import FrontPageDescription from 'components/FrontPageDescription';
import Video from 'components/Video';
import NewsFeed from 'components/NewsFeed';

import styles from './home.scss';

const mapStateToProps = (state, ownProps) => {

  const categories = state.wp.courseCategories.ids.map(id => state.entities.course_categories[id]);

  const {
    image,
    description,
    video_url,
    facebook_url,
    instagram_url
  } = state.wp.home.id && state.entities.pages[state.wp.home.id].acf || {};

  const isFetching = state.wp.home.isFetching;

  return {
    isFetching,
    image,
    description,
    video_url,
    facebook_url,
    instagram_url,
    categories
  };
}

const mapDispatchToProps = {
  fetchHome
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {

  asyncBootstrap() {
    return this.fetchData();
  }

  fetchData(){

    if(this.props.isFetching){
      return true;
    }

    return this.props.fetchHome();
  }

  componentWillMount(){
    this.fetchData();
  }

  componentWillReceiveProps(nextProps, nextState){
    this.fetchData();
  }

  renderCategory(category){
    return (
      <SubjectCategory key={ category.id }
        url={`/course/category/${category.slug}`}
        >
        { category.name }
      </SubjectCategory>
    );
  }

  render() {

    const {
      image,
      description,
      video_url,
      facebook_url,
      instagram_url,
      categories,
      isFetching
    } = this.props;

    if(isFetching){
      return (<div>Loading...</div>);
    }

    return (
      <div className={ styles.wrapper }>
        <Parallax />
        <div className={ `${styles.categoryRow} row max-width` }>
          <div className="col-xs-12 col-md-6">
              <Image src={ image } />
          </div>
          <div className="col-xs-12 col-md-6 mt-5 mt-md-0">
            <SubjectCategories>
              { categories.map(this.renderCategory) }
            </SubjectCategories>
          </div>
        </div>
        <div className={ `${styles.descriptionRow} row max-width` }>
          <div className="col-xs-12 col-md-6">
            <FrontPageDescription
              text={ description }
              facebook={ facebook_url }
              instagram={ instagram_url }
              />
          </div>
          <div className="col-xs-12 col-md-6 mt-5 mt-md-0">
            <Video url={ video_url } />
          </div>
        </div>
        <div className={ `${styles.newsRow} row max-width` }>
          <div className="col-12">
            <NewsFeed />
          </div>
        </div>
      </div>
    );
  }
}
