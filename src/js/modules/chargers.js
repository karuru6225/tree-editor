import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const initialState = {
  chargers: [
    {
      position: {
        lat: 35.755,
        lng: 139.755
      },
      type: "normal"
    },
    {
      position: {
        lat: 35.795,
        lng: 139.749	
      },
      type: "quick"
    },
    {
      position: {
        lat: 35.797,
        lng: 139.744
      },
      type: "quick"
    },
    {
      position: {
        lat: 35.655,
        lng: 139.755	
      },
      type: "normal"
    },
    {
      position: {
        lat: 35.695,
        lng: 139.765	
      },
      type: "quick"
    },
  ]
};

export default combineReducers({
  chargers: handleActions({
  }, initialState.chargers)
});