import { createStore, combineReducers, applyMiddleware } from 'redux';
import uuid from 'react-uuid'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import * as reducers from './index';
import { gameOperations } from './game';


/**
 * Persist Config
 */
const persistConfig = {
  key: 'gameState',
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  blacklist: ['actionLog']
};
 
const configureStore = (state = {}) => {
  const rootReducer = combineReducers(reducers);
  const middleware = [thunk];
  const pReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(pReducer, state, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  let returnObject = {store, persistor}

  if (!Object.keys(state).length) {
    // appending uuid
    returnObject = {...returnObject, sessionId: uuid()}
    // our new game operation returns an action object that we can use in the 
    // redux store to dispatch
    const newGame = gameOperations.newGame();
    store.dispatch(gameOperations.sessionId(returnObject.sessionId));
    store.dispatch(newGame);
  }
  return returnObject;
};

export {
  configureStore
};
