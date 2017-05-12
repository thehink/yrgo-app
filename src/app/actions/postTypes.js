import { CALL_API, Schemas } from '../middleware/api';

export const POSTYPES_REQUEST = 'POSTYPES_REQUEST';
export const POSTYPES_FAILURE = 'POSTYPES_FAILURE';
export const POSTYPES_SUCCESS = 'POSTYPES_SUCCESS';

const postTypesRequest = () => ({
  [CALL_API]: {
    types: [ POSTYPES_REQUEST, POSTYPES_FAILURE, POSTYPES_SUCCESS ],
    endpoint: `types`,
    method: 'GET',
    schema: Schemas.TYPES
  }
});

export const fetchPostTypes = () => (dispatch, getState) =>  {
  return dispatch(postTypesRequest());
};
