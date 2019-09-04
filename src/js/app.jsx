import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import randomstring from 'randomstring';
// import { Provider } from 'react-redux';
// import store, { history } from "./store";
// import { HashRouter, Route, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router'

import TreeViewer from './components/TreeViewer';


const ContentWrapper = styled.div`
  border: solid 1px #ccc;
  background-color: white;
  height: 100%;
`;

const Content = (props) => (
  <ContentWrapper>
    {props.text}
  </ContentWrapper>
);

const props = { };

const randInt = (max, min = 0) => Math.floor( Math.random() * (max + 1 - min) ) + min;
const parentNodeNum = randInt(4, 1);
const parentIdx = randInt(parentNodeNum - 1);
const siblingNodeNum = randInt(4, 1);
const selfIdx = randInt(siblingNodeNum - 1);
const childNodeNum = randInt(4, 1);

const genArray = (num, func) => [...Array(num).keys()].map(func);
const parentIds = genArray(parentNodeNum, () => randomstring.generate(8));
const siblingIds = genArray(siblingNodeNum, () => randomstring.generate(8));
const childIds = genArray(childNodeNum, () => randomstring.generate(8));

const parentId = parentIds[parentIdx];
const selfId = siblingIds[selfIdx];

const treeData = [
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
];

const startApp = () => {
  ReactDOM.render(
    <TreeViewer
      parentId={parentId}
      selfId={selfId}
      parentIds={parentIds}
      siblingIds={siblingIds}
      childrenIds={childIds}
      component={Content}
      getPropsFromId={() => ({ text: 'test content' })}
    />
  , window.document.getElementById('root'));
};

startApp();
