import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { registeredEverything } from './store';

import ReactDOM from 'react-dom/server';

export const loadOnServer = (store, component) => {

  return new Promise((resolve, reject) => {
    let unsubscribe = store.subscribe(() => {

      const state = store.getState().asyncReducer;

      if(state.registeringDone && state.count === state.completed){

        console.log('whoho all content should be loaded!');

        unsubscribe();

        resolve();
      }

    });

    //trigger async loaders
    const content = ReactDOM.renderToString(component);

    store.dispatch(registeredEverything());
  });
}
