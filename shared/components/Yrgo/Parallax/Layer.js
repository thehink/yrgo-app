import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Layer extends Component {
  static propTypes = {};

  render() {
    return (
      <div {...this.props} className="layer">
        {this.props.children}
      </div>
    );
  }
}
