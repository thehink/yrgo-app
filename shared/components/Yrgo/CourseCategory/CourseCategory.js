import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CourseCard from 'components/CourseCard';

import styles from './courseCategory.scss';

const mapStateToProps = (state, ownProps) => {
  const {
    slug,
  } = ownProps.match.params;

  const category = state.wp.courseCategories.ids
    .map(id => state.entities.course_categories[id])
    .find(category => category.slug === slug);

  const courses = (category &&
    state.wp.courses.ids
      .map(id => state.entities.courses[id])
      .filter(course => course.acf.category === category.id)) || [];

  return {
    category,
    courses,
  };
};

const mapDispatchToProps = {};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class CourseCategory extends Component {
  renderCategory(course) {
    return (
      <div key={course.id} className="col-xs-12 col-sm-6 col-md-4 pl-0">
        <CourseCard
          image={course.acf.thumbnail}
          link={`/course/${course.slug}`}
          title={course.title.rendered}
        />
      </div>
    );
  }

  render() {
    const {
      category,
      courses,
    } = this.props;

    if (!category) {
      return <div>Loading...</div>;
    }

    return (
      <div className={`${styles.wrapper} max-width`}>
        <h1>{category.name}</h1>
        <small className="sub-heading">{category.acf.sub_heading}</small>

        <div className="row mt-5">
          <div
            className="col-xs-12 col-md-8 p-0"
            dangerouslySetInnerHTML={{ __html: category.acf.about }}
          />
        </div>
        <div className="row mt-5">
          {courses.map(this.renderCategory)}
        </div>
      </div>
    );
  }
}
