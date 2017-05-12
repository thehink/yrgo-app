import { normalize, schema } from 'normalizr';
import Schemas from './schemas';

export Schemas from './schemas';

const API_ROOT = 'http://127.0.0.1/wp-json/wp/v2/';
const apiFetch = ({endpoint, method = 'GET', body, schema}) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  //const headers = new Headers();

/*
  const token = localStorage.getItem('token');

  if(token){
    headers.append('Authorization', 'Token ' + token);
  }*/

  const options = {
    method: method
  };

  if(body){
    if(body instanceof FormData){
      options.body = body;
    }else{
      options.body = JSON.stringify(body);
    }
  }

  return fetch(fullUrl, options)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return response.json();
    })
    .then(json => {


        if(schema){

          //hack
          if(schema === Schemas.TYPES){
            var asd = [];
            for (var type in json) {
              json[type].type = type;
              asd.push(json[type]);
            }
            json = asd;
          }

          return Object.assign({},
            normalize(json, schema),
          )
        }

        return json;
    });
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, method, body, types, schema } = callAPI


  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, failureType, successType ] = types;
  next(actionWith({ type: requestType }));

  return apiFetch({endpoint, method, body, schema}).then(
    response => next(actionWith({
      response: response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      response: error.response,
      error: error.message || 'Something bad happened'
    }))
  );
};
