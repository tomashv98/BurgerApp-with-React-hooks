import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from "./store/reducers/order"
import authReducer from "./store/reducers/auth"

import {watchAuth, watchBurgerBuilder, watchOrders} from "./store/sagas/index"



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, sagaMiddleware)),
);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
