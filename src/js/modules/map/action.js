export const actionTypes = {
  GEOCODE: 'map/geocode',
  GEOCODE_SUCCESS: 'map/geocodeSuccessed',
  GEOCODE_FAILED: 'map/geocodeFailed',
  FETCH: 'map/fetch',
  FETCH_SUCCESS: 'map/fetchSuccessed',
  FETCH_FAILED: 'map/fetchFailed',
  SELECT_STATION: 'map/selectStation',
  SELECT_STATION_SUCCESS: 'map/selectStationSuccessed',
};

export const actions = {
  fetch: () => ({
    type: actionTypes.FETCH,
  }),
  geocode: (stations) => ({
    type: actionTypes.GEOCODE,
    payload: {
      stations: stations
    }
  }),
  geocodeSuccess: (stations) => ({
    type: actionTypes.GEOCODE_SUCCESS,
    payload: {
      stations: stations
    }
  }),
  geocodeFailed: (error) => ({
    type: actionTypes.GEOCODE_FAILED,
    payload: {
      error: error
    }
  }),
  fetchFailed: () => ({
    type: actionTypes.FETCH_FAILED,
  }),
  selectStation: () => ({
    type: actionTypes.SELECT_STATION,
  }),
  selectSuccess: (selectedStation) => ({
    type: actionTypes.SELECT_STATION_SUCCESS,
    payload: {
      selectedStation: selectedStation
    }
  }),
};