import { createAction } from 'redux-actions';

export const actionTypes = {
    LOAD_START: 'common/load_start',
    LOAD_END: 'common/load_end',
    RESET: 'common/reset',
    SCREEN_NOTIFICATION_OPEN: 'common/screen_notification_open',
    SCREEN_NOTIFICATION_CLOSE: 'common/screen_notification_close',
    APPPOT_ERROR_HANDLER: 'common/apppot_error_handler',
};

export const actions = {
    loadStart: createAction(actionTypes.LOAD_START),
    loadEnd: createAction(actionTypes.LOAD_END),
    reset: createAction(actionTypes.RESET),
    screenNotificationOpen: (screenNotificationMessage, isError = true) => ({
        type: actionTypes.SCREEN_NOTIFICATION_OPEN,
        payload: { screenNotificationMessage, isError },
    }),
    screenNotificationClose: createAction(actionTypes.SCREEN_NOTIFICATION_CLOSE),
    apppotErrorHandler: apppotError => ({
        type: actionTypes.APPPOT_ERROR_HANDLER,
        payload: { apppotError },
    }),
};
