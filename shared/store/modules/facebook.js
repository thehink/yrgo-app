// https://graph.facebook.com/v2.9/160385684465193/posts?access_token=853774148094693|dec7590c85ddab82aea9f155de7f9975&fields=message,picture&limit=10
//

import fetch from 'isomorphic-fetch';

import { handleActions } from 'redux-actions';

const requestType = 'FACEBOOK/REQUEST/FEED/REQUEST';
const successType = 'FACEBOOK/REQUEST/FEED/SUCCESS';
const failureType = 'FACEBOOK/REQUEST/FEED/FAILURE';

export const fetchFeed = (params, force) =>
  (dispatch, getState) => {
    const state = getState().feed;

    if (Boolean(state.items.length) || state.isFetching) {
      return;
    }

    dispatch({
      type: requestType,
    });

    return fetch(
      'https://graph.facebook.com/v2.9/160385684465193/posts?access_token=853774148094693|dec7590c85ddab82aea9f155de7f9975&fields=created_time,message,full_picture&limit=10'
    )
      .then(response => response.json())
      .then((json) => {
        dispatch({
          type: successType,
          payload: json,
        });
      })
      .catch((err) => {
        dispatch({
          type: failureType,
          error: err.message,
        });
      });
  };

const initialState = {
  isFetching: false,
  items: [],
  error: '',
};

export default handleActions(
  {
    [requestType]: (state, action) => ({
      ...state,
      isFetching: true,
    }),

    [successType]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      items: payload.data,
    }),

    [failureType]: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error,
    }),
  },
  initialState
);
