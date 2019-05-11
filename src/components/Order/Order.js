import React from 'react';

import classes from './Order.module.css';

const Order = props => {
  const ingredientsArr = [];
  for (let ing in props.ingredients) {
    ingredientsArr.push({ name: ing, amount: props.ingredients[ing] });
  }
  const ingOutput = ingredientsArr.map(ig => {
    return (
      <span
        className={classes.ing}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
     
    </div>
  );
};

export default Order;
