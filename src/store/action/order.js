import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = err => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    loading: true
  };
};

export const purchaseBurger= (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const fetchOrdersFail = err => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return  {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId
  };
};
/*
function onOrder(orderData) is run
Due to action setup, dispatch purchaseBurgeStart(), 
which change loading state
Axios tries to post data to Firebase, 
dispatch purchaseBurgerSuccess(res.data, orderData)
res.data as id sent back from Firebase
At reducer, 
a new order object created with orderId set as id, loading set to false
*/
