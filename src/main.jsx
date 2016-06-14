import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './redux/reducer';
import App from './components/app';

import io from 'socket.io-client';
import { joinAccepted, startGame, serverNewBlock, setGradient } from './redux/actions';

let socket = io('https://stack-multiplayer.herokuapp.com/');


//server messages
socket.on('JOIN_ACCEPTED', function (data) {
  store.dispatch(joinAccepted(data));
});

socket.on('START_GAME', function () {
  store.dispatch(startGame());
});

socket.on('SERVER_NEW_BLOCK', function (action) {
  store.dispatch(serverNewBlock(action));
});

socket.on('SET_GRADIENT', function (grad) {
  store.dispatch(setGradient(grad.grad));
});


//middleware
let remoteMiddleware = socket => store => next => action => {
  if (action.type === 'JOIN_GAME') {
    let state = {...action.payload};
    delete state.actions;
    socket.emit('JOIN_REQUEST',state);
  } else if(action.type === 'NEW_BLOCK') {
    let newBlock = action.payload;
    socket.emit('NEW_BLOCK',newBlock);
  } else if(action.type === 'SHARE_GRADIENT'){
    let grad = action.payload;
    socket.emit('SHARE_GRADIENT',grad);
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
