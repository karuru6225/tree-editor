import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

const defaultState = {
    loading: false,
    openScreenNotification: false,
    screenNotificationMessage: null,
    isError: true,
    apppotError: null,
};

export default handleActions({
    [actionTypes.LOAD_START]: prevState => ({
        ...prevState,
        loading: true
    }),
    [actionTypes.LOAD_END]: prevState => ({
        ...prevState,
        loading: false
    }),

    [actionTypes.SCREEN_NOTIFICATION_OPEN]: (prevState, action) => {
        return {
            ...prevState,
            openScreenNotification: true,
            screenNotificationMessage: action.payload.screenNotificationMessage,
            isError: action.payload.isError,
        };
    },
    [actionTypes.SCREEN_NOTIFICATION_CLOSE]: prevState => ({
        ...prevState,
        openScreenNotification: false,
        screenNotificationMessage: null,
    }),
    [actionTypes.APPPOT_ERROR_HANDLER]: (prevState, action) => ({
        ...prevState,
        apppotError: action.payload.apppotError,
        screenNotificationMessage: null,
    }),
    [actionTypes.RESET]: () => defaultState
}, defaultState);
