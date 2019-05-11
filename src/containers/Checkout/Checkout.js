import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSum from '../../components/Order/CheckoutSum';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';


const Checkout = props=> {

  const checkCancelled = () => {
    props.history.goBack();
  };

  const checkConfirmed = () => {
    props.history.replace('/checkout/contact-data');
  };
  
    let summary = <Redirect to='/' />;
    if (props.ings) {
      const purchaseRedirect =props.purchased ? <Redirect to="/"/> : null
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSum
            ingredients={props.ings}
            checkCancelled={checkCancelled}
            checkConfirmed={checkConfirmed}
          />
          <Route
            path={props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return <div>
    {summary}
    </div>
  }


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};



export default connect(mapStateToProps)(Checkout);
