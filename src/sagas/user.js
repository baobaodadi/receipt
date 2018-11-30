/**
 * Created by dady on 2017/12/15.
 */
import { takeLatest, put } from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import { ENTITY_USER ,ENTITY_LOGOUT} from '../config/constants';


function* fetchUser(action) {
  const { payload } = action;
  try {
    const data = yield service.get(API[ENTITY_USER]);

    yield put({
      type: actionTypes.UPDATE_USER,
      payload: {
        data,
      },
    });
  }
  catch (e) {
    console.log(e);
  }
}

function* fetchLogout() {
  try {
    yield service.get(API[ENTITY_LOGOUT]);
  }
  catch (e) {
    console.log(e);
  }
}



export default function* () {
  yield [
    takeLatest(actionTypes.FETCH_USER, fetchUser),
    takeLatest(actionTypes.FETCH_LOGOUT, fetchLogout),
  ];
}
