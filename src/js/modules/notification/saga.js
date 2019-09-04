import { call, put, fork, select, take, takeEvery } from 'redux-saga/effects';
import Notification from 'common/model/Notification';
import { actions, actionTypes } from './action';
import NotificationData from 'common/dto/Notification';

const myStorage = localStorage;
const storageKey = 'notification';
function doFetch() {
  return Notification
    .select()
    .orderBy('#Notification.postDateTime', 'desc')
    .findList()
    .then((results) => {
      return results.Notification
    })
}

function* fetch() {
  const info = JSON.parse(myStorage.getItem(storageKey));
  // console.log(info);
  try {
    const retNotifications = yield call(doFetch);
    const notifications = retNotifications.map((item) => {
      const infoItem = info.find(i => i.id === item.objectId);
      let isRead = (infoItem) ? infoItem.isRead :false;

      return new NotificationData(
        item.objectId,
        item.title,
        item.postDateTime,
        item.content,
        isRead
      );
    });
    yield put(actions.fetchSuccess(notifications));
  } catch (err) {
    yield put(actions.fetchFailed());
  }
}

function* checkRead(action) {
  // ローカルに保存
  const id = action.payload.objectId;
  const info = JSON.parse(myStorage.getItem(storageKey));
  if(info) {
    info.push({id: id, isRead:true});
  } else {
    info = [{id: id, isRead:true}];
  }
  myStorage.setItem(storageKey, JSON.stringify(info));

  // stateを更新
  const state = yield select();
  const notifications = state.notification.notifications;
  notifications.map(item => {
    if(item.objectId === id) {
      item.isRead = true;
    }
    return item;
  })
  yield put(actions.readSuccess(notifications));
}

function* init() {
  if (!myStorage.getItem(storageKey)) {
    yield myStorage.setItem(storageKey, JSON.stringify([]));
  }
}

export default function* () {
  yield fork(init);
  yield takeEvery(actionTypes.CHECK_READ, checkRead);
  yield takeEvery(actionTypes.FETCH, fetch);
}
