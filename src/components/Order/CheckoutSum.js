import React from 'react';

import Burger from '../Burger/Burger';
import Button from "../UI/Button/Button"

import classes from "./CheckoutSum.module.css"

const OrderSum = props => {
  return (
    <div className={classes.OrderSum}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div style={{padding: "20px"}}>
      <Button btnType="Danger" clicked={props.checkCancelled} >Cancel </Button>
      <Button btnType="Success" clicked={props.checkConfirmed}>Confirm</Button>
      </div>
  
    </div>
  );
};

export default OrderSum;
