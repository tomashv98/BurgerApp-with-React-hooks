import {  takeEvery } from 'redux-saga/effects'

import * as actionTypes from "../action/actionTypes"

import {logoutSaga, authSaga, authCheckStateSaga, checkAuthTimeoutSaga} from "./auth"
import {initIngredientsSaga} from "./burgerBuilder"
import {purchaseBurgerSaga, fetchOrdersSaga} from "./orders"

export function* watchAuth(){
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga )
  yield takeEvery(actionTypes.AUTH_USER, authSaga )
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder(){
  yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientsSaga)
}

export function* watchOrders(){
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}
