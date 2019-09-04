import { fork, put, call, takeEvery, select } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import AppPot from 'common/apppot';
import CaeccoHistory from 'common/model/CaeccoHistory';
import Point from 'common/model/Point';
import { POINT_TYPE_CAECCO, POINT_TYPE_RECEIPT, STATUS_UNAPPROVED } from 'common/model/Point';

function* init() {
  yield put(actions.reset());
}

const getCaecco = state => state.caecco;

const count = () => (
  new Promise(resolve => {
    setTimeout(() => resolve(), 1000)
  })
)

function* countTimer() {
  while (true) {
    const state = yield select(getCaecco);
    if (!state.isStart) {
      return;
    }
    yield call(count);
    yield put(actions.countUp());
  }
}

function* getPicture() {
  if (window.cordova) {
    try {
      const base64Img = yield call(takePicture);
      const blogImg = dataURItoBlob(base64Img);
      yield call(sendReciept, blogImg);
    } catch (e) {
      console.error('reject to camera getPicture');
      console.error(e);
      yield put(actions.scanFailed());
    }
  } else {
    yield put(actions.scanFailed());
  }
}

function takePicture() {
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(
      (img) => {
        resolve(img);
      },
      (err) => {
        console.log(err);
        reject(err);
      }, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceTyoe: Camera.PictureSourceType.CAMERA,
        allowEdit: false
      })
  })
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI);
  var mimeString = 'image/jpeg';//dataURI.split(',')[0].split(':')[1].split(';')[0]

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

function* sendReciept(img) {
  const state = yield select(getCaecco);
  const caeccoHistoryId = state.caeccoHistoryId;
  const filename = caeccoHistoryId + '.jpg';
  try {
    AppPot.File.create(filename, img, (e) => {
      console.log("event", e);
    }).then((file) => {
      console.log("file", file);
      const pointData = new Point({
        filename: file.name,
        caeccoHistoryId: caeccoHistoryId,
        point: 15,
        status: STATUS_UNAPPROVED,
        pointType: POINT_TYPE_RECEIPT,
      });
      return pointData.insert();
    });
    console.log("receipt send complete!");
    yield put(actions.completeSendReceipt());
  } catch (e) {
    console.log(e);
    const pointData = new Point({
      caeccoHistoryId: caeccoHistoryId,
      point: 15,
      status: STATUS_UNAPPROVED,
      pointType: POINT_TYPE_RECEIPT,
      memo: '画像取得エラー'
    });
    return pointData.insert();
  }
}

function* caeccoStop(action) {
  const ret = yield call(sendCaecco, action);
  yield put(actions.sendSuccess(ret.caeccoHistoryId));
}

function* sendCaecco(action) {
  //Caecco履歴への追加、caeccoIdを返す
  const caeccoModel = new CaeccoHistory(action.payload.postData);
  const ret = yield caeccoModel.insert()
    .then((ret) => {
      // console.log(ret);
      const pointModel = new Point({
        caeccoHistoryId: ret.objectId,
        point: action.payload.point,
        status: STATUS_UNAPPROVED,
        pointType: POINT_TYPE_CAECCO,
      });
      // console.log(pointModel);
      return pointModel.insert()
    })
    .then((ret) => {
      // console.log(ret);
      return ret;
    })
  return ret;
}

export default function* () {
  yield fork(init);
  yield takeEvery(actionTypes.CAECCO_START, countTimer);
  yield takeEvery(actionTypes.SCAN_RECEIPT, getPicture);
  yield takeEvery(actionTypes.CAECCO_STOP, caeccoStop);
}
