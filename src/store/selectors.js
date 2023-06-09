import { getAdvertsList } from '../api/adverts';

export const getIsLogged = state => state.auth;

//export const getIsAdverts = state => state.adverts.areLoaded ? state.adverts.data : []

export const getIsAdverts = state => state.adverts.data;

export const getIsTags = state => state.tags.data;

export const getAdvert = advertId => state =>
  state.adverts.data.find(advert => advert.id === advertId);

export const getAdvertsNotDelete = advertId => state =>
  state.adverts.data.filter(advert => advert.id !== advertId);

export const getUi = state => state.ui;

export const areAdvertsLoaded = state => state.adverts.areLoaded;
export const areTagsLoaded = state => state.tags.areLoaded;
