/**
 * Created by dady on 2017/12/15.
 */
import { takeLatest, put } from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import { ENTITY_LIST } from '../config/constants';


function* fetchList(action) {
  const { payload } = action;
  try {
    const data = yield service.get(API[ENTITY_LIST], {
      deviceType: payload.deviceType,
      suiteId: payload.suiteId,
      categoryId: payload.categoryId,
    });

    yield put({
      type: actionTypes.UPDATE_LIST,
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
    takeLatest(actionTypes.FETCH_LIST, fetchList),
  ];
}
