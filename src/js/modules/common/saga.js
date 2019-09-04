import { fork, put, takeEvery } from 'redux-saga/effects';
import { actions as commonActions, actions, actionTypes } from './action';
import { actions as authAction } from '../auth/action';

function* init() {
    yield put(actions.reset());
}

function* apppotErrorHandler(action) {
    const error = action.payload.apppotError;
    if (error.code === 120) {
        // The token is expired.
        yield put(authAction.logout());
        yield put(commonActions.screenNotificationOpen('もう一度ログインしてください'));
    }
}

export default function* () {
    yield fork(init);
    yield takeEvery(actionTypes.APPPOT_ERROR_HANDLER, apppotErrorHandler);
}
