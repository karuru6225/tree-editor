import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

const initialState = {
  makers: [],
  vehicleModels: []
};

export default handleActions({
  [actionTypes.FETCH_SUCCESS]: (prevState, action) => {
    return {
      ...prevState,
      makers: action.payload.makers,
      vehicleModels: action.payload.vehicleModels,
    };
  },
}, initialState);