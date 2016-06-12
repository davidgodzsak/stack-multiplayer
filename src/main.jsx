import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './redux/reducer'
import App from './components/app'

import io from 'socket.io-client';
import { joinAccepted, startGame } from './redux/actions';

let socket = io('http://localhost:3001');

socket.on('JOIN_ACCEPTED', function (data) {
  console.log(data);
  store.dispatch(joinAccepted(data));
});

socket.on('START_GAME', function () {
  store.dispatch(startGame());
});


let remoteMiddleware = socket => store => next => action => {
  if (action.type === 'JOIN_GAME') {
    let stats = {...  action.payload};
    delete stats.actions;
    socket.emit('JOIN_REQUEST',stats);
  }
  return next(action);
};

const createStoreWithMiddleware = applyMiddleware(
  remoteMiddleware(socket)
)(createStore);

let store = createStoreWithMiddleware(reducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);



render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
)
