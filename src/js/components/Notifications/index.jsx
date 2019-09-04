import React from 'react';
import Item from './item';
import PageLayout from '../Layout';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
  }

  renderList() {
    return this.props.notifications.map((item, index) => {
      return (
        <Item
          {...item}
          key={index}
          checkRead={this.props.checkRead}
        />
      );
    });
  }

  render() {
    if (this.props.withoutHeader) return (
      <div>{this.renderList()}</div>
    );
    return (
      <PageLayout title='お知らせ'>
        {this.renderList()}
      </PageLayout>
    );
  }
}

export default Notifications;
