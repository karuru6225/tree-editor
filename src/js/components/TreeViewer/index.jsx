import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import ExifParser from 'exif-parser';

import TreeNode from '../../models/tree-node';

// A1, A2, A3, A4
// B1, B2, B3, B4
// 縦 横
const PrintPageSetting = createGlobalStyle`
  @page {
    size: A4 portrait;
    margin: 10mm 5mm;
  }
  @media print {
    body {
      margin: 0;
    }
  }
`;

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

const Wrapper = styled.div`
  input {
    appearance: none;
    width: 600px;
    height: 400px;
    border: ${props => props.borderStyle};
    box-sizing: border-box;
  }
  @media print {
    width: 200mm !IMPORTANT;
    height: 277mm !IMPORTANT;
    overflow: hidden;
    input {
      width: 200mm !IMPORTANT;
      height: 277mm !IMPORTANT;
      border-color: red;
    }
  }
`;

const processDataTransfer = (dataTransfer) => {
  return new Promise(resolve => {
    const [
      item
    ] = dataTransfer.items;
    console.log(item);
    const {
      kind,
      type
    } = item;
    if (kind === 'string') {
      item.getAsString((data) => {
        resolve({
          type: 'string',
          data
        });
      });
    } else if(kind === 'file') {
      const [
        file
      ] = dataTransfer.files;
      readFile(file).then((data) => {
        if (type === 'image/jpeg') {
          const byteString = atob(data.split( "," )[1])
          const arrayBuffer = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);// charCodeAtで配列に
          }
          console.log(arrayBuffer);
          const parser = ExifParser.create(arrayBuffer.buffer);
          try {
            console.log('exif', parser.parse());
          } catch { }
        }
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
    'solid 2px #ccc'
    :
    'dashed 2px #ccc';

  return (
    <Wrapper borderStyle={borderStyle}>
      <PrintPageSetting />
      <input
        type="text"
        onPaste={(e) => {
          processDataTransfer(e.nativeEvent.clipboardData).then(show);
        }}
        onDrop={(e) => {
          e.preventDefault();
          processDataTransfer(e.nativeEvent.dataTransfer).then(show);
          setDragging(false);
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
          setDragging(false);
          return false;
        }}
      />
      <img src={dataUri} />
    </Wrapper>
  );
};

TreeViewer.propTypes = {
  treeData: PropTypes.arrayOf(PropTypes.instanceOf(TreeNode)).isRequired
};

export default TreeViewer;
