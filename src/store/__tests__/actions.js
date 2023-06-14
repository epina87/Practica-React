import { advertsLoadedSuccess, authLogoutSucces } from '../actions';
import { ADVERTS_LOADED_SUCCESS, AUTH_LOGOUT } from '../types';

describe('advertsLoadedSuccess',() =>{
    test('advertsLoadedSuccess - should return a "ADVERTS_LOADED_SUCCESS" action', () => {
      const adverts = 'adverts';
      const expectedAction = {
        type: ADVERTS_LOADED_SUCCESS,
        payload: adverts,
      };
    
      const action = advertsLoadedSuccess(adverts)
      expect(action).toEqual(expectedAction)
    
    });
})

describe('authLogoutSucces',() =>{
    test('authLogoutSucces - should return a "AUTH_LOGOUT" action', () => {
      const expectedAction = {
        type: AUTH_LOGOUT,
      };
    
      const action = authLogoutSucces()
      expect(action).toEqual(expectedAction)
    
    });
})

