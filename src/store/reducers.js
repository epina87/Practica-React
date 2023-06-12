import {

  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETE_SUCCESS,
  ADVERT_LOADED_SUCCESS,

  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,

  TAGS_LOADED_SUCCESS,
  UI_RESET_ERROR,
} from './types';

const defaultState = {
  auth: false,
  adverts: {
    areLoaded: false,
    data: [],
  },
  tags: { areLoaded: false, data: [] },
  ui: {
    isLoading: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { areLoaded: true, data: action.payload };
    case ADVERT_LOADED_SUCCESS:
      return { ...state, data: [action.payload] };
    case ADVERT_CREATED_SUCCESS:
        return {...state, data:[...state.data,action.payload]}
    case ADVERT_DELETE_SUCCESS:
        return {...state, data: action.payload}

    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case TAGS_LOADED_SUCCESS:
      return { areLoaded: true, data: action.payload };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { isLoading: false, error: action.payload };
  }

  if (/_REQUEST$/.test(action.type)) {
    return { isLoading: true, error: null };
  }

  if (/_SUCCESS$/.test(action.type)) {
    return { isLoading: false, error: null };
  }

  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  return state;
}
