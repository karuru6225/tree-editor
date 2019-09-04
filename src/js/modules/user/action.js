export const actionTypes = {
  FETCH_USER: 'user/fetch_user',
  FETCH_USER_SUCCESS: 'user/fetch_user_success',
  FETCH_USER_FAILED: 'user/fetch_user_failed',
  UPDATE_USER: 'user/update_user',
  UPDATE_USER_SUCCESS: 'user/update_user_success',
  UPDATE_USER_FAILED: 'user/update_user_failed',
};

export const actions = {
  fetchUser: (userId) => ({
    type: actionTypes.FETCH_USER,
    payload: { userId }
  }),
  fetchUserSuccess: (user, makers) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    payload: { user, makers }
  }),
  updateUser: (userId, objectId, updateData) => ({
    type: actionTypes.UPDATE_USER,
    payload: { userId, objectId, updateData }
  }),
  updateUserSuccess: (updateData) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: { updateData }
  }),
};