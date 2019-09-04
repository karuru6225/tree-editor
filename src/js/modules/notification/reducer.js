import { handleActions } from 'redux-actions';
import { actionTypes } from './action';
import NotificationData from 'common/dto/Notification';

const defaultState = {
    notifications: [new NotificationData()],
};

export default handleActions({
    [actionTypes.FETCH_SUCCESS]: (prevState, action) => {
        return {
            ...prevState,
            notifications: action.payload.notifications,
        };
    },
    [actionTypes.READ_SUCCESS]: (prevState, action) => {
        return {
            ...prevState,
            notifications: action.payload.notifications,
        };
    },
    [actionTypes.FETCH_FAILED]: (prevState) => {
        return {
            ...prevState,
        };
    },
}, defaultState);
