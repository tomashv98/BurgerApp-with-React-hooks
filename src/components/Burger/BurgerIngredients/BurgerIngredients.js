import React, {} from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';

const BurgerIngredients = props=> {
  
    let ingredient = null;

    switch (props.type) {
      case 'bread-bottom':
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case 'bread-top':
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case 'salad':
        ingredient = <div className={classes.Salad} />;
        break;
      case 'cheese':
        ingredient = <div className={classes.Cheese} />;
        break;
      case 'bacon':
        ingredient = <div className={classes.Bacon} />;
        break;
      case 'meat':
        ingredient = <div className={classes.Meat} />;
        break;

      default:
        ingredient = null;
    }
    return ingredient;
  }


export default BurgerIngredients;

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};
