import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Avatar, ListItem, Divider } from '@material-ui/core';
import conviniIcon from "../../../images/convinienceStore.svg";
import superIcon from "../../../images/superMarket.svg";
import { STATION_TYPE_VALUES } from 'common/model/Station';
import { STATION_TYPE } from '../../constants';
import Station from 'common/dto/Station';

const styles = theme => ({
  conviniIcon: {
    backgroundColor: theme.palette.common.conviniBlue,
    width: '56px',
    height: '56px'
  },
  superIcon: {
    backgroundColor: theme.palette.common.superGreen,
    width: '56px',
    height: '56px'
  },
  text: {
    position: 'relative',
    margin: '16px',
    textAlign: 'left',
    fontFamily: theme.typography.HIraginoSans,
    fontWeight: 'normal',
    color: '#4d4d4d',
  },
  name: {
    marginBottom: '11px',
    width: '190px',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
  },
  address: {
    lineHeight: '20px',
    fontSize: '14px',
  },
  storeType: {
    marginTop: '8px',
    fontSize: '12px',
    lineHeight: '12px',
    color: '#808080'
  },
  distance: {
    position: 'absolute',
    top: '26px',
    right: '39px',
    height: '14px',
    fontFamily: theme.typography.Helvetica,
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'right',
    color: '#4d4d4d',
    letterSpacing: 0,
    texAlign: 'right',
  }
});


class StationItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickStation = this.onClickStation.bind(this);
  }

  getDistance(distance) {
    if(distance < 1000) {
      return String(Math.floor(distance)) + 'm';
    } else if (distance < 1000 * 100) {
      return String(Math.round(distance * 0.01) / 10) + 'km';
    } else {
      return String(Math.floor(distance / 1000)) + 'km';
    }
  }

  onClickStation() {
    this.props.onClickStation(this.props.station);
  }

  render() {
    const {
      name,
      address,
      distance,
      zipCode,
      stationType
    } = this.props.station;
    const type = STATION_TYPE_VALUES.find((v) => v.value === stationType);
    const { classes } = this.props;
    console.log(type);
    const stationIcon = (stationType === STATION_TYPE.CONVINI.value) ? conviniIcon : superIcon;
    return (
      <React.Fragment>
        <ListItem button component={Link} to='/station'  onClick={this.onClickStation}>
          <Avatar className={(type === STATION_TYPE.CONVINI) ? classes.conviniIcon : classes.superIcon}>
            <img src={stationIcon} height='32px' width='32px' />
          </Avatar>
          <div className={classes.text}>
            <div className={classes.name}>{name}</div>
            <div className={classes.address}>
              <div>〒{zipCode}</div>
              <div>{address}</div>
            </div>
            <div className={classes.storeType}>{type.label}</div>
          </div>
          <div className={classes.distance}>{this.getDistance(distance)}</div>
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  }
}


StationItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  station: PropTypes.instanceOf(Station).isRequired,
  onClickStation: PropTypes.func.isRequired,
};
export default withStyles(styles)(StationItem);