import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/action/index';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  /* Data received
        {-LdeCxKFAQzP2WY-mYgD: {…}}
      -LdeCxKFAQzP2WY-mYgD:
      customer: {email: "tomashv98@gmail.com", loading: false, name: "Quan Vu", psc: "14000", street: "Bitovska 1216/20"}
      ingredients: {bacon: 1, cheese: 1, meat: 0, salad: 0}
      price: "5"
      __proto__: Object
      __proto__: Object */
  /*Data returned from loop
      0:
customer: {email: "tomashv98@gmail.com", loading: false, name: "Quan Vu", psc: "14000", street: "Bitovska 1216/20"}
id: "-LdeCxKFAQzP2WY-mYgD"
ingredients: {bacon: 1, cheese: 1, meat: 0, salad: 0}
price: "5"
__proto__: Object
length: 1
__proto__: Array(0)

*/

  // const makeFirstOrder = () => {
  //   props.history.push('/');
  // };

  let orders = <Spinner />;
  if (!props.loading) {
    orders = (
      <div>
        <p>Order History Empty</p>
        {/* <Button btnType='Success' clicked={makeFirstOrder}>
          Make Your First Order!
        </Button> */}
      </div>
    );
    if (props.orders.length !== 0) {
      orders = props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
  }

  return <div>{orders}</div>;
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
