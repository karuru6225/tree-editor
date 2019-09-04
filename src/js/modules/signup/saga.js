import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import axios from 'axios';


function* signup(action) {
  // console.log(action.payload.requestData);
  const body = action.payload.requestData;
  try {
    const ret = yield call(requestSignup, body);
    if (ret.data && ret.data.errCode === window.CaeccoConstants.LAMBDA.ERRORCODE_USER_ALREADY_EXISTS) {
      return yield put(actions.signupFailed('既に登録されているメールアドレスです'));
    }
    if ( ret.status === 200) {
      return yield put(actions.signupSuccess());
    } 
  } catch (e) {
    console.log(JSON.stringify(e));
    yield put(actions.signupFailed());
  }
}

function requestSignup(requestBody) {
  const header = {
    'Content-Type': 'application/json',
   };
   const url = window.CaeccoConstants.API.SIGNUP.url;
   const method = window.CaeccoConstants.API.SIGNUP.method;
   return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      headers: header,
      data: requestBody
    })
    .then((results) => {
      console.log(results);
      resolve(results);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
   });  
}

export default function* () {
  yield takeEvery(actionTypes.SIGNUP, signup);
}
