import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import conviniIcon from "../../../images/convinienceStore.svg";
import superIcon from "../../../images/superMarket.svg";
import Address from '../../../images/address.svg';
import TelIcon from '../../../images/tel.svg';
import TimeIcon from '../../../images/time.svg';
import CampaignIcon from '../../../images/campaign.svg';
import LoopIcon from '../../../images/loop.svg';
import PageLayout from '../Layout';
import { STATION_TYPE } from '../../constants';
import StationData from '../../../../../common/dto/Station';


const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  points: {
    margin: '32px auto',
    paddingTop: '24px',
    height: '160px',
    width: '343px',
    color: theme.palette.common.green,
    fontFamily: theme.typography.ITCAvant,
    fontWeight: 'normal',
    textAlign: 'center'
  },
  num: {
    fontSize: '80px',
    letterSpacing: '-0.01em',
    lineHeight: '80px',
    textAlign: 'right',
  },
  unit: {
    textAlign: 'left',
    fontSize: '32px',
    lineHeight: '32px',
  },
  miniutes: {
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '24px',
    lineHeight: '24px',
    textAlign: 'left',
  },
  store: {
    fontFamily: theme.typography.Helvetica,
    margintop: '32px',
    fontSize: '20px',
    color: '#4D4D4D',
    letterSpacing: 0,
    lineHeight: '20px',
  },
  container: {
    margin: '28px 20px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  image: {
    width: '48px',
    height: '48px',
    textAlign: 'center'
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  conviniIcon: {
    display: 'flex',
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    flexShrink: '0',
    backgroundColor: theme.palette.common.conviniBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  superIcon: {
    display: 'flex',
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    flexShrink: '0',
    backgroundColor: theme.palette.common.superGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: '8px',
    fontFamily: theme.typography.Helvetica,
    fontSize: '14px',
    color: '#808080',
    letterSpacing: 0,
    lineHeight: '14px'
  },
  text: {
    display: 'block',
    marginLeft: '16px'
  },
  tel: {
    fontFamily: theme.typography.Helvetica,
    fontSize: '16px',
    color: theme.palette.common.green,
    letterSpacing: 0,
    lineHeight: '22px',
    textDecoration: 'none',
  },
  button: {
    margin: '24px 16px 24px 0px',
    borderRadius: '17px',
    borderColor: theme.palette.common.green,
    width: '100%',
    color: theme.palette.common.green,
    backgroundColor: '#FFF'
  },
  dummy: {
    height: '56px'
  }
});

class Station extends React.Component {

  render() {
    const station = this.props.selectedStation;
    const { classes } = this.props;

    const stationIcon = (station.stationType === STATION_TYPE.CONVINI.value) ? conviniIcon : superIcon;
    const navigation = 'https://www.google.com/maps/dir/?api=1&destination=' + station.position.lat + ',' + station.position.lng;

    return (
      <PageLayout title={station.name}>
        <div className={classes.root}>
          <Card className={classes.points}>
            <div><span className={classes.num}>{station.pointRate}</span><span className={classes.unit}>P/10</span><span className={classes.minutes}>分</span></div>
            <div>獲得できるe-ポイント</div>
          </Card>
          <div className={classes.store}>店舗情報</div>
          <div className={classes.container}>
            <div className={station.stationType === STATION_TYPE.CONVINI.value ? classes.conviniIcon : classes.superIcon}>
              <img src={stationIcon} height='32px' width='32px' />
            </div>
            <div className={classes.text}>{station.name}</div>
          </div>
          <div className={classes.container}>
            <div className={classes.image}>
              <img src={Address} />
            </div>
            <div className={classes.text}>
              <div className={classes.label}>住所</div>
              <div>{station.address}</div>
            </div>
          </div>

          <div className={classes.container}>
            <div className={classes.image}>
              <img src={TelIcon} />
            </div>
            <div className={classes.text}>
              <div href={`tel:${station.phoneNumber}`} className={classes.label}>電話番号</div>
              <a href={`tel:${station.phoneNumber}`} className={classes.tel}>{station.phoneNumber}</a>
            </div>
          </div>

          <div className={classes.container}>
            <div className={classes.image}>
              <img src={TimeIcon} />
            </div>
            <div className={classes.text}>
              <div className={classes.label}>営業時間</div>
              <div>{station.businessHours}</div>
            </div>
          </div>

          <div className={classes.container}>
            <div className={classes.image}>
              <img src={LoopIcon} />
            </div>
            <div className={classes.text}>
              <div className={classes.label}>caecco対応時間</div>
              <div>{station.caeccoHours}</div>
            </div>
          </div>

          <div className={classes.container}>
            <div className={classes.image}>
              <img src={CampaignIcon} />
            </div>
            <div className={classes.text}>
              <div className={classes.label}>キャンペーン情報</div>
              <div>{station.campaign}</div>
            </div>
          </div>

          <Button
            variant="outlined"
            className={classes.button}
            href={navigation}
            target="_blank"
          >アプリでルートを見る</Button>
          <div className={classes.dummy} />
        </div>
      </PageLayout>
    );
  }
}

Station.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  stations: PropTypes.arrayOf(PropTypes.instanceOf(StationData)).isRequired,
  selectedStation: PropTypes.object.isReqired,
};

export default withStyles(styles)(Station);
