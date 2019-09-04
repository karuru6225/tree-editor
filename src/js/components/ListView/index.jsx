import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './item';
import PageLayout from '../Layout';
import StationData from 'common/dto/Station';

const styles = (theme) => ({
  error: {
    color: theme.palette.common.red,
    textAlign: 'center',
    margin: theme.spacing.unit,
    marginTop: '32px',
    height: '16px'
  },
});

class ListView extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.fetch();
  // }

  renderList(stations) {
    console.log(this.props);
    return stations.map((item, index) => {
      return (
        <Item
          station={item}
          key={index}
          onClickStation={this.props.onClickStation}
        />
      );
    });
  }

  render() {
    const {classes, error } = this.props;
    const errorMsg = (<div className={classes.error}>{error}</div>);
    return (
      <PageLayout title='リスト'>
        {errorMsg}
        <List>
          {this.renderList(this.props.stations)}
        </List>
      </PageLayout>
    );
  }
}

ListView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  fetch: PropTypes.func.isRequired,
  onClickStation: PropTypes.func.isRequired,
  stations: PropTypes.arrayOf(PropTypes.instanceOf(StationData)).isRequired
};

export default withStyles(styles)(ListView);