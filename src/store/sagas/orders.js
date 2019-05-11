import { put } from 'redux-saga/effects';
import axios from '../../axios-order';

import * as actions from '../action/index';


export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const order = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData,
    );
    yield put(actions.purchaseBurgerSuccess(order.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${
    action.userId
  }"`;
  try {
    const orders = yield axios.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in orders.data) {
      yield fetchedOrders.push({ ...orders.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
