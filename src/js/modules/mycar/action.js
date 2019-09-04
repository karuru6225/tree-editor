export const actionTypes = {
  FETCH: 'mycar/fetch',
  FETCH_SUCCESS: 'maycar/fetchSuccessed',
  FETCH_FAILED: 'maycar/fetchFailed',
  SEND: 'mycar/send',
  SEND_SUCCESS: 'mycar/sendSuccessed'
};

export const actions = {
  fetch: () => ({
    type: actionTypes.FETCH,
  }),
  fetchSuccess: (makers, vehicleModels) => ({
    type: actionTypes.FETCH_SUCCESS,
    payload: { makers, vehicleModels }
  }),
  fetchFailed: () => ({
    type: actionTypes.FETCH_FAILED,
  }),
  send: (vehicleModel, vehicleNumber) => ({
    type: actionTypes.SEND,
    payload: { vehicleModel, vehicleNumber }
  }),
};