import { fork } from 'redux-saga/effects';
import tree from './modules/tree/saga';

export default function* rootSaga() {
  yield fork(tree);
}
