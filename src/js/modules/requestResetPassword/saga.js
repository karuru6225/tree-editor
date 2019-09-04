import { call, put, takeEvery } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import axios from 'axios';

function requestReset(email) {
  const header = {
    'Content-Type': 'application/json',
  };
  const url = window.CaeccoConstants.API.REQUEST_RESET_PASSWORD.url;
  const method = window.CaeccoConstants.API.REQUEST_RESET_PASSWORD.method;
  return axios({
    method: method,
    url: url,
    headers: header,
    data: { email }
  }).catch((error) => {
    console.log(error);
    return error;
  })
}

function* requestResetPassword(action) {
  try {
    const result = yield call(requestReset, action.payload.email);
    if (result.status === 200) {
      yield put(actions.requestResetSuccess(result.status));
    } else {
      yield put(actions.requestResetFailed(result.response.status));
    }
  } catch (err) {
    console.dir(err);
    yield put(actions.requestResetFailed(500));
  }
}

export default function* () {
  yield takeEvery(actionTypes.REQUEST_RESET, requestResetPassword);
}
