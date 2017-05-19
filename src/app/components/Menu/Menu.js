import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

import styles from './menu.scss';

@withRouter
export default class Menu extends Component {

  static propTypes = {
    links: PropTypes.array.isRequired
  }

  renderMenuItem(item){
    return (
      <div key={ item.id + Math.random() } className={ styles.item }>
        <Link to={ item.link } className={ styles.link }>{ item.title }</Link>
      </div>
    );
  }

  renderMenuCategory(category){
    return (
      <div key={ category.id + Math.random() } className={ `${styles.category} card` }>
        <Link to={ category.link } className={ styles.link }>{ category.title }</Link>
        <div className={ styles.itemsWrapper }>
          { category.links && category.links.map(this.renderMenuItem)}
        </div>
      </div>
    );
  }

  closeMenu(){
    if(this.props.history.length > 2)
    {
      this.props.history.goBack();
    }
    else
    {
      this.props.history.push('/');
    }
  }

  render() {

    const {
      links
    } = this.props;

    return (
      <menu className={ `max-width ${styles.wrapper}` } >

        <Button onClick={ this.closeMenu.bind(this) } className={ styles.closeButton }>
          X
        </Button>

        <div className={`card-columns`}>
          { links.map(this.renderMenuCategory.bind(this)) }
        </div>
      </menu>
    );
  }
}
