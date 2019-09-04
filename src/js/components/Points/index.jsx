import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Fab, Divider, Dialog } from '@material-ui/core';
import Plug from '../../../images/plug.svg';
import Ponta from '../../../images/ponta.svg';
import Exchange from './exchange.jsx';
import PageLayout from '../Layout';
import { DISPLAY_DATE_FORMAT } from '../../../../../web-console/src/js/constants';
import { EXCHANGE_NAME_PONTA } from 'common/model/PointExchangeItem';
import ExchangeItemDto from 'common/dto/ExchangeItem';
import moment from 'moment';
import UserDto from '../../utility/UserData';
import { POINT_TYPE_MYCAR } from 'common/model/Point';

const HISTORY_TYPE_IN = 'in';
const HISTORY_TYPE_OUT = 'out';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  summary: {
    margintop: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center',
    fontColor: '#4D4D4D',
    color: '#4D4D4D',
    backgroundColor: '#F2F2F2'
  },
  plugIcon: {
    marginRight: '4px'
  },
  PointLabelContainer: {
    display: 'flex',
    height: '26.5px',
    lineHeight: '26.5px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  PointLabel: {
    fontFamily: theme.typography.NotoRegular,
    fontSize: '16px',
    textAlign: 'left',
  },
  availablePointsNumber: {
    fontSize: '60px'
  },
  avairablePointsText: {
    fontSize: '32px'
  },
  historyHeder: {
    margin: '24px auto 16px 16px',
    fontFamily: theme.typography.HiraginoSans,
    color: '#000'
  },
  history: {
    marginLeft: '16px',
    display: 'flex'
  },
  historyText: {
    display: 'block',
    marginTop: '15px',
    marginBottom: '12px',
    textAlign: 'left',
  },
  store: {
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#4d4d4d',
  },
  date: {
    fontFamily: theme.typography.Arial,
    fontSize: '12px',
    lineHeight: '12px',
    color: '#808080',
  },
  usePoints: {
    mariginRight: '2px',
    fontFamily: theme.typography.Helvetica,
    fontWeight: 'normal',
    fontSize: '20px',
    textAlign: 'right',
    color: '#E65C73',
  },
  getPoints: {
    mariginRight: '2px',
    fontFamily: theme.typography.Helvetica,
    fontWeight: 'normal',
    fontSize: '20px',
    textAlign: 'right',
    color: '#4C99BB',
  },
  points: {
    margin: '16px 19px auto auto',
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '12px',
    lineHeight: '18px',
    textAlign: 'right',
    color: '#4d4d4d',
  },
  pointsUnit: {
    fontFamily: theme.typography.ITCAvant,
    fontWeight: 'normal',
    fontSize: '16px',
    letterSpacing: '-0.02em',
    textAlign: 'right',
    color: '#4d4d4d',
  },
  dialogPaper: {
    margin: '16px'
  },
  dialog: {
    padding: '16px',
    width: '343px',
    display: 'flex',
    flexDirection: 'column'
  },
  imgContainer: {
    maxWidth: '343px',
    height: '173px',
    textAlign: 'center'
  },
  pontaIcon: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  dialogLabel: {
    margin: '30px',
    fontFamily: theme.typography.Helvetica,
    fontSize: '20px',
    color: theme.palette.pontaOrange,
    textAlign: 'center',
  },
  dialogText: {
    marginTop: '8px',
  },
  dialogSubtext: {
    marginTop: '30px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '100%',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.green,
  },
});


