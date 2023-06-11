import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

import * as reducers from './reducers';
import * as actionCreators from './actions';

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

// const thunk = store => next => action =>{
//     if(typeof action === 'function'){
//         return action(store.dispatch, store.getState)
//     }
//     return next(action)
// }

const middleware = [thunk.withExtraArgument({auth,adverts})];

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  return store;
}
