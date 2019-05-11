import * as actionTypes from '../action/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirect: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updatedObject(state, { loading: true, error: null });

    case actionTypes.AUTH_SUCCESS:
      return updatedObject(state, {
        token: action.token,
        userId: action.userId,
        loading: false,
        error: null,
      });

    case actionTypes.AUTH_FAIL:
      return updatedObject(state, { error: action.error, loading: false });

    case actionTypes.AUTH_LOGOUT:
      return updatedObject(state, { token: null, userId: null });

      case actionTypes.SET_AUTH_REDIRECT_PATH:
      return(updatedObject(state, {authRedirect: action.path}))
    default:
      return state;
  }
};

export default reducer;

