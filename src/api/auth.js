import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from './client';
import storage from '../utils/storage';

export const login = (credentials, saveSession) => {
  return client.post('api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);

    saveSession ? storage.set('auth', accessToken) : storage.remove('auth');
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};
