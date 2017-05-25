import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Menu from 'components/Menu';

import styles from './companyMenu.scss';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class EducationsMenu extends Component {
  render() {
    const {} = this.props;

    const links = [
      {
        id: 1,
        title: 'Samarbeta med Yrgo',
        link: '',
        links: [
          {
            id: 1,
            title: 'Föreläs på Yrgo',
            link: '/',
          },
          {
            id: 2,
            title: 'Hitta praktikanter - LIA',
            link: '/',
          },
        ],
      },
    ];

    return <Menu className={styles.wrapper} links={links} />;
  }
}
