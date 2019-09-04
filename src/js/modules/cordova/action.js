import { createAction } from 'redux-actions';

export const actionTypes = {
  DEVICE_READY: 'cordova/device_ready',
  DEVICE_REGISTERED: 'cordova/device_registered',
  PUSH_NOTIFICATION: 'cordova/push_notification',
  PUSH_READY: 'common/push_ready',
};

export const actions = {
  deviceReady: createAction(actionTypes.DEVICE_READY),
  deviceRegistered : createAction(actionTypes.DEVICE_REGISTERED),
  pushNotification : createAction(actionTypes.PUSH_NOTIFICATION),
  pushReady : createAction(actionTypes.PUSH_READY),
};



