import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import randomstring from 'randomstring';
import { Provider } from 'react-redux';
import store from "./store";
// import { HashRouter, Route, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router'

import TreeViewer from './containers/TreeViewer';

const Content = (props) => (
  <ContentWrapper>
    {props.text}
  </ContentWrapper>
);

const startApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <TreeViewer
        component={Content}
      />
    </Provider>
  , window.document.getElementById('root'));
};

startApp();
