import { fork, put } from 'redux-saga/effects';
import { actions } from './action';

function* init() {
    yield put(actions.addNode());
}

export default function* () {
    yield fork(init);
}
