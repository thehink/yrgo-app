import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Image from 'components/Image';
import Parallax from 'components/Parallax';
import SubjectCategories from 'components/SubjectCategories';
import SubjectCategory from 'components/SubjectCategories/SubjectCategory';
import FrontPageDescription from 'components/FrontPageDescription';
import Video from 'components/Video';
import NewsFeed from 'components/NewsFeed';

import styles from './home.scss';

@withRouter
export default class Home extends Component {
  componentWillMount(){
    //console.log('Render HOME!');
  }

  render() {
    return (
      <div className={ styles.wrapper }>
        <Parallax />
        <div className={ `${styles.categoryRow} row max-width` }>
          <div className="col-xs-12 col-md-5">
              <Image src="https://media.giphy.com/media/oimCQlndn6KPe/giphy.gif?response_id=591ca92665ca98ba4cb3b6fd" />
          </div>
          <div className="col-xs-12 col-md-7 mt-5 mt-md-0">
            <SubjectCategories>
              <SubjectCategory>Category1</SubjectCategory>
              <SubjectCategory>Category2</SubjectCategory>
              <SubjectCategory>Category3</SubjectCategory>
              <SubjectCategory>Category4</SubjectCategory>
              <SubjectCategory>Category5</SubjectCategory>
            </SubjectCategories>
          </div>
        </div>
        <div className={ `${styles.descriptionRow} row max-width` }>
          <div className="col-xs-12 col-md-5">
            <FrontPageDescription />
          </div>
          <div className="col-xs-12 col-md-7 mt-5 mt-md-0">
            <Video />
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
