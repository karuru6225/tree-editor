import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { matchPath } from 'react-router-dom';
import Geocode from 'react-geocode';
import { actionTypes, actions } from './action';
import Station from 'common/model/Station';
import StationData from '../../../../../common/dto/Station';

function* getPage() {
  const {
    pathname
  } = (yield select(state => state.router.location));
  return matchPath(pathname, {
    path: '/list',
    exact: true
  }) || matchPath(pathname, {
    path: '/map',
    exact: true
  }) || matchPath(pathname, {
    path: '/caecco',
    exact: true
  });
}

function* locationChange() {
  const page = yield call(getPage);
  if (page) {
    // let id;
    // if (page.params.id) {
    //   // eslint-disable-next-line
    //   id = page.params.id;
    // }
    // const {
    //   options,
    //   root
    // } = yield select(state => state.monitor);

    if (page.path === '/list') {
      yield put(actions.fetch());
    }
    // if (id) {
    //   const current = options.find(o => o.id === id);
    //   yield put(monitorActions.select(current));
    // } else {
    //   yield put(monitorActions.select(root));
    // }
  }
}

function* geocodeAddress(item, currentPosition) {
  return yield Geocode.fromAddress(item.address)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      const position = {
        lat: lat,
        lng: lng
      };
      const distance = calcDistance(currentPosition, position);
      item.position = position;
      item.distance = distance;
      return item;
    })
    .catch((error) => {
      // console.log(error);
      { error }
    });
}

function* geocode(stations) {
  Geocode.setApiKey(window.CaeccoConstants.googleMapsApiKey);
  try {
    const currentPosition = yield call(getCurrent);
    console.log(currentPosition);
    const results = yield all(stations.map(item =>
      call(geocodeAddress, item, currentPosition)
    ));
    const stationData = results.map((item) => {
      return new StationData(
        item.name,
        item.objectId,
        item.stationType,
        item.pointRate,
        item.zipCode,
        item.address,
        item.phoneNumber,
        item.businessHours,
        item.caeccoHours,
        item.campaign,
        item.position,
        item.distance,
      );
    })

    const sordedStations = sortStations(stationData);

    yield put(actions.geocodeSuccess(sordedStations));
  } catch (err) {
      // -1(PERMISSION_DENIED)->GeolocationAPI使用不可
      // -2(POSITION_UNAVAILABLE)->位置情報取得不可
      // -3(TIMEOUT)->タイムアウト
      // -0(UNKNOWN_ERROR)->不明なエラー
    console.log(err.message);
    switch (err.code) {
      case 1:
      case 2:
      case 3:
        yield put(actions.geocodeFailed("位置情報をオンにしてください"));
        break;
      default:
        yield put(actions.geocodeFailed("不明なエラー"));
        break;
    }
  }
}

function getStations() {
  return Station.findAll()
    .then((results) => {
      return results;
    })
}

const getCurrent = () => new Promise((resolve, reject) => {
  console.log(navigator);
  navigator.geolocation.getCurrentPosition(
    response => {
      console.log('OK_L111', response);
      resolve({ lat: response.coords.latitude, lng: response.coords.longitude });
    },
    err => {
      console.log('ERROR_L115', err);
      reject(err);
    },
    { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
  )
})

function* fetch() {
  try {
    const retStations = yield call(getStations);
    console.log(retStations.Station);
    yield call(geocode, retStations.Station);
  } catch (err) {
    yield put(actions.fetchFailed());
  }
}

// 2点間の距離を球面三角法を用いて算出する
// GoogleMapAPIのgeometory.computeDistanceBetweenのロジック
function calcDistance(posA, posB) {
  // console.log(posA, posB);
  const r = 6378137.0; //赤道半径
  const radLatA = posA.lat * (Math.PI / 180);
  const radLngA = posA.lng * (Math.PI / 180);
  const radLatB = posB.lat * (Math.PI / 180);
  const radLngB = posB.lng * (Math.PI / 180);

  const averageLat = Math.abs((radLatA - radLatB) / 2);
  const averageLng = Math.abs((radLngA - radLngB) / 2);
  return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(averageLat), 2) + Math.cos(radLatA) * Math.cos(radLatB) * Math.pow(Math.sin(averageLng), 2)));
}

// 現在地から近い順にソート
function sortStations(stations) {
  stations.sort((a, b) => {
    if (a.distance > b.distance) return 1;
    if (a.distance < b.distance) return -1;
    return 0
  });

  return stations;
}

function* selectStation() {
  yield put(actions.fetch());

  const action = yield take(actionTypes.GEOCODE_SUCCESS);
  const stations = action.payload.stations;
  const sortedStations = sortStations(stations);

  yield put(actions.selectSuccess(sortedStations[0]));
}

export default function* () {
  yield takeLatest([
    LOCATION_CHANGE
  ], locationChange);
  yield takeEvery(actionTypes.FETCH, fetch);
  // yield takeEvery(actionTypes.GEOCODE, geocode);
  yield takeEvery(actionTypes.SELECT_STATION, selectStation);

}