class Points extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchExchange();
  }

  // カエッコ履歴と交換履歴を配列化し、作成日時の降順にソート
  createPointHistories = () => {
    const { user } = this.props;
    const histories = [];
    user.pointExchangeHistories.PointExchangeHistory.forEach((exchangeHistory, idx) => {
      const item = user.pointExchangeHistories.PointExchangeItem[idx];
      histories.push({
        createTime: exchangeHistory.serverCreateTime,
        type: HISTORY_TYPE_OUT,
        pointExchangeHistory: exchangeHistory,
        pointExchangeItem: item,
      })
    });

    user.points.CaeccoHistory.forEach((caecco, idx) => {
      const point = user.points.Point[idx];
      const station = user.points.Station[idx];
      histories.push({
        createTime: caecco.serverCreateTime,
        type: HISTORY_TYPE_IN,
        caeccoHistory: caecco,
        point: point,
        station: station,
      })
    });
    histories.sort((a, b) => {
      if (a.createTime > b.createTime) return -1;
      if (a.createTime < b.createTime) return 1;
      return 0
    });
    return histories;
  }

  renderPointsHistory() {
    const { classes } = this.props;
    const histories = this.createPointHistories();
    return histories.map((item, index) => {
      const isOut = item.type === HISTORY_TYPE_OUT;
      let detail = null;
      let point = null;
      let text = '';
      let style = null;
      if (isOut) {
        detail = item.pointExchangeItem ? item.pointExchangeItem.buttonLabel : null;
        point = item.pointExchangeHistory ? item.pointExchangeHistory.usePoint : null;
        text = '使用';
        style = classes.usePoints;
      } else {
        switch (item.point.pointType) {
          case POINT_TYPE_MYCAR:
            detail = "マイカー登録";
            break;
          default:
            detail = item.station ? item.station.name : null;
            break;
        }
        point = item.point ? item.point.fixedPoint : null;
        text = '獲得';
        style = classes.getPoints;
      }
      let listItem =
        (<React.Fragment key={index}>
          <div className={classes.history}>
            <div className={classes.historyText}>
              <div className={classes.store}>{detail}</div>
              <div className={classes.date}>
                {moment(item.createTime).format(DISPLAY_DATE_FORMAT)}
              </div>
            </div>
            <div className={classes.points}><span className={style}>{point}</span>
              <span className={classes.pointsUnit}> P</span> {text}</div>
          </div>
          <Divider />
        </React.Fragment>);
      return listItem;
    })
  }

  onClickDialigHander() {
    this.props.closeDialog();
  }

  render() {
    const { classes, user, exchange, updateUser, isPointDialogOpen, exchangedObjectId } = this.props;
    const exchangedItem = (this.props.exchangeItems) ? this.props.exchangeItems.find((v) => v.objectId === exchangedObjectId) : null;
    const isPonta = (exchangedItem) ? (exchangedItem.name === EXCHANGE_NAME_PONTA.name) : false;
    return (
      <PageLayout title='ポイント'>
        <div className={classes.root}>
          <Card className={classes.summary}>
            <div className={classes.PointLabelContainer}><img src={Plug} className={classes.plugIcon} /><div className={classes.PointLabel}>交換可能e-ポイント</div></div>
            <div><span className={classes.availablePointsNumber}>{user.currentPoint}</span><span className={classes.avairablePointsText}>P</span></div>
            <Exchange exchangeItems={this.props.exchangeItems} exchange={exchange} updateUser={updateUser} user={user} />
          </Card>
          <Divider />
          <div className={classes.historyHeder}>e-ポイント履歴</div>
          {this.renderPointsHistory()}
          <Dialog
            open={isPointDialogOpen}
            classes={{ paper: classes.dialogPaper }}
          >
            <div className={classes.dialog}>
              <div className={classes.dialogLabel}>ポイントの交換完了</div>
              {(isPonta) ? (<div className={classes.imgContainer}><img src={Ponta} className={classes.pontaIcon} /></div>) : null}
              <div className={classes.dialogText}>{exchangedItem ? exchangedItem.exchangePoint : ''}ポイントを{exchangedItem ? exchangedItem.description : ''}に交換しました。</div>
              {isPonta ? (<div className={classes.dialogSubtext}>※ポイントは管理者にて確認後付与されます</div>) : null}
              <Fab
                className={classes.button}
                variant="extended"
                onClick={() => { this.onClickDialigHander() }}
              >
                閉じる
            </Fab>
            </div>
          </Dialog>
        </div>
      </PageLayout>
    );
  }
}

Points.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  user: PropTypes.instanceOf(UserDto).isRequired,
  updateUser: PropTypes.func.isRequired,
  fetchExchange: PropTypes.func.isRequired,
  exchange: PropTypes.func.isRequired,
  isPointDialogOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  exchangedObjectId: PropTypes.string.isRequired,
  exchangeItems: PropTypes.arrayOf(PropTypes.instanceOf(ExchangeItemDto)).isRequired,
};

export default withStyles(styles)(Points);