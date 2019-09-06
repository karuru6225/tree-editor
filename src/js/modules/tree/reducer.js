import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

const defaultState = {
  nodes: [
    {
      id: 1,
      parentId: null,
      answerText: null,
      title: 'id1'
    },
    {
      id: 2,
      parentId: 1,
      answerText: 'yes',
      title: 'id2'
    },
    {
      id: 3,
      parentId: 1,
      answerText: 'no',
      title: 'id3'
    },
    {
      id: 4,
      parentId: 1,
      answerText: 'none of',
      title: 'id4'
    },
    {
      id: 5,
      parentId: 2,
      answerText: 'yes',
      title: 'id5'
    },
    {
      id: 6,
      parentId: 2,
      answerText: 'no',
      title: 'id6'
    },
    {
      id: 7,
      parentId: 5,
      answerText: 'yes',
      title: 'id7'
    },
    {
      id: 8,
      parentId: 5,
      answerText: 'no',
      title: 'id8'
    },
  ]
};

export default combineReducers({
  nodes: handleActions({
    [actionTypes.ADD_NODE]: prevState => [
      ...prevState
    ]
  }, defaultState.nodes)
});
