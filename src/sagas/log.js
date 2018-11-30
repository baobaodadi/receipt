/**
 * Created by dady on 2017/12/15.
 */
import { takeLatest, put } from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import { ENTITY_LOG } from '../config/constants';


function* fetchLog(action) {
  const { payload } = action;
  try {
    const data = yield service.get(API[ENTITY_LOG], { ...payload });


    yield put({
      type: actionTypes.UPDATE_LOG,
      payload: {
        data,
      },
    });
  }
  catch (e) {
    console.log(e);
  }
}

export default function* () {
  yield [
    takeLatest(actionTypes.FETCH_LOG, fetchLog),
  ];
}
