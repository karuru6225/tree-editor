import { compose, createStore, applyMiddleware } from 'redux';
import persistState from 'redux-sessionstorage';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
// import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */


const sagaMiddleware = createSagaMiddleware();

// export const history = createHashHistory();

const store = createStore(
  reducers(),
  composer(
    applyMiddleware(
      // routerMiddleware(history),
      sagaMiddleware
    ),
  )
);

sagaMiddleware.run(rootSaga);
  // .done.catch((err) => {
  //   //console.log('Error in Sagas', err);
  // });

export default store;
