import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import without from 'lodash/without';
import Actions from 'store/modules/wordpress';
const { fetchCourse, fetchStaffs, fetchPartners } = Actions;

import Button from 'components/Button';
import Image from 'components/Image';

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

  let contactPerson,
    partners;

  if (course) {
    contactPerson = state.entities.staff[course.acf.contact_person];
    partners = without(
      course.acf.partners.map(partner => state.entities.partners[partner.partner]),
      undefined
    );
  }

  // const course = state.entities.courses[id];

  return {
    course,
    isFetching,
    contactPerson,
    partners,
  };
};

const mapDispatchToProps = {
  fetchCourse,
  fetchStaffs,
  fetchPartners,
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Course extends Component {
  asyncBootstrap() {
    // preload partners & staff
    return this.fetchData();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    return Promise.all([this.props.fetchStaffs()]);
  }

  render() {
    const {
      isFetching,
      course,
      partners,
      contactPerson,
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
          <div className={'col-12 yrgo-col-1'}>
            <h1>Ansökan till {course.title.rendered}</h1>
            <p dangerouslySetInnerHTML={{ __html: course.acf.application_text }} />
          </div>
          <div className={'col-12 yrgo-col-2'}>
            <div className="row">
              <div className="col-12">
                <Button className="ml-0 ml-md-5">
                  <Link to={`/course/${course.slug}/ansokan`}>Webbansökan</Link>
                </Button>
              </div>
              <div className="col-12 mt-5">
                <Button className="ml-0 ml-md-5">
                  <Link to={`/course/${course.slug}/ansokan`}>Arbetsprovet</Link>
                </Button>
              </div>
              <div className="col-12 mt-5">
                {contactPerson &&
                  <Image className="mr-0" src={contactPerson.acf.image} aspect={1} />}
              </div>
              <div className="col-12 mt-5 text-right">
                <b>Mer Information</b><br />
                Frågor om utbildningen<br />
                {contactPerson && contactPerson.title.rendered}<br />
                Tel: {contactPerson && contactPerson.acf.phone}<br />
                {contactPerson && contactPerson.acf.email}<br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
