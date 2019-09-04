import React from 'react';
import PageLayout from '../Layout';
import Content from './content';

export default class Contact extends React.Component {
  render() {
    return (
      <PageLayout title='お問い合わせ'>
        <Content/>
      </PageLayout>
    );
  }
}

