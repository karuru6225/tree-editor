import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TreeNode from '../../models/tree-node';

const getTransform = (props) => {
  if (props.isMoveToParent) {
    console.log(props);
    return `translate(${-props.x}px, ${props.margin}px) scale(${1 / props.scale})`;
  }
  if (props.isMoveToChild) {
    return `translate(${-props.x}px, ${- props.y - 200 - 34 - 32 - 34}px) scale(${props.scale})`;
  }
  //return null;
  return `translate(${-props.x}px, ${-props.y}px)`;
}

const Container = styled.div`
// background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  transform: ${props => getTransform(props)};
  transition: transform 0.125s;
`;

const ViewPort = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  overflow: hidden;
`;

const NodeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  box-sizing: border-box;
//  background-color: gray;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-top: ${props => props.margin + props.lineWidth}px;
  padding-bottom: ${props => props.margin}px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const ParentsContainer = styled(NodeContainer)`
  height: ${props => props.height}px;
//  background-color: green;
`;

const ChildrenContainer = styled(NodeContainer)`
  height: ${props => props.height}px;
//  background-color: blue;
  padding-bottom: 0
`;

const getNodeBgColor = (props) => {
  if (props.padding) {
    return null;
  }
  if (props.activate) {
    return 'cyan';
  }
  return 'black';
};
const Node = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  flex-basis: ${props => props.width}px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: ${props => getNodeBgColor(props)};
  padding: 0;
  padding-right: ${props => props.margin / 2}px;
  padding-left: ${props => props.margin / 2}px;
`;

// const IdType = PropTypes.string;

class TreeViewer extends Component {
  static propTypes = {
    treeData: PropTypes.arrayOf(PropTypes.instanceOf(TreeNode)).isRequired
  }

  render() {
    const {
      treeData
    } = this.props;

    let depth = 0;
  }
}

/*
class TreeViewer extends Component {
  static propTypes = {
    baseWidth: PropTypes.number,
    baseHeight: PropTypes.number,
    baseVerticalMargin: PropTypes.number,
    baseHorizontalMargin: PropTypes.number,
    scaleFactor: PropTypes.number,
    parentId: IdType,
    parentIds:  PropTypes.arrayOf(IdType),
    selfId: IdType.isRequired,
    siblingIds: PropTypes.arrayOf(IdType),
    childrenIds: PropTypes.arrayOf(IdType),
    getPropsFromId: PropTypes.func.isRequired,
    component: PropTypes.node.isRequired,
  }

  static defaultProps = {
    baseWidth: 300,
    baseHeight: 200,
    baseVerticalMargin: 64,
    baseHorizontalMargin: 32,
    scaleFactor: 1.2,
    parentId: undefined,
    parentIds: [],
    siblingIds: [],
    childrenIds: [],
  }

  constructor(props) {
    super(props);
    this.parentContainerRef = React.createRef();
    this.siblingContainerRef = React.createRef();
    this.state = {
      moveToParent: false,
      moveToChild: false
    };
  }

  componentDidMount() {
    this.resetScrollLefts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selfId !== this.props.selfId) {
      this.resetScrollLefts();
    }
  }

  resetScrollLefts() {
    const {
      baseWidth: bw,
      baseHorizontalMargin: sx,
      scaleFactor: scale,
      parentIds,
      parentId,
      siblingIds,
      selfId
    } = this.props;
    const pIdx = parentIds.indexOf(parentId);
    const idx = siblingIds.indexOf(selfId);
    const parentScrollOffset = pIdx * (bw * scale + sx * scale);
    const scrollOffset = idx * (bw + sx);
    this.parentContainerRef.current.scrollLeft = parentScrollOffset;
    this.siblingContainerRef.current.scrollLeft = scrollOffset;
  }

  render() {
    const {
      baseWidth: bw,
      baseHeight: bh,
      baseHorizontalMargin: sx,
      baseVerticalMargin: sy,
      scaleFactor: scale,
      parentIds,
      siblingIds,
      childrenIds,
      parentId,
      selfId,
      component: NodeComponent,
      getPropsFromId
    } = this.props;
    const lineWidth = 2;

    const parentPartHeight = bh * scale / 4;
    const siblingPartWidth = bw / 4;
    const childPartHeight = bw / scale / 4;

    const parentNum = parentIds.length;
    const siblingNum = siblingIds.length;
    const childrenNum = childrenIds.length;

    const width = bw * scale * 3 + sx * scale * 3;
    const height = bh * scale + bh + bh / scale + sy * 2 + lineWidth * 2;
    const vpWidth = bw + sx * 2 + siblingPartWidth * 2;
    const vpHeight = bh + sy * 2 + childPartHeight + parentPartHeight + lineWidth * 2;
    const vpPosx = width / 2 - bw / 2 - sx - siblingPartWidth;
    const vpPosy = bh * scale - parentPartHeight;

    const getPaddingNode = (s = 1) => (
      <Node
        padding
        width={bw * s}
        height={bh * s}
        margin={sx * s}
      />
    );

    return (
      <ViewPort
        width={vpWidth}
        height={vpHeight}
      >
        <Container
          x={vpPosx}
          y={vpPosy}
          height={height}
          width={width}
          margin={sy + lineWidth}
          isMoveToParent={this.state.moveToParent}
          isMoveToChild={this.state.moveToChild}
          scale={scale}
          onClick={() => {
            this.setState({
              //moveToParent: !this.state.moveToParent
              moveToChild: !this.state.moveToChild
            });
            setTimeout(() => {
              location.reload();
            }, 500);
          }}
        >
          <ParentsContainer
            margin={sy / 2}
            width={width}
            height={bh * scale + sy}
            lineWidth={lineWidth}
            ref={this.parentContainerRef}
          >
            {getPaddingNode(scale)}
            {parentIds.map(id =>
              <Node
                key={id}
                activate={id === parentId}
                width={bw * scale}
                height={bh * scale}
                margin={sx * scale}
              >
                <NodeComponent {...getPropsFromId(id)} />
              </Node>
            )}
            {getPaddingNode(scale)}
          </ParentsContainer>
          <NodeContainer
            margin={sy / 2}
            width={bw * 3 + sx * 3}
            height={bh + sy + lineWidth}
            lineWidth={lineWidth}
            ref={this.siblingContainerRef}
          >
            {getPaddingNode()}
            {siblingIds.map(id =>
              <Node
                key={id}
                activate={id === selfId}
                width={bw}
                height={bh}
                margin={sx}
              >
                <NodeComponent {...getPropsFromId(id)} />
              </Node>
            )}
            {getPaddingNode()}
          </NodeContainer>
          <ChildrenContainer
            margin={sy / 2}
            width={vpWidth}
            height={bh / scale + sy / 2}
            lineWidth={lineWidth}
          >
            {childrenIds.map(id =>
              <Node
                key={id}
                width={bw / scale}
                height={bh / scale}
                margin={sx / scale}
              >
                <NodeComponent {...getPropsFromId(id)} />
              </Node>
            )}
          </ChildrenContainer>
        </Container>
      </ViewPort>
    );
  }
}
*/

export default TreeViewer;
