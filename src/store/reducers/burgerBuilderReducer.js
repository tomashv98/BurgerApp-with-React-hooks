import * as actionTypes from '../action/actionTypes';
import { updatedObject } from '../utility';
const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  building: false,
};

const ING_PRICES = { salad: 0.5, cheese: 0.5, bacon: 0.75, meat: 1 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const incrementedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredientsInc = updatedObject(
        state.ingredients,
        incrementedIngredient,
      );
      const updatedStateInc = {
        ingredients: updatedIngredientsInc,
        totalPrice: state.totalPrice + ING_PRICES[action.ingredientName],
        building: true,
      };
      return updatedObject(state, updatedStateInc);

    case actionTypes.REMOVE_INGREDIENT:
      const decrementedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedIngredientsDec = updatedObject(
        state.ingredients,
        decrementedIngredient,
      );
      const updatedStateDec = {
        ingredients: updatedIngredientsDec,
        totalPrice: state.totalPrice + ING_PRICES[action.ingredientName],
        building: true,
      };
      return updatedObject(state, updatedStateDec);

    case actionTypes.SET_INGREDIENT:
      return updatedObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 5,
        error: false,
        building: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return updatedObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
