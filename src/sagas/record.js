/**
 * Created by dady on 2017/12/15.
 */
import { takeLatest, put } from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import { ENTITY_RECORD } from '../config/constants';


function* fetchRecord(action) {
  const { payload } = action;
  try {
    const data = yield service.postJson(API[ENTITY_RECORD], {
      ...payload
    });

    yield put({
      type: actionTypes.UPDATE_RECORD,
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
    takeLatest(actionTypes.FETCH_RECORD, fetchRecord),
  ];
}
