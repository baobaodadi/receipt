/**
 * Created by dady on 2017/12/15.
 */
import { takeLatest, put } from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import { ENTITY_RECEIVE } from '../config/constants';


function* fetchReceive(action) {
  const { payload } = action;
  try {
    const data = yield service.postJson(API[ENTITY_RECEIVE], {
      ...payload
    });


    yield put({
      type: actionTypes.UPDATE_RECEIVE,
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
    takeLatest(actionTypes.FETCH_RECEIVE, fetchReceive),
  ];
}
