import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { matchPath } from "react-router";

import AppPot from 'common/apppot';
import User from 'common/model/User';

import { actions, actionTypes } from './action';
import { actions as commonActions } from '../common/action';
import { actionTypes as cordovaActionTypes } from '../cordova/action';
import { actions as userActions } from '../user/action';

const STORAGE_KEY = 'authInfo';
const myStorage = localStorage;
const pushEnable = window.cordova ? true : false;
let register;

// 認証なしでアクセスできるパス
const PUBLIC_PATHS = [
  { path: '#/login', exact: true },
  { path: '#/signup', exact: true },
  { path: '#/request_reset_password', exact: true },
  { path: '#/public_contact', exact: true },
];


function getUser(userId) {
  let query = User.select()
  let where = '#User.userId = ?';
  query.where(where, userId);

  return query
    .findOne()
    .then((results) => {
      return results.User;
    });
}

function* waitRegisterDevice() {
  if (pushEnable) {
    register = (yield take(cordovaActionTypes.DEVICE_REGISTERED)).payload;
  } else {
    return null;
  }
}

function* doLogin(username, password) {
  const api = AppPot.LocalAuthenticator.login.bind(AppPot.LocalAuthenticator);
  let _device = null;

  if (pushEnable && register) {
    _device = new AppPot.Device({
      udid: window.device.uuid,
      token: register.registrationId,
      name: window.device.model,
      osType: window.device.platform
    });
  }
  console.log(_device);
  const authInfo = yield call(api, username, password, pushEnable, _device);
  if (authInfo) {
    yield call(afterLogin, authInfo);
  }
}

function* afterLogin(authInfo) {
  const userId = authInfo.getUser().userId; 
  const userModel = yield call(getUser, userId);
  if (!userModel.emailVerified) {
    yield put(actions.loginFailed('メールアドレスが確認されておりません'));
    return;
  }
  myStorage.setItem(STORAGE_KEY, authInfo.serialize());
  yield put(actions.loginSuccess({ isAuth: true }));
  yield put(push('/home'));
}

function* login(action) {
  yield put(commonActions.loadStart());

  try {
    yield call(
      doLogin,
      action.payload.username,
      action.payload.password
    );
    yield put(commonActions.loadEnd());
  } catch (err) {
    yield put(actions.loginFailed('メールアドレスまたはパスワードに間違いがあります'));
    yield put(commonActions.loadEnd());
  }
}

function* logout() {
  try {
    myStorage.removeItem(STORAGE_KEY);
    yield put(push('/login'));
    yield put(actions.logoutSuccess());
  } catch (e) {
    yield put(actions.logoutFailed());
  }
}

const ERROR_CODE_TOKEN_EXPURED = 120;

function* restoreAuthInfo(serializedAuthInfo) {
  const authInfo = AppPot.getAuthInfo();
  authInfo.deserialize(serializedAuthInfo);
  try {
  yield call(afterLogin, authInfo);
  } catch (e) {
    console.log('restoreAuthInfo failed', e);
    // yield put(push('/login'));
    if(e.code === ERROR_CODE_TOKEN_EXPURED) {
      myStorage.removeItem(STORAGE_KEY);
    }
    yield put(push('/login'));
  }
}

function* init() {
  const auth = myStorage.getItem(STORAGE_KEY);
  if (auth) {
    yield call(restoreAuthInfo, auth);
  } else {
    if (!PUBLIC_PATHS.some(p => !!matchPath(location.hash, {
      path: p.path,
      exact: p.exact,
    }))) {
      yield put(push('/login'));
    }
  }
}

export default function* () {
  yield fork(waitRegisterDevice);
  yield fork(init);
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.LOGOUT, logout);
}
