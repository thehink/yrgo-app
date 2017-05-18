import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SocialButtons from 'components/SocialButtons';

import styles from './frontPageDescription.scss';

export default class FrontPageDescription extends Component {
  render() {
    return (
      <div className={ styles.wrapper } >
        <div className={ `row`}>
          <div className={`col-12 ${styles.content}`}>
            <h1>Yrgo</h1>
            <p>
              Det är lätt att stå i vägen för sig själv, att inte se möjligheterna som finns runt hörnet. Yrgo har ett 40-tal olika yrkeshögskoleutbildningar inom olika områden.
              För dig som vill skaffa dig ett yrke. För dig som vill byta yrke och för dig som vill fördjupa dig i ett yrke. Det är här du ska vara!
              Varje år utbildar sig drygt 1 600 personer hos oss på Yrgo och våra studerande är mycket eftertraktade på arbetsmarknaden, sedan länge.
            </p>
          </div>
        </div>
        <SocialButtons />
      </div>
    );
  }
}
