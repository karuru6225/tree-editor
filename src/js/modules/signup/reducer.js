import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

const defaultState = {
  showRegisteredDialog: false,
  showErrorDialog: false,
  errorDialogMessage: ''
};

export default handleActions({
  [actionTypes.SIGNUP_SUCCESS]: () => {
    return { showRegisteredDialog: true }
  },
  [actionTypes.SIGNUP_FAILED]: (_, action) => ({
    ...defaultState,
    showErrorDialog: true,
    errorDialogMessage: action.payload
  }),
  [actionTypes.CLOSE_DIALOG]: () => defaultState,
}, defaultState);
