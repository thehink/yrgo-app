import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CourseCard from 'components/CourseCard';

import styles from './courseCategory.scss';


const mapStateToProps = (state, ownProps) => {

  const {
    slug
  } = ownProps.match.params;

  const category = state.wp.courseCategories.ids
  .map(id => state.entities.course_categories[id])
  .find(category => category.slug === slug);

  const courses = category && state.wp.courses.ids
  .map(id => state.entities.courses[id])
  .filter(course => course.acf.category === category.id) || [];

  return {
    category,
    courses
  };
}

const mapDispatchToProps = {
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class CourseCategory extends Component {

  renderCategory(course) {
    return (
      <div key={ course.id } className="col-xs-12 col-sm-6 col-md-4">
        <CourseCard
          image={ course.acf.thumbnail }
          link={ `/course/${course.slug}` }
          title={ course.title.rendered }
        />
      </div>
    );
  }

  render() {

    const {
      category,
      courses
    } = this.props;

    if(!category){
      return (<div>Loading...</div>);
    }

    console.log('CAT', category);

    return (
      <div className={ `${styles.wrapper} max-width` } >
        <h1>{ category.name }</h1>
        <small className="sub-heading">{ category.acf.sub_heading }</small>

        <div className="row mt-5">
          <div className="col-xs-12 col-8 p-0">
            <p>
              Gillar du att arbeta med bokföring, lagar och skatter? Att ha koll på läget, pussla ihop saker och skapa struktur? Hjälpa människor och ge dem råd? Hitta rätt varor till bästa pris från den bästa leverantören? Slå försäljningsrekord och planera resurser? Leta efter nya möjligheter att få mesta möjliga vinst till ditt företag? Då är förmodligen någon av våra utbildningar inom ekonomi, handel och administration något för dig. Där kan du skaffa dig en bred kompetens inom ekonomi och lära dig hantera allt mellan tillverkning och försäljning. Vissa utbildningar ger dig en internationell kompetens och som den hamnstad vi är har vi givetvis också utbildningar inom transportområdet.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          { courses.map(this.renderCategory) }
        </div>
      </div>
    );
  }
}
