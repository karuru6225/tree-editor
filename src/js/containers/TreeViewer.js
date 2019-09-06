import { connect } from 'react-redux';
import TreeViewer from '../components/TreeViewer';
import TreeNode from '../models/tree-node';

function mapStateToProps(state) {
  return {
    treeData: state.tree.nodes.map(d => new TreeNode(d))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNode: (parentId) => {
      console.log('add node', parentId);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeViewer);
