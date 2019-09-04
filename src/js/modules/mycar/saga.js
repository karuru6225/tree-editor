import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import { actions as userActions } from '../user/action';
import Maker from 'common/model/Maker';
import VehicleModel from 'common/model/VehicleModel';
import MakerData from 'common/dto/Maker';
import VehicleModelData from 'common/dto/VehicleModel';
import User from 'common/model/User';
import CaeccoHistory from 'common/model/CaeccoHistory';
import Point from 'common/model/Point';
import { POINT_TYPE_VALUES, POINT_TYPE_MYCAR, STATUS_APPROVED } from 'common/model/Point';
import { RANK_TYPE_VALUES } from 'common/model/User';

function fetchMaker() {
  return Maker
    .select()
    .findList()
    .then((results) => {
      return results.Maker
    })
}

function fetchVehicleModel() {
  return VehicleModel
    .select()
    .findList()
    .then((results) => {
      return results.VehicleModel
    })
}

function* fetch() {
  const Maker = yield call(fetchMaker);
  const makers = Maker.map(item => {
    return new MakerData(item.objectId, item.name);
  });

  const VehicleModel = yield call(fetchVehicleModel);
  const vehicleModels = VehicleModel.map(item => {
    return new VehicleModelData(item.objectId, item.name, item.makerId);
  });

  yield put(actions.fetchSuccess(makers, vehicleModels));
}

function* send(action) {
  const status = yield select();
  const user = status.user.user;
  // ポイント付与は初回のみ
  const addPoint = (!user.vehicleModelId) ? (POINT_TYPE_VALUES.find(v => v.value === POINT_TYPE_MYCAR).point) : 0;
  const newTotalPoint = (Number(user.totalPoint) || 0) + Number(addPoint);
  const newCurrentPoint = (Number(user.currentPoint) || 0) + Number(addPoint);
  // ランクアップのチェック
  const userModel = new User();
  const newRankType = newTotalPoint ? userModel.getRankType(newTotalPoint).value : RANK_TYPE_VALUES[0].value;

  const time = new Date();
  const postData = {
    userId: user.objectId,
    startDateTime: time,
    endDateTime: time,
  }
  const updateData = {
    vehicleNumber: action.payload.vehicleNumber,
    vehicleModelId: action.payload.vehicleModel,
    totalPoint: newTotalPoint,
    currentPoint: newCurrentPoint,
    rankType: newRankType
  };

  try {
    const ret = yield call(userModel.updateUser, status.user.user.objectId, updateData);
    const updatedUser = {
      userId: ret.userId,
      objectId: ret.objectId,
      userName: ret.userName,
      email: ret.email,
      age: ret.age,
      gender: ret.gender,
      pontaId: ret.pontaId,
      otherId: ret.otherId,
      currentPoint: ret.currentPoint,
      totalPoint: ret.totalPoint,
      rankType: ret.rankType,
      vehicleModelId: ret.vehicleModelId,
      vehicleNumber: ret.vehicleNumber,
      emailVerified: ret.emailVerified
    };

    yield put(userActions.updateUserSuccess(updatedUser));

    //Caecco履歴への追加
    const caeccoModel = new CaeccoHistory(postData);
    yield caeccoModel.insert()
      .then((ret) => {
        //ポイントテーブルへの追加
        const pointModel = new Point({
          caeccoHistoryId: ret.objectId,
          point: 0,
          fixedPoint: addPoint,
          status: STATUS_APPROVED,
          pointType: POINT_TYPE_MYCAR,
        });
        return pointModel.insert()
      })
      .then((e) => {
        // console.log(e);
      })
  } catch (e) {
    console.log(e);
  }
}

export default function* () {
  yield takeEvery(actionTypes.FETCH, fetch);
  yield takeLatest(actionTypes.SEND, send);
}