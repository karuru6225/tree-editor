import { createAction } from 'redux-actions';

export const actionTypes = {
  ADD_NODE: 'tree/add_node',
};

export const actions = {
  addNode: (parentId) => ({
      type: actionTypes.ADD_NODE,
      payload: { parentId },
  }),
};
