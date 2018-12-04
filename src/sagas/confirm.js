/**
 * Created by dady on 2017/12/15.
 */
import { takeLatest, put } from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import { ENTITY_CONFIRM } from '../config/constants';


function* fetchConfirm(action) {
  const { payload } = action;
  try {
    const data = yield service.postJson(API[ENTITY_CONFIRM], {
      ...payload
    });


    yield put({
      type: actionTypes.UPDATE_CONFIRM,
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
    takeLatest(actionTypes.FETCH_CONFIRM, fetchConfirm),
  ];
}
