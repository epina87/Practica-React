//import { getAdvertsList, getTags } from '../components/adverts/service';

import {
  areAdvertsLoaded,
  areTagsLoaded,
  getAdvert,
  getAdvertsNotDelete,
} from './selectors';
import {

  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETE_FAILURE,
  ADVERT_DELETE_REQUEST,
  ADVERT_DELETE_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,

  TAGS_LOADED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  UI_RESET_ERROR,
} from './types';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLogin =
  (credentials, saveSession) =>
  async (dispatch, _getState, { service, router }) => {
    dispatch(authLoginRequest());
    try {
      await service.auth.login(credentials, saveSession);
      dispatch(authLoginSuccess());
      const to = router.state?.location?.state?.from?.pathname || '/';
      
        router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));
      
    }
  };

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSuccess = adverts => ({
  type: ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});

export const advertsLoadedFailure = error => ({
  type: ADVERTS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const advertsLoaded =
  () =>
  async (dispatch, getState, { service}) => {

    
    if (areAdvertsLoaded(getState())) {
      return;
    }

    dispatch(advertsLoadedRequest());
    console.log(service)
    try {
      const adverts = await service.adverts.getAdvertsList();
  
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
      throw error;
    }
  };

export const advertLoad =
  advertId =>
  async (dispatch, getState, { service }) => {
    const isLoaded = getAdvert(advertId)(getState());

    if (isLoaded) {
      return;
    }

    dispatch(advertLoadedRequest());
    try {
      const advert = await service.adverts.getAdvert(advertId);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      dispatch(advertLoadedFailure(error));  
    }
  };

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedSuccess = advert => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: advert,
});

export const advertLoadedFailure = error => ({
  type: ADVERT_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const tagsLoadedSuccess = tags => ({
  type: TAGS_LOADED_SUCCESS,
  payload: tags,
});

export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST,
});

export const tagsLoadedFailure = error => ({
  type: TAGS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const tagsLoaded =
  () =>
  async (dispatch, getState, { service }) => {
    if (areTagsLoaded(getState())) {
      return;
    }
    dispatch(tagsLoadedRequest());
    
    try {
      const tags = await service.adverts.getTags();
      dispatch(tagsLoadedSuccess(tags));
    } catch (error) {
      dispatch(tagsLoadedFailure(error));
      throw error;
    }
  };

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});

export const advertCreated =
  advert =>
  async (dispatch, _getState, { service, router}) => {
    dispatch(advertCreatedRequest());
    try {
      const createdAdvert = await service.adverts.createAdvert(advert, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      dispatch(advertCreatedSuccess(createdAdvert));
      
      router.navigate(`/adverts/${createdAdvert.id}`);
      
    } catch (error) {
      dispatch(advertCreatedFailure(error));
      
    }
  };

export const advertCreatedRequest = () => ({
  type: ADVERT_CREATED_REQUEST,
});

export const advertCreatedSuccess = advert => ({
  type: ADVERT_CREATED_SUCCESS,
  payload: advert,
});

export const advertCreatedFailure = error => ({
  type: ADVERT_CREATED_FAILURE,
  error: true,
  payload: error,
});

export const advertDelete =
  advertId =>
  async (dispatch, getState, { service, router }) => {
    dispatch(advertDeleteRequest());
    try {
      await service.adverts.deleteAdvert(advertId);
      const adverts = getAdvertsNotDelete(advertId)(getState());

      dispatch(advertDeleteSuccess(adverts));
      router.navigate('/adverts');
    } catch (error) {
      dispatch(advertDeleteFailure(error));
      router.navigate('/404');
      
    }
  };

export const advertDeleteRequest = () => ({
  type: ADVERT_DELETE_REQUEST,
});

export const advertDeleteSuccess = advertId => ({
  type: ADVERT_DELETE_SUCCESS,
  payload: advertId,
});

export const advertDeleteFailure = error => ({
  type: ADVERT_DELETE_FAILURE,
  error: true,
  payload: error,
});
