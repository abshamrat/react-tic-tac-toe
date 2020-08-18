import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import * as reducers from './index';


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
  return {store, persistor};
};

export {
  configureStore
};
