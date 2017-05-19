import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import Menu from 'components/Menu';

import Logo from 'app/assets/images/logo.svg';
import Yrgo from 'app/assets/images/yrgo.svg';

import styles from './header.scss';

@withRouter
export default class Header extends Component {
  render() {
    return (
      <header className={ styles.wrapper } >
        <nav className={`${styles.navbar} navbar navbar-light bg-faded max-width`}>
          <Link className="navbar-brand hidden-md-down" to="/">
            <div style={{ backgroundImage: `url(${Logo})`}} className={`${styles.logo} d-inline-block align-center`}>
            </div>
          </Link>
          <Link className="navbar-brand hidden-lg-up" to="/">
            <div style={{ backgroundImage: `url(${Yrgo})`}} className={`${styles.logo} ${styles.logo2} d-inline-block align-center`}>
            </div>
          </Link>
          <ul className={`${styles.nav} navbar-nav ml-auto`}>
            <li className={`${styles.link} nav-item`}>
              <NavLink activeClassName={styles.active} className="nav-link" to="/educations">Utbildningar</NavLink>
            </li>
            <li className={`${styles.link} nav-item`}>
              <NavLink activeClassName={styles.active} className="nav-link" to="/business">För Företag</NavLink>
            </li>
            <li className={`${styles.link} nav-item`}>
              <NavLink activeClassName={styles.active} className="nav-link" to="/about">Om Yrgo</NavLink>
            </li>
            <li className={`${styles.link} nav-item`}>
              <NavLink activeClassName={styles.active} className="nav-link" to="/contact">Kontakt</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
