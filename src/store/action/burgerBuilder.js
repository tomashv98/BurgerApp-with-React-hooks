import * as actionTypes from './actionTypes';
export const addIng = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIng = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIns = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};

export const fetchFailed = ()=>{
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  }
}

export const initIngs = () => {
  return {
    type: actionTypes.INIT_INGREDIENT
  };
};
