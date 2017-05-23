import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Actions from 'store/modules/wordpress';
const { fetchCourse } = Actions;

import Button from 'components/Button';
import Image from 'components/Image';
import Testimonial from 'components/Testimonial';
import YrgoShadow from 'components/YrgoShadow';

import styles from './course.scss';

const mapStateToProps = (state, ownProps) => {
  const {
    id,
    isFetching,
  } = state.wp.course;

  const slug = ownProps.match.params.slug;

  const course = state.wp.courses.ids
    .map(id => state.entities.courses[id])
    .find(course => course.slug === slug);

  // const course = state.entities.courses[id];

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
export default class Course extends Component {
  asyncBootstrap() {
    return this.fetchData();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    return true;
    // if (this.props.isFetching) {
    //   return true;
    // }
    //
    // const slug = this.props.match.params.slug;
    //
    // return this.props.fetchCourse({ slug });
  }

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
          <div className={'col-xs-12 col-md-8 p-0'}>
            <h1>{course.title.rendered}</h1>
            <small className="sub-heading">Subheading</small>
          </div>
          <div className={'col-xs-12 col-md-4 p-0 mt-5 mt-md-0'}>
            <Button>
              <a href="#">Ansök Nu</a>
            </Button>
          </div>
        </div>

        <div className={`row ${styles.informationRow}`}>
          <div className={'col-8 p-0'}>
            <Image src={course.acf.thumbnail} />
          </div>
          <div className={'col-4 p-0'}>
            <div className="">
              <h2>Information</h2>
              <div className="asd">
                <span>Längd: </span>
                <span>80 veckor heltid</span>
              </div>
            </div>
          </div>
        </div>

        <div className={'row p-0 mt-5'}>
          <div className={'col-8 p-0'}>
            <h2 className={styles.descriptionHeading}>Om Utbildningen</h2>
            <p>{course.content.rendered}</p>
          </div>
          <div className={'col-4 p-0'}>
            <Image src={course.acf.thumbnail} aspect={1} />
          </div>
        </div>

        <div className={`row ${styles.testimonialRow}`}>
          <div className={'col-8 p-0'}>
            <Testimonial testimonials={[]} />
          </div>
          <div className={'col-4 p-0'}>
            <Image src={course.acf.thumbnail} aspect={1} link={'http://instagram.com'} />
          </div>
        </div>

        <div className={'row p-0 mt-5'}>
          <div className={'col-8 p-0'}>
            <h2 className={styles.descriptionHeading}>Arbetsmarknad & Lia</h2>
            <p>Lorem ipsum</p>
          </div>
          <div className={'col-4 p-0'}>
            Partners
          </div>
        </div>

        <YrgoShadow
          className={`${styles.additionalInformation}`}
          color={'yrgoLightGreen'}
          offset={20}
        >
          <div className={`row ${styles.additionalInformationContent}`}>
            <div className={'col-4'}>
              <h3>Kurser</h3>
              <p dangerouslySetInnerHTML={{ __html: course.acf.courses }} />
            </div>
            <div className={'col-4'}>
              <h3>Behörighet</h3>
              <p dangerouslySetInnerHTML={{ __html: course.acf.requirements }} />
            </div>
            <div className={'col-4'}>
              <h3>Kontakt</h3>
              <p dangerouslySetInnerHTML={{ __html: course.acf.contact }} />
            </div>
          </div>
        </YrgoShadow>

      </div>
    );
  }
}
