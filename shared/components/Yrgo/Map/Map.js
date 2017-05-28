import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import YrgoShadow from 'components/YrgoShadow';

import styles from './map.scss';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={props.zoom}
    defaultCenter={props.center}
    defaultOptions={{
      scrollwheel: false,
    }}
  >
    {props.markers.map(marker => (
      <Marker {...marker} onRightClick={() => props.onMarkerRightClick(marker)} />
    ))}
  </GoogleMap>
));

export default class Map extends Component {
  handleMapLoad(map) {}

  handleMapMounted(map) {}

  handleCenterChanged() {}

  handleMarkerClick() {}

  render() {
    const markers = [
      {
        position: {
          lat: 57.705690,
          lng: 11.936283,
        },
        key: 'yrgo1',
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 57.6954623,
          lng: 11.9262433,
        },
        key: 'yrgo2',
        defaultAnimation: 2,
      },
    ];

    const center = {
      lat: 57.704017,
      lng: 11.944408,
    };

    // 57.6954623,11.9262433

    // 57.704017, 11.944408

    const zoom = 13;

    return (
      <YrgoShadow className={`${styles.wrapper}`} color={'yrgoLightGreen'} offset={20}>
        <GettingStartedGoogleMap
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onMapLoad={this.handleMapLoad.bind(this)}
          zoom={zoom}
          markers={markers}
          center={center}
        />
      </YrgoShadow>
    );
  }
}
