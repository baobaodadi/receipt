import { handleActions } from 'redux-actions';
import * as actionTypes from '../config/actionTypes';


const inintialState = {
  data: [],
};

export default handleActions({
  [actionTypes.UPDATE_BACK]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, inintialState);
