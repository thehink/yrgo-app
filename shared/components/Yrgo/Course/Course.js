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
import Testimonial from 'components/Testimonial';
import Partners from 'components/Partners';
import YrgoShadow from 'components/YrgoShadow';
import Portfolios from 'components/Portfolios';

import instagramIcon from 'assets/images/instagramtransparent.svg';

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

  let contactPerson,
    partners;

  if (course) {
    contactPerson = state.entities.staff[course.acf.contact_person];
    partners = (course.acf.partners &&
      without(
        course.acf.partners.map(partner => state.entities.partners[partner.partner]),
        undefined
      )) || [];
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
    return Promise.all([this.props.fetchPartners(), this.props.fetchStaffs()]);
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
          <div className={'yrgo-col-1 col-md-8'}>
            <h1 className="m-0">{course.title.rendered}</h1>
            <small className="sub-heading">Yrkeshögskoleutbildning, 400 Yh-poäng</small>
          </div>
          <div className={'yrgo-col-2 col-md-4 mt-5 mt-md-0'}>
            <Button className="ml-0 ml-md-5">
              <Link to={`/course/${course.slug}/ansokan`}>Ansök Nu</Link>
            </Button>
          </div>
        </div>

        <div className={`row ${styles.informationRow}`}>
          <div className={'yrgo-col-1 col-md-7'}>
            <Image src={course.acf.thumbnail} />
          </div>
          <div className={'yrgo-col-2 col-md-5 mt-5 mt-md-0'}>
            <div className="">
              <h2>Information</h2>
              <div
                className="asd"
                dangerouslySetInnerHTML={{ __html: course.acf.additional_information }}
              />
            </div>
          </div>
        </div>

        <div className={`row ${styles.aboutRow}`}>
          <div className={'yrgo-col-1 col-md-7'}>
            <h2 className={styles.descriptionHeading}>Om Utbildningen</h2>
            <p dangerouslySetInnerHTML={{ __html: course.acf.about }} />
          </div>
          <div className={'yrgo-col-2 col-md-5 mt-5 mt-md-0'}>
            <Image src={course.acf.image_2} aspect={1} />
          </div>
        </div>

        <div className={`row ${styles.testimonialRow}`}>
          <div className={`yrgo-col-1 col-md-7 ${styles.testimonialWrapper}`}>
            <Testimonial
              testimonials={[
                {
                  name: course.acf.testimonial_name,
                  image: course.acf.testimonial_image,
                  text: course.acf.testimonial_text,
                },
              ]}
            />
          </div>
          <div className={'yrgo-col-2 col-md-5 mt-5 mt-md-0'}>
            <Image
              src={course.acf.instagram_image}
              aspect={1}
              link={'http://instagram.com'}
              icon={instagramIcon}
            />
          </div>
        </div>

        <div className={`row ${styles.partnersRow}`}>
          <div className={'yrgo-col-1 col-md-7'}>
            <h2 className={styles.descriptionHeading}>Arbetsmarknad & Lia</h2>
            <p dangerouslySetInnerHTML={{ __html: course.acf.lia }} />
          </div>
          <div className={'yrgo-col-2 col-md-5'}>
            {Boolean(partners.length) && <Partners partners={partners} />}
          </div>
        </div>

        <YrgoShadow
          className={`${styles.additionalInformation}`}
          color={'yrgoLightGreen'}
          offset={20}
        >
          <div className={`row ${styles.additionalInformationContent}`}>
            <div className={'col-xs-12 col-md-4 pr-1'}>
              <h3>Kurser</h3>
              <p dangerouslySetInnerHTML={{ __html: course.acf.courses }} />
            </div>
            <div className={'col-xs-12 col-md-4'}>
              <h3>Behörighet</h3>
              <p dangerouslySetInnerHTML={{ __html: course.acf.requirements }} />
            </div>
            <div className={'col-xs-12 col-md-4'}>
              <h3>Kontakt</h3>
              <p dangerouslySetInnerHTML={{ __html: course.acf.contact }} />
            </div>
          </div>
        </YrgoShadow>

        <Portfolios portfolios={course.acf.portfolios} />

      </div>
    );
  }
}
