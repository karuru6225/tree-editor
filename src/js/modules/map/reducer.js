//import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { actionTypes } from './action';
import StationData from 'common/dto/Station';

const initialState = {
  stations: [],
  selectedStation: new StationData(),
  error: ''
};

export default handleActions({
  [actionTypes.GEOCODE_SUCCESS]: (prevState, action) => {
    return {
      ...prevState,
      stations: action.payload.stations,
      error: ''
    };
  },
  [actionTypes.GEOCODE_FAILED]: (prevState, action) => {
    return {
      ...prevState,
      stations: [],
      error: action.payload.error
    };
  },
  [actionTypes.SELECT_STATION_SUCCESS]: (prevState, action) =>{
    return {
      ...prevState,
      selectedStation: action.payload.selectedStation
    };
  }
}, initialState);