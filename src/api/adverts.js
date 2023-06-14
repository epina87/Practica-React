import client from './client';

const advertsUrl = '/api/v1/adverts';

export const getAdvertsList = () => {
  return client.get(advertsUrl);
};

export const getAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
};

export const createAdvert = (advert, headers) => {
  return client.post(advertsUrl, advert, headers);
};

export const getTags = () => {
  const url = `${advertsUrl}/tags`;
  return client.get(url);
};

export const deleteAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.delete(url);
};

export const getMe = () => {
  const url = '/api/auth/me';
  return client.get(url);
};
