export const actionTypes = {
  SIGNUP: 'signup/signup',
  SIGNUP_SUCCESS: 'signup/signup_success',
  SIGNUP_FAILED: 'signup/signup_failed',
  CLOSE_DIALOG: 'signup/close_dialog',
};

export const actions = {
  signup: (requestData) => ({
    type: actionTypes.SIGNUP,
    payload: {
      requestData,
    }
  }),
  signupSuccess: () => ({
    type: actionTypes.SIGNUP_SUCCESS,
  }),
  signupFailed: (errorMessage) => ({
    type: actionTypes.SIGNUP_FAILED,
    payload: errorMessage
  }),
  closeDialog: () => ({
    type: actionTypes.CLOSE_DIALOG
  })
};
