export const actionTypes = {
  FETCH: 'notification/fetch',
  FETCH_SUCCESS: 'notification/fetch_success',
  FETCH_FAILED: 'notification/fetch_failed',
  CHECK_READ: 'notification/read',
  READ_SUCCESS: 'notification/read_success',
};

export const actions = {
  checkRead: (objectId) => ({
    type: actionTypes.CHECK_READ,
    payload: { objectId }
  }),
  readSuccess: (notifications) =>({
    type: actionTypes.READ_SUCCESS,
    payload: { notifications }
  }),
  fetch: () => ({
    type: actionTypes.FETCH,
  }),
  fetchSuccess: (notifications) => ({
    type: actionTypes.FETCH_SUCCESS,
    payload: { notifications }
  }),
  fetchFailed: () => ({
    type: actionTypes.FETCH_FAILED,
  }),
};