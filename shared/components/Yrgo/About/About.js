import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from 'store/modules/wordpress';
const { fetchAbout, fetchPages } = Actions;

import { Element, scroller } from 'react-scroll';

import { Route } from 'react-router';

import Map from 'components/Map';
import SubMenu from 'components/SubMenu';
import SubPage from 'components/SubPage';

import styles from './about.scss';

const mapStateToProps = (state, ownProps) => {
  const page = state.wp.about.id && state.entities.pages[state.wp.about.id];
  const isFetching = state.wp.about.isFetching;

  const subPages = state.wp.pages.ids
    .map(id => state.entities.pages[id])
    .filter(subpage => subpage.parent === page.id);

  return {
    isFetching,
    page,
    subPages,
  };
};

const mapDispatchToProps = {
  fetchAbout,
  fetchPages,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class About extends Component {
  asyncBootstrap() {
    return this.fetchData();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    return this.props.fetchAbout().then((response) => {
      if (!response) {
        return;
      }

      // fetch page children
      return this.props.fetchPages({ parent: response.payload.result });
    });
  }

  componentDidMount() {}

  onClick() {
    scroller.scrollTo('myScrollToElement', {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -80,
    });
  }

  render() {
    const {
      isFetching,
      page,
      subPages,
    } = this.props;

    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (!page) {
      return <div>Page not found!</div>;
    }

    return (
      <div className={`${styles.wrapper} max-width`}>
        <h1>VI UTBILDAR SVERIGE!</h1>
        <div className={'row'}>
          <div className={'col-md-7 pl-0 mt-4'}>
            <p dangerouslySetInnerHTML={{ __html: page.acf.description }} />
          </div>
          <div className={'col-md-5'}>
            <Map />
          </div>
        </div>

        <Element name="myScrollToElement">
          <SubMenu className="mt-5" items={subPages} onClick={this.onClick} />
        </Element>

        <Route exact path="/about/:slug" render={props => <SubPage {...props} />} />
      </div>
    );
  }
}
