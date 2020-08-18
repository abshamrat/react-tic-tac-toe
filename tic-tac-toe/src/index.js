import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import uuid from 'react-uuid'
import { PersistGate } from 'redux-persist/lib/integration/react';

import { configureStore } from './redux/store';
import App from './views/App.jsx';

import { gameOperations } from './redux/game';

// At a later point, we can pull the state stored in local storage (or another source)
// and use it to create the store from a previous state.

const initialState = null; //gameOperations.resumeSession();
console.log("Initializing the state: ", initialState)

const { store, persistor } = configureStore(initialState || {});

if (!initialState) {
  console.log("Initializing the state")
  // since we don't have any persisted state, we should start a new game when the game loads

  // our new game operation returns an action object that we can use in the 
  // redux store to dispatch
  const newGame = gameOperations.newGame();
  store.dispatch(gameOperations.sessionId(uuid()));
  store.dispatch(newGame);
}

render(
  <Provider store={store}>
    <PersistGate loading={"loading..."} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);