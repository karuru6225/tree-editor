import { handleActions } from 'redux-actions';
import { actionTypes } from './action';
import UserData from '../../utility/UserData';

const defaultState = {
    user: new UserData().getObject(),
    makers: null,
};

export default handleActions({
    [actionTypes.RESET]: () => defaultState,
    [actionTypes.FETCH_USER_SUCCESS]: (prevState, action) => {
        return {
            ...prevState,
            user: action.payload.user,
            makers: action.payload.makers,
        };
    },
    [actionTypes.UPDATE_USER_SUCCESS]: (prevState, action) => {
        return {
            ...prevState,
            user: {
                ...(new UserData()).getObject(),
                ...prevState.user,
                ...action.payload.updateData,
              }
        };
    },
}, defaultState);
