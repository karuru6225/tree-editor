import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import AppPot from 'common/apppot';
import PointExchangeHistory from 'common/model/PointExchangeHistory';
import PointExchangeItem from 'common/model/PointExchangeItem';
import ExchangeItemDto from 'common/dto/ExchangeItem';

function getExchange() {
  return PointExchangeItem
    .findAll()
    .then((results) => {
      return results.PointExchangeItem;
    })
}

function* fetchExchange() {
  const retItems = yield call(getExchange);
  const exchangeItems = retItems.map((item) => {
    return new ExchangeItemDto(
      item.objectId,
      item.name,
      item.exchangePoint,
      item.description,
      item.buttonLabel
      ).getObject();
  })
  // console.log(Items);
  yield put(actions.fetchExchangeSuccess(exchangeItems));
}

function* exchange(action) {
  try {
    const postData = action.payload.postData
    yield call(PointExchangeHistory.insert, postData);
    yield put(actions.exchangeSuccess(postData.pointExchangeItemId));
  } catch(err) {
    console.log('err', err);
    // yield put(actions.exchangeFailed);
  }
}

export default function* () {
  yield takeEvery(actionTypes.FETCH_EXCHANGE, fetchExchange);
  yield takeEvery(actionTypes.EXCHANGE, exchange);
}