export const actionTypes = {
  RESET: 'request_reset_password/reset',
  REQUEST_RESET: 'request_reset_password/request_reset',
  REQUEST_RESET_SUCCESS: 'request_reset_password/request_reset_success',
  REQUEST_RESET_FAILED: 'request_reset_password/request_reset_failed',
};

export const actions = {
  reset: () => ({
    type: actionTypes.RESET
  }),
  requestReset: (email) => ({
    type: actionTypes.REQUEST_RESET,
    payload: { email },
  }),
  requestResetSuccess: (statusCode) => ({
    type: actionTypes.REQUEST_RESET_SUCCESS,
    payload: { statusCode },
  }),
  requestResetFailed: (statusCode) => ({
    type: actionTypes.REQUEST_RESET_FAILED,
    payload: { statusCode },
  }),
};
