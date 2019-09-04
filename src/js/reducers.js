import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import common from './modules/common/reducer';
import map from './modules/map/reducer';
import chargers from './modules/chargers.js';
import auth from './modules/auth/reducer';
import signup from './modules/signup/reducer';
import user from './modules/user/reducer';
import point from './modules/point/reducer';
import notification from './modules/notification/reducer';
import mycar from './modules/mycar/reducer';
import caecco from './modules/caecco/reducer';
import requestResetPassword from './modules/requestResetPassword/reducer';

export default history => combineReducers({
  common,
  map,
  chargers,
  auth,
  signup,
  user,
  point,
  notification,
  mycar,
  caecco,
  requestResetPassword,
  router: connectRouter(history),
});
