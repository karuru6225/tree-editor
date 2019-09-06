import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
import tree from './modules/tree/reducer';

export default () => combineReducers({
  tree
  // router: connectRouter(history),
});
