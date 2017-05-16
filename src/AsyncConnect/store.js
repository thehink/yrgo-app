import { createAction, handleActions } from 'redux-actions';

export const load = createAction('@redux-conn/LOAD', key => ({ key }));
export const loadSuccess = createAction('@redux-conn/LOAD_SUCCESS', (key, data) => ({ key, data }));
export const loadFail = createAction('@redux-conn/LOAD_FAIL', (key, error) => ({ key, error }));
export const registeredEverything = createAction('@redux-conn/REGISTERED', () => ({ }));

const initialState = {
  loaded: false,
  registeringDone: false,
  count: 0,
  completed: 0,
  loadState: {},
};

export const asyncReducer = handleActions({

  [registeredEverything]: (state, { payload }) => ({
    ...state,
    registeringDone: true,
  }),

  [load]: (state, { payload }) => ({
    ...state,
    count: state.count + 1,
    loadState: {
      ...state.loadState,
      [payload.key]: {
        loading: true,
        loaded: false,
      },
    },
  }),

  [loadSuccess]: (state, { payload: { key, data } }) => ({
     ...state,
     completed: state.completed + 1,
     loadState: {
       ...state.loadState,
       [key]: {
         loading: false,
         loaded: true,
         error: null,
       },
     }
   }),

   [loadFail]: (state, { payload: { key, error } }) => ({
      ...state,
      completed: state.completed + 1,
      loadState: {
        ...state.loadState,
        [key]: {
          loading: false,
          loaded: false
        },
      },
    }),

}, initialState);
