import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../action/index';

export function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get(
      process.env.REACT_APP_FB_BASE_URL + "/ingredients.json",
    );
  
    yield put(actions.setIns(res.data));
  } catch (err) {

    yield put(actions.fetchFailed());
  }
}
