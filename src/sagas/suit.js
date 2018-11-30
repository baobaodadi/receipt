/**
 * Created by dady on 2017/12/15.
 */
import { takeLatest, put } from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import { ENTITY_SUIT } from '../config/constants';


function* fetchSuit(action) {
  const { payload } = action;
  try {
    const data = yield service.get(API[ENTITY_SUIT], {
      suiteId: payload.suiteId,
      deviceType: payload.deviceType,
    });


    yield put({
      type: actionTypes.UPDATE_SUIT,
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
    takeLatest(actionTypes.FETCH_SUIT, fetchSuit),
  ];
}
