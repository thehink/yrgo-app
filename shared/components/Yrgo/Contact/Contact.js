import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from 'store/modules/wordpress';
const { fetchContact } = Actions;

import styles from './contact.scss';

const mapStateToProps = (state, ownProps) => {
  const page = state.wp.contact.id && state.entities.pages[state.wp.contact.id];
  const isFetching = state.wp.contact.isFetching;

  return {
    isFetching,
    page,
  };
};

const mapDispatchToProps = {
  fetchContact,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Contact extends Component {
  asyncBootstrap() {
    return this.fetchData();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    return this.props.fetchContact();
  }

  renderContactInformation(contact) {
    return (
      <div key={contact.title} className={'col-xs-12 col-md-6 pl-0'}>
        <span className={'heading4'}>{contact.title}</span>
        <p
          className={`${styles.paragraph}`}
          dangerouslySetInnerHTML={{ __html: contact.information }}
        />
      </div>
    );
  }

  render() {
    const {
      isFetching,
      page,
    } = this.props;

    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (!page) {
      return <div>Page not found!</div>;
    }

    return (
      <div className={`${styles.wrapper} max-width`}>
        <h1>Kontakta Oss</h1>
        <div className={'row'}>
          {page.acf.contacts.map(this.renderContactInformation)}
        </div>
      </div>
    );
  }
}
