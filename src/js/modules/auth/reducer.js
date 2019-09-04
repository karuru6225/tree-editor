import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

const defaultState = {
    isAuth: false,
    errorMsg: '  ',
};

export default handleActions({
    // [actionTypes.RESET]: () => defaultState,
    [actionTypes.LOGIN_SUCCESS]: (prevState, action) => {
        return {
            ...prevState,
            isAuth: action.payload.isAuth,
            isLoginError: false,
        };
    },
    [actionTypes.LOGIN_FAILED]: (_, action) => ({
        ...defaultState,
        errorMsg: action.payload.errorMsg
    }),
    [actionTypes.LOGOUT_SUCCESS]: () => defaultState,
    [actionTypes.LOGOUT_FAILED]: () => defaultState,
}, defaultState);
