import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TreeNode from '../../models/tree-node';

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

const processDataTransfer = (dataTransfer) => {
  return new Promise(resolve => {
    const [
      item
    ] = dataTransfer.items;
    console.log(item);
    if (item.kind === 'string') {
      item.getAsString((data) => {
        resolve({
          type: 'string',
          data
        });
      });
    } else if(item.kind === 'file') {
      const [
        file
      ] = dataTransfer.files;
      readFile(file).then((data) => {
        resolve({
          type: 'datauri',
          data
        });
      });
    }
  });
};

const readFile = (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result);
    });

    fileReader.readAsDataURL(file);
  });
};

const TreeViewer = (props) => {
  const [
    dragging,
    setDragging
  ] = useState(false);

  const [
    dataUri,
    setDataUri
  ] = useState('');

  const {
    treeData
  } = props;

  console.log(dataUri);

  const show = ({type, data}) => {
    switch(type) {
      case 'string': {
        console.log(data);
        break;
      }
      case 'datauri': {
        setDataUri(data);
      }
    }
  };

  const borderStyle = dragging ? 
    'solid 1px #ccc'
    :
    'dashed 1px #ccc';

  return (
    <div>
      <input
        disabled
        type="text"
        style={{
          appearance: 'none',
          width: '600px',
          height: '400px',
          border: borderStyle,
        }}
        onPaste={(e) => {
          processDataTransfer(e.nativeEvent.clipboardData).then(show);
        }}
        onDrop={(e) => {
          e.preventDefault();
          processDataTransfer(e.nativeEvent.dataTransfer).then(show);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
          return false;
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          console.log('dragend', e.type);
          return false;
        }}
      />
      <img src={dataUri} />
    </div>
  );
};

TreeViewer.propTypes = {
  treeData: PropTypes.arrayOf(PropTypes.instanceOf(TreeNode)).isRequired
};

export default TreeViewer;
