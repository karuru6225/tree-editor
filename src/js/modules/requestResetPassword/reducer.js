import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

const defaultState = {
  isProcessing: false,
  isComplete: false,
  statusCode: null,
};

export default handleActions({
  [actionTypes.RESET]: () => defaultState,
  [actionTypes.REQUEST_RESET]: (prevState) => {
    return {
      ...prevState,
      isProcessing: true,
      isComplete: false,
      statusCode: null,
    };
  },
  [actionTypes.REQUEST_RESET_SUCCESS]: (prevState, action) => {
    return {
      ...prevState,
      isProcessing: false,
      isComplete: true,
      statusCode: action.payload.statusCode,
    };
  },
  [actionTypes.REQUEST_RESET_FAILED]: (prevState, action) => {
    return {
      ...prevState,
      isProcessing: false,
      isComplete: true,
      statusCode: action.payload.statusCode,
    };
  },
}, defaultState);
