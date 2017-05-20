import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Menu from 'components/Menu';

import styles from './educationsMenu.scss';

const mapStateToProps = (state, ownProps) => {

  const categories = Boolean(state.wp.courseCategories.ids) && state.wp.courseCategories.ids.map(id => state.entities.course_categories[id]) || [];
  const courses = Boolean(state.wp.courses.ids) && state.wp.courses.ids.map(id => state.entities.courses[id]) || [];

  return {
    categories,
    courses
  };
}

const mapDispatchToProps = {
};

@connect(mapStateToProps, mapDispatchToProps)
export default class EducationsMenu extends Component {

  render() {

    const {
      courses,
      categories
    } = this.props;

    const links = [];

    categories.forEach(category => {
      const courseLinks = courses.filter(course => course.acf.category === category.id)
      .map(course => ({
        id: course.id,
        title: course.title.rendered,
        link: `/course/${course.slug}`
      }));

      links.push({
        id: category.id,
        title: category.name,
        link: `/course/category/${category.slug}`,
        links: courseLinks,
      });
    });

    return (
      <Menu className={ styles.wrapper }
        links={ links }
      />
    );
  }
}
