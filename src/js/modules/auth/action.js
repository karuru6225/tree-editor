export const actionTypes = {
    DEVICE_READY: 'auth/deviceReady',
    DEVICE_REGISTERED: 'auth/deviceRegistered',
    LOGIN: 'auth/login',
    LOGIN_SUCCESS: 'auth/login_success',
    LOGIN_FAILED: 'auth/login_failed',
    LOGOUT: 'auth/logout',
    LOGOUT_SUCCESS: 'auth/logout_success',
    LOGOUT_FAILED: 'auth/logout_failed',
    RESET: 'auth/reset',
};

export const actions = {
    login: (username, password) => ({
        type: actionTypes.LOGIN,
        payload: {
            username,
            password
        }
    }),
    loginSuccess: (authInfo) => ({
        type: actionTypes.LOGIN_SUCCESS,
        payload: authInfo
    }),
    loginFailed: (errorMsg) => ({
        type: actionTypes.LOGIN_FAILED,
        payload: { errorMsg: errorMsg }  
    }),
    logout: () => ({
        type: actionTypes.LOGOUT
    }),
    logoutSuccess: () => ({
        type: actionTypes.LOGOUT_SUCCESS
    }),
    logoutFailed: () => ({
        type: actionTypes.LOGOUT_FAILED,
    })
};