import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logo from 'app/assets/images/logo.svg';
import Yrgo from 'app/assets/images/yrgo.svg';

import styles from './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className={ styles.wrapper } >
        <nav className={`${styles.navbar} navbar navbar-light bg-faded`}>
          <a className="navbar-brand hidden-md-down" href="#">
            <div style={{ backgroundImage: `url(${Logo})`}} className={`${styles.logo} d-inline-block align-center`}>
            </div>
          </a>
          <a className="navbar-brand hidden-lg-up" href="#">
            <div style={{ backgroundImage: `url(${Yrgo})`}} className={`${styles.logo} ${styles.logo2} d-inline-block align-center`}>
            </div>
          </a>
          <ul className={`${styles.nav} navbar-nav ml-auto`}>
            <li className={`${styles.link} nav-item`}>
              <a className="nav-link" href="#/utbildningar">Utbildningar</a>
            </li>
            <li className={`${styles.link} nav-item`}>
              <a className="nav-link" href="#/utbildningar">För Företag</a>
            </li>
            <li className={`${styles.link} nav-item`}>
              <a className="nav-link" href="#/utbildningar">Om Yrgo</a>
            </li>
            <li className={`${styles.link} nav-item`}>
              <a className="nav-link" href="#/utbildningar">Kontakt</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
