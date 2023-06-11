import { getAdvertsList } from "../components/adverts/service"

export const getIsLogged  = state => state.auth
export const getIsAdverts = state => state.adverts.data
export const getIsTags    = state => state.tags.data

export const getAdvert = (state, advertId) =>getIsAdverts(state).find(advert => advert.id === advertId) 


export const getUi = state => state.ui



export const areAdvertsLoaded = state => state.adverts.areLoaded;
export const areTagsLoaded = state => state.tags.areLoaded;