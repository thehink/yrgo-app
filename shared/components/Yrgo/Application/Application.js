import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Actions from 'store/modules/wordpress';
const { fetchCourse } = Actions;

import Button from 'components/Button';

import styles from './application.scss';

const mapStateToProps = (state, ownProps) => {
  const {
    id,
    isFetching,
  } = state.wp.course;

  const slug = ownProps.match.params.slug;

  const course = state.wp.courses.ids
    .map(id => state.entities.courses[id])
    .find(course => course.slug === slug);

  return {
    course,
    isFetching,
  };
};

const mapDispatchToProps = {
  fetchCourse,
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Footer extends Component {
  render() {
    const {
      isFetching,
      course,
    } = this.props;

    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (!course) {
      return <div>Course does not exist!</div>;
    }

    return (
      <div className={`${styles.wrapper} max-width`}>
        <div className={'row'}>
          <div className={'col-xs-12 col-md-8'}>
            <h1>Ansökan till {course.title.rendered}</h1>
          </div>
          <div className={'col-xs-12 col-md-4 mt-5 mt-md-0 p-0'}>
            <div className="row">
              <div className="col-12">
                <Button>
                  <Link to={`/course/${course.slug}/ansokan`}>Webbansökan</Link>
                </Button>
              </div>
              <div className="col-12">
                <Button>
                  <Link to={`/course/${course.slug}/ansokan`}>Arbetsprovet</Link>
                </Button>
              </div>
              <div className="col-12">
                Image
              </div>
              <div className="col-12">
                Information
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
