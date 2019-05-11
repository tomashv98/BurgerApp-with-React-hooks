import React from 'react';

import classes from './Burger.module.css';

import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {withRouter} from "react-router-dom"
const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(key => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <BurgerIngredients key={key + i} type={key} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    if(transformedIngredients.length === 0) {
      transformedIngredients="Please start adding ingredients"
    }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type='bread-top' />
      {transformedIngredients}
      <BurgerIngredients type='bread-bottom' />
    </div>
  );
};

export default withRouter(burger);
