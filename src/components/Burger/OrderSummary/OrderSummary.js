import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}:</span>{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price:{props.price}</strong>
      </p>
      <p>Continue To Checkout?</p>
      <Button btnType='Danger' clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
