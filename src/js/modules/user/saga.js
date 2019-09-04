import AppPot from 'common/apppot';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions, actionTypes } from './action';
import { actions as commonActions } from '../common/action';

import Maker from 'common/model/Maker';
import VehicleModel from 'common/model/VehicleModel';
import User from 'common/model/User';
import PointExchangeHistory from 'common/model/PointExchangeHistory';
import Point from 'common/model/Point';
import UserDto from '../../utility/UserData';

function getUser(userId) {
  let query = User.select()
    .join(VehicleModel, "#User.vehicleModelId=#VehicleModel.objectId")
    .join(Maker, "#VehicleModel.makerId=#Maker.objectId");
  let where = `#User.userId like '%${userId}%'`;
  query.where(where);

  return query
    .findList()
    .then((results) => {
      const users = results.User;
      const vehicleModels = results.VehicleModel;
      const makers = results.Maker;
      return users.map((user, idx) => {
        user['vehicleModel'] = vehicleModels[idx];
        user['vehicleModel']['maker'] = makers[idx];
        return user
      });
    })
}

function getMakerVehicleModels() {
  return VehicleModel.select()
    .join(Maker, "#VehicleModel.makerId=#Maker.objectId")
    .findList()
    .then((results) => {
      const ret = {};
      const makers = results.Maker;
      const vehicleModels = results.VehicleModel;
      vehicleModels.forEach((vm, idx) => {
        if (ret[vm.makerId]) {
          ret[vm.makerId].vehicleModels.push(vm);
        } else {
          ret[vm.makerId] = {
            name: makers[idx].name,
            vehicleModels: [vm],
          };
        }
      });
      return ret;
    })
}

function* fetchUser(action) {
  try {
    yield put(commonActions.loadStart());
    const userId = action.payload.userId;
    const userModel = new User();
    const retUser = yield call(getUser, userId);
    const user = retUser[0];
    const pointExchangeHistories = yield call((new PointExchangeHistory()).fetchListByUserId, user.objectId);
    const points = yield call((new Point()).fetchListByUserId, user.objectId);
    const ranking = yield call(userModel.getRanking, user.objectId);
    const makers = yield call(getMakerVehicleModels);
    const userDto = new UserDto(
      user.userId,
      user.objectId,
      user.userName,
      user.email,
      user.age,
      user.gender,
      user.pontaId,
      user.otherId,
      user.currentPoint,
      user.totalPoint,
      user.rankType,
      user.vehicleModelId,
      user.vehicleNumber,
      user.emailVerified,
      ranking,
      points,
      pointExchangeHistories
    );
    yield put(actions.fetchUserSuccess(userDto, makers));
    yield put(commonActions.loadEnd());
  } catch (err) {
    yield put(commonActions.apppotErrorHandler(err));
    yield put(push('/login'));
    yield put(commonActions.loadEnd());
  }
}

function* updateUser(action) {
  yield put(commonActions.loadStart());
  try {
    const userModel = new User();
    const result = yield call(userModel.updateUser, action.payload.objectId, action.payload.updateData);
    const state = yield select();
    const userDto = new UserDto(
      result.userId,
      result.objectId,
      result.userName,
      result.email,
      result.age,
      result.gender,
      result.pontaId,
      result.otherId,
      result.currentPoint,
      result.totalPoint,
      result.rankType,
      result.vehicleModelId,
      result.vehicleNumber,
      result.emailVerified,
      state.user.user.ranking,
      state.user.user.points,
      state.user.user.pointExchangeHistories
    );
    yield put(actions.updateUserSuccess(userDto));
    yield put(commonActions.loadEnd());
  } catch (err) {
    console.log(err);
    yield put(commonActions.apppotErrorHandler(err));
    yield put(commonActions.screenNotificationOpen('処理に失敗しました。お手数おかけしますが、時間をおいてから再度実行ください。'));
    yield put(commonActions.loadEnd());
  }
}
export default function* () {
  yield takeEvery(actionTypes.FETCH_USER, fetchUser);
  yield takeEvery(actionTypes.UPDATE_USER, updateUser);
}