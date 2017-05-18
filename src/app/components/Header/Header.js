import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logo from 'app/assets/images/logo.svg';

import styles from './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className={ styles.wrapper } >
        <nav className={`${styles.navbar} navbar navbar-toggleable-md navbar-light bg-faded`}>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            <div style={{ backgroundImage: `url(${Logo})`}} className={`${styles.logo} d-inline-block align-center`}>
            </div>
          </a>
          <div className="collapse navbar-collapse pull-right" id="navbarNav">
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
          </div>
        </nav>
      </header>
    );
  }
}