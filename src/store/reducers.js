import { ADVERTS_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from './types';

const defaultState = {
  auth: false,
  adverts: [],
};


export function auth(state= defaultState.auth, action){
    switch (action.type) {
        case AUTH_LOGIN:
            return  true
        case AUTH_LOGOUT:
            return false
        default:
          return state;
      }
    }

export function adverts(state=defaultState.adverts, action){
    switch (action.type) {
        case ADVERTS_LOADED:
            return action.payload   
        default:
          return state;
      }
}

