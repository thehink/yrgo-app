import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Image from 'components/Image';
import Parallax from 'components/Parallax';
import SubjectCategories from 'components/SubjectCategories';
import SubjectCategory from 'components/SubjectCategories/SubjectCategory';

import styles from './home.scss';

@withRouter
export default class Home extends Component {
  componentWillMount(){
    //console.log('Render HOME!');
  }

  render() {
    return (
      <div className={ styles.wrapper }>
        <div className="row">
          <div className="col-12 p-0">
            <Parallax />
          </div>
        </div>
        <div className={ `${styles.categoryRow} row` }>
          <div className="col-5">
              <Image src="https://media.giphy.com/media/oimCQlndn6KPe/giphy.gif?response_id=591ca92665ca98ba4cb3b6fd" />
          </div>
          <div className="col-7">
            <SubjectCategories>
              <SubjectCategory>Category1</SubjectCategory>
              <SubjectCategory>Category2</SubjectCategory>
              <SubjectCategory>Category3</SubjectCategory>
              <SubjectCategory>Category4</SubjectCategory>
              <SubjectCategory>Category5</SubjectCategory>
            </SubjectCategories>
          </div>
        </div>
      </div>
    );
  }
}
