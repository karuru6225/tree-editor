import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Graph from './graph';
import RankingIcon from '../../../images/home/ranking.svg';
import Item from '../Notifications/item';
import PageLayout from '../Layout';
import UserData from '../../utility/UserData';
import Biginner from '../../../images/home/status/biginner.svg';
import Normal from '../../../images/home/status/normal.svg';
import Bronze from '../../../images/home/status/bronze.svg';
import Silver from '../../../images/home/status/silver.svg';
import Gold from '../../../images/home/status/gold.svg';
import Platina from '../../../images/home/status/platina.svg';
import Diamond from '../../../images/home/status/diamond.svg';
import NotificationData from 'common/dto/notification';
import { RANK_TYPE_VALUES } from 'common/model/User';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  card: {
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(126deg, #178FE6 0%, #FFFFFF 52%, #178FE6 100%)'
  },
  plugIcon: {
    marginRight: '4px'
  },
  statusRanking: {
    display: 'flex',
    height: '64px',

  },
  statusContainer: {
    display: 'flex',
    width: '50%',
    height: '64px',
    borderRadius: '0px 0px 0px 8px',
    background: '#f5f5f5'
  },
  ranking: {
    display: 'flex',
    padding: '18px 20px 24px 23px',
  },
  rankingNumber: {
    marginLeft: '8px',
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '18px',
    lineHeight: '18px',
  },
  rankingText: {
    fontSize: '12px',
    marginTop: '2px'
  },
  rankingContainer: {
    display: 'flex',
    width: '50%',
    height: '64px',
    borderRadius: '0px 0px 8px 0px',
    background: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    display: 'flex',
    margin: '8px 9.4px 9.4px 23px',
  },
  statusText: {
    margin: 'auto',
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '15px',
    lineHeight: '27px',
    textAlign: 'left',
    color: '#4d4d4d',
  },
  graphContainer: {
    position: 'relative',
    margin: '8px auto',
    width: '247px',
    background: 'transparent'
  },
  totalPointLabelContainer: {
    display: 'flex',
    height: '26.5px',
    lineHeight: '26.5px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalPointLabel: {
    color: '#4D4D4D',
    fontFamily: theme.typography.NotoSansRegular,
    fontSize: '16px',
    textAlign: 'left',
  },
  totalPoint: {
    margin: 'auto',
    width: '150px',
    height: '60px',
    textAlign: 'center'
  },
  totalPointNumber: {
    marginTop: 0,
    color: '#4D4D4D',
    fontSize: '60px',
    fontFamily: theme.typography.NotoSansBold,
    letterSpacing: '-0.03em',
    lineHeight: '60px',
    textAlign: 'right',
    fontWeight: 'normal',
  },
  totalPointText: {
    color: '#4D4D4D',
    fontSize: '32px'
  },
  information: {
    margin: '30px 8px 5px',
    fontFamily: theme.typography.ITCAvant,
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '24px',
    textAlign: 'left',
    color: '#4d4d4d'
  },
  name: {
    height: '48px',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#FFFFFF',
    paddingTop: '12px',
    fontFamily: theme.typography.Helvetica,
    fontColor: '#FFFFFF',
    letterSpacing: 0,
  },
  nextRank: {
    position: 'absolute',
    display: 'flex',
    overflow: 'visible',
    zIndex: '2',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '215px',
    left: '218px',
    width: '80px',
    height: '32px',
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '10px',
    lineHeight: '12px',
    textAlign: 'center',
    background: '50%',
    backgroundColor: theme.palette.common.yellow,
    color: '#FFF',
    animation: 'fadein 3.5s linear forwards',
    animationName: '$fadein',
    "&::before": {
      position: 'absolute',
      content: "''",
      border: '8px solid transparent',
      borderTopColor: theme.palette.common.yellow,
      width: '0px',
      height: '0px',
      top: '0',
      left: '-7px',
      display: 'block',
    }
  },
  "@keyframes fadein": {
    '0%': {
      opacity: '0',
    },
    '80%': {
      opacity: '0',
    },
    '80.1%': {
      opacity: '0.1',
    },
    '100%': {
      opacity: '1',
    },
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    const userID = JSON.parse(localStorage.getItem('authInfo')).user.userId;
    this.props.fetchUser(userID);
    this.props.fetchNotification();
    this.props.fetchVehicle();
  }

  renderNotification(items) {
    return items.map((item, index) => {
      return (
        <Item
          {...item}
          key={index}
        />
      );
    });
  }

  renderNext() {
    const { user, classes } = this.props;
    const { rankType, totalPoint, } = user;
    const currentRank = RANK_TYPE_VALUES.find((v) => v.value === rankType);
    // ステータス最大値なら非表示
    const isMaxRank = currentRank === RANK_TYPE_VALUES[RANK_TYPE_VALUES.length - 1];
    if (isMaxRank) {
      return null;
    }
    const toNextPoint = currentRank.toPt + 1 - totalPoint;
    return (
      <div className={classes.nextRank}>
        <div>あと{toNextPoint}pで</div><div>{RANK_TYPE_VALUES[RANK_TYPE_VALUES.findIndex((v) => v.value === rankType) + 1].label}会員</div>
      </div>
    );
  }

  getProgress() {
    const { rankType, totalPoint } = this.props.user;
    const currentRank = RANK_TYPE_VALUES.find((v) => v.value === rankType);
    // ステータス最大値なら非表示
    const isMaxRank = currentRank === RANK_TYPE_VALUES[RANK_TYPE_VALUES.length - 1];
    if (isMaxRank) {
      return null;
    }
    console.log('totalPoint', totalPoint);
    return ((totalPoint - currentRank.fromPt) / (currentRank.toPt - currentRank.fromPt + 1));
  }

  renderNotifications() {
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

  getToNextRank() {

  }

  render() {
    const { classes } = this.props;
    const { userName, totalPoint, currentPoint, rankType, ranking } = this.props.user;

    const StatusType = [
      { label: 'ビギナー', value: 10, icon: Biginner },
      { label: 'ノーマル', value: 20, icon: Normal },
      { label: 'ブロンズ', value: 30, icon: Bronze },
      { label: 'シルバー', value: 40, icon: Silver },
      { label: 'ゴールド', value: 50, icon: Gold },
      { label: 'プラチナ', value: 60, icon: Platina },
      { label: 'ダイヤモンド', value:70, icon: Diamond },
    ];

    console.log(this.getProgress());
    return (
      <PageLayout title='ホーム'>
        <div className={classes.root}>
          <div className={classes.card}>
            <div className={classes.name}>{userName}</div>
            <div className={classes.graphContainer}>
              <Graph progress={this.getProgress()} {...this.props} />
              {this.renderNext()}
            </div>

            <div className={classes.statusRanking}>
              <div className={classes.statusContainer}>
                <img className={classes.statusIcon} src={StatusType.find((v) => v.value === rankType).icon} />
                <div className={classes.statusText}>{RANK_TYPE_VALUES.find((v) => v.value === rankType).label}</div>
              </div>
              <div className={classes.rankingContainer}>
                <div className={classes.ranking}>
                  <img src={RankingIcon} />
                  <div className={classes.rankingNumber}>{ranking.rank}</div>
                  <div className={classes.rankingText}> 位/{ranking.all}人中</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.information}>INFORMATION</div>
          {this.renderNotifications()}
        </div>
      </PageLayout>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  user: PropTypes.instanceOf(UserData),
  fetchUser: PropTypes.func.isRequired,
  fetchNotification: PropTypes.func.isRequired,
  fetchVehicle: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.instanceOf(NotificationData).isRequired).isRequired,
  checkRead: PropTypes.func.isRequired,
};

export default withStyles(styles)(Home);
