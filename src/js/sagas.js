import { fork } from 'redux-saga/effects';
import common from './modules/common/saga';
import map from './modules/map/saga';
import auth from './modules/auth/saga';
import signup from './modules/signup/saga';
import user from './modules/user/saga';
import point from './modules/point/saga';
import notification from './modules/notification/saga';
import mycar from './modules/mycar/saga';
import caecco from './modules/caecco/saga';
import requestResetPassword from './modules/requestResetPassword/saga';

export default function* rootSaga() {
  yield fork(common);
  yield fork(map);
  yield fork(auth);
  yield fork(signup);
  yield fork(user);
  yield fork(point);
  yield fork(notification);
  yield fork(mycar);
  yield fork(caecco);
  yield fork(requestResetPassword);
}
