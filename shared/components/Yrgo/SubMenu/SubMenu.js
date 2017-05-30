import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import Button from 'components/Button';

import styles from './subMenu.scss';

@withRouter
export default class SubMenu extends Component {
  static propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.function,
  };

  renderItem(item) {
    const {
      match,
      onClick,
    } = this.props;

    return (
      <div key={`subpage_${item.id} `} className="col-xs-12 col-md-4">
        <Button
          onClick={onClick}
          className={`${(match.params.slug === item.slug && 'active') || ''}`}
        >
          <Link
            to={`/about/${item.slug}`}
            dangerouslySetInnerHTML={{ __html: item.title.rendered }}
          />
        </Button>
      </div>
    );
  }

  render() {
    const {
      items,
      className = '',
    } = this.props;

    return (
      <div className={`row ${className}`}>
        {items.map(this.renderItem.bind(this))}
      </div>
    );
  }
}
