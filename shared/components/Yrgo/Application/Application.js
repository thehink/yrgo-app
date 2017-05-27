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
          <div className={'col-xs-12 col-md-8'}>
            <h1>Ansökan till {course.title.rendered}</h1>
            <p>
              Grundläggande behörighet
              För att ansöka till yrkeshögskolan krävs grundläggande behörighet. Vad grundläggande behörighet innebär styrs av när du studerade på gymnasienivå. Klicka här för mer information gällande grundläggande behörighet.

              Särskilda förkunskaper\u2028
              Minst betyg E i Engelska 6 och Svenska 2, eller motsvarande.

              Du ska även skicka in ett arbetsprov i din ansökan där du påvisar grundläggande kunskaper och färdigheter i programmen Photoshop eller Illustrator. Kunskaperna bedöms utifrån din förmåga att uttrycka dig kreativt, med originalitet och idérikhet i bild/grafisk form.

              Urval
              Behöriga sökande kallas till muntligt och digitalt prov. De muntliga och digitala proven samt arbetsprovet bedöms utifrån kommunikativ och analytiskförmåga, kreativitet och tekniskt kunnande. Proven bedöms av sakkunnig branschföreträdare och representant från Yrgo. Poängen från samtliga prov vägs samman och utgör den poäng som den sökande rangordnas efter i fallande ordning. Den sökande som har högst sammanlagda poäng kommer först i urvalet.

              Välkommen med din ansökan!
            </p>
          </div>
          <div className={'col-xs-12 col-md-4 mt-5 mt-md-0 p-0'}>
            <div className="row">
              <div className="col-12">
                <Button className="ml-5">
                  <Link to={`/course/${course.slug}/ansokan`}>Webbansökan</Link>
                </Button>
              </div>
              <div className="col-12 mt-5">
                <Button className="ml-5">
                  <Link to={`/course/${course.slug}/ansokan`}>Arbetsprovet</Link>
                </Button>
              </div>
              <div className="col-12 mt-5">
                {contactPerson &&
                  <Image className="mr-0" src={contactPerson.acf.image} aspect={1} />}
              </div>
              <div className="col-12 mt-5">
                Mer Information<br />
                Frågor om utbildningen <br />
                {contactPerson && contactPerson.title.rendered} <br />
                Tel: {contactPerson && contactPerson.acf.phone} <br />
                {contactPerson && contactPerson.acf.email} <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
