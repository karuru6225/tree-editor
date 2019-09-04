import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Fab, Button } from '@material-ui/core';
import CaeccoButton from '../../../images/caecco/button.svg';
import StopButton from '../../../images/stopicon.svg';
import CaeccoWaitImg from '../../../images/caecco.svg';
import CaeccoAnimetion from '../../../images/caecco.gif';
import PageLayout from '../Layout';
import ButtonSound from '../../../audio/decision4.mp3';
import StationData from 'common/dto/Station';
import PointGetImg from '../../../images/caecco/pointget.svg';
import UserDto from '../../utility/UserData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // height: '100%'
  },
  text: {
    opacity: 0,
    position: 'absolute',
    margin: '-28px auto auto 0',
    width: '96px',
    height: '34px',
    borderRadius: '17px',
    backgroundColor: theme.palette.common.yellow,
    color: '#FFF',
    fontFamily: theme.typography.HiraginoKakuGo,
    fontColor: '#FFFFFF',
    fontSize: '12px',
    lineHeight: '34px',
    textAlign: 'center',
  },
  progressContainer: {
    position: 'relative',
    margin: '58px auto auto auto',
    display: 'flex',
    width: '311px',
    height: '92px',
    overFlow: 'visible'
  },
  caeccoImg: {
    width: '312px',
    height: '100px',
  },
  place: {
    textAlign: 'center',
    margin: theme.spacing.unit,
    marginTop: '32px',
    height: '16px'
  },
  buttonWrapper: {
    marginTop: 42,
    textAlign: 'center',
    display: 'flex',
    height: '120px',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  pointContainer: {
    margin: '36px auto 24px auto',
    width: '327px',
    borderRadius: '8px',
    background: 'transparent',
    border: '2px solid #a5b3a0',
    color: theme.palette.common.green,
    textAlign: 'center',
    lineHeight: '24px',
    fontFamily: theme.typography.HiraginoSans,
    fontWeight: 'normal',
  },
  pointLabel: {
    margin: '20px auto 24px auto',
    fontSize: '16px',
    height: '16px'
  },
  points: {
    margin: '24px auto 15px auto',
    fontSize: '24px',
    height: '25px'
  },
  detail: {
    marginBottom: '12px',
    fontFamily: theme.typography.HiraginoKakuGo,
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '14px',
    textAlign: 'center',
    color: '#4d4d4d',
  },
  button: {
    height: '120px',
    width: '120px',
    borderRadius: '50%',
    filter: 'drop-shadow(0px 0px 16px rgba(131, 153, 122, 0.3))',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '18px',
    letterSpacing: '0.1em',
    lineHeight: '27px',
    textAlign: 'center',
    color: '#FFF',
  },
  stopButton: {
    height: '120px',
    width: '120px',
    backgroundSize: '240px 240px',
    borderRadius: '50%',
    filter: 'drop-shadow(0px 0px 16px rgba(131, 153, 122, 0.3))',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(90deg, '
      + theme.palette.common.yellow + ' 0%, ' + theme.palette.common.yellow + ' 50%, '
      + theme.palette.common.grey2 + ' 50%, ' + theme.palette.common.grey2 + ' 100%)',
    animation: 'stopButtonFade 15s linear infinite',
    backgroundPosition: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '18px',
    letterSpacing: '0.1em',
    lineHeight: '27px',
    textAlign: 'center',
    color: '#FFF',
  },
  "@keyframes stopButtonFade": {
    '0%': {
      backgroundPosition: 'right',
    },
    '50%': {
      backgroundPosition: 'center',
    },
    '100%': {
      backgroundPosition: 'left',
    },
  },
  dialog: {
    width: 'calc(100% -32px)',
    margin: theme.spacing.unit,

  },
  dialogPaper: {
    margin: '16px',
    maxWidth: 'calc(100% -32px)',
  },
  result: {
    width: '100%',
    textAlign: 'center'
  },
  dialogButtonContainer: {
    margin: '16px auto',
    width: 'calc(100% -32px)',
  },
  resultPoint: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  resultDescription: {
    margin: theme.spacing.unit,
    fontSize: '12px',
  },
  pleaseScan: {
    fontWeight: 'bold',
    margin: '6px auto auto',
    fontFamily: theme.typography.Helvetica,
    color: theme.palette.common.darkGrey,
  },
  pleasePoint: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  DialogScanButton: {
    backgroundColor: theme.palette.common.green,
    color: theme.palette.common.white,
    height: '48px',
    borderRadius: '24px',
    width: 'calc(100% - 32px)',
    '& .button': {
      borderRadius: '24px',
      width: 'calc(100% - 32px)',
      backgroundColor: theme.palette.common.green,
    }
  },
  DialogEnqueteButton: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.green,
    height: '48px',
    borderRadius: '24px',
    width: 'calc(100% - 32px)',
    '& .button': {
      borderRadius: '24px',
      width: 'calc(100% - 32px)',
      backgroundColor: theme.palette.common.green,
    },
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    }
  },
  DialogBackButton: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.green,
    height: '48px',
    width: 'calc(100% - 32px)',
  },
  dummy: {
    height: '128px'
  },
  error: {
    color: theme.palette.common.red,
    textAlign: 'center',
    margin: theme.spacing.unit,
    marginTop: '32px',
    height: '16px'
  },
})

class Caecco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
    }
    this.onClickCaeccoButton = this.onClickCaeccoButton.bind(this);
    this.onClickScanHander = this.onClickScanHander.bind(this);
    this.onClickBackHomeHandler = this.onClickBackHomeHandler.bind(this);
    this.onClickReceiptSentBackHandler = this.onClickReceiptSentBackHandler.bind(this);
  }

  componentDidMount() {
    this.props.selectStation();
  }

  onClickCaeccoButton() {
    const { user, startDateTime, selectedStation } = this.props;
    if (this.props.isStart) {
      const postData = {
        userId: user.objectId,
        stationId: selectedStation.objectId,
        startDateTime: startDateTime,
        endDateTime: new Date(),
      }
      this.props.caeccoStop(postData, Math.floor(selectedStation.pointRate * this.props.count / 600));
      this.setState({
        dialogIsOpen: true
      });
    } else {
      if (!selectedStation.objectId) return;
      const audio = new Audio(ButtonSound);
      audio.loop = false;
      this.props.caeccoStart();
      audio.play();
    }
  }

  onClickBackHomeHandler() {
    this.props.reset();
    this.setState({
      dialogIsOpen: false
    });
  }

  onClickReceiptSentBackHandler() {
    this.setState({
      dialogIsOpen: false
    }, this.props.reset());
  }

  onClickScanHander() {
    this.props.scanReceipt();
  }

  render() {
    const { classes, selectedStation, receiptSentDialogIsOpen, error } = this.props;
    const point = Math.floor(selectedStation.pointRate * this.props.count / 600);
    const CaeccoImg =
      <img
        className={classes.caeccoImg}
        src={this.props.isStart ? CaeccoAnimetion : CaeccoWaitImg}
      />;

    const pointContainer = this.props.isStart ?
      <div className={classes.pointContainer}>
        <div className={classes.points}>{point} e-ポイント </div>
        <div className={classes.pointLabel}>経過時間</div>
        <div className={classes.points}>{Math.floor(this.props.count / 60)}分 {Math.floor(this.props.count % 60)} 秒 </div>
      </div> :
      <div className={classes.pointContainer}>
        <div className={classes.pointLabel}>獲得できるポイント</div>
        <div className={classes.points}>{selectedStation.pointRate}e-ポイント / 10分</div>
      </div>;


    const chargingText = this.props.isStart ?
      <React.Fragment>
        <div className={classes.detail}>あと {Math.floor(600 / selectedStation.pointRate) - this.props.count % Math.floor(600 / selectedStation.pointRate)} 秒caeccoすると</div>
        <div className={classes.detail}>さらに1e-ポイント貯まります</div>
      </React.Fragment> :
      <React.Fragment />;

    const caeccoButton = this.props.isStart ?
      <div className={classes.buttonWrapper}>
        <div
          className={classes.stopButton}
        >
          <div><img src={StopButton} onClick={this.onClickCaeccoButton} /></div>
          <div>caecco</div>
        </div>
      </div>
      : <div className={classes.buttonWrapper}>
        <div
          className={classes.button}
        >
          <div><img src={CaeccoButton} onClick={this.onClickCaeccoButton} /></div>
          <div>caecco</div>
        </div>
      </div>;

    const completeDialog = receiptSentDialogIsOpen ?
      <Dialog
        className={classes.dialog}
        open={this.props.receiptSentDialogIsOpen}
        classes={{ paper: classes.dialogPaper }}
      >
        <div className={classes.result}>
          <p><span className={classes.resultPoint}>15</span>ポイントGET!</p>
          <img src={PointGetImg} />
          <div className={classes.resultDescription}>管理者にて確認後、ポイントは付与されます。<br />ホーム/ポイント画面でご確認ください。</div>
          <div className={classes.dialogButtonContainer}>
            <Fab
              className={classes.DialogEnqueteButton}
              variant="extended"
              href="https://ponta.post-survey.com/evpanel201907/"
            >
              アンケートの記入をお願いします
            </Fab>
          </div>
          <div className={classes.dialogButtonContainer}>
            <Button
              className={classes.DialogBackButton}
              onClick={this.onClickReceiptSentBackHandler}
            >
              戻る
            </Button>
          </div>
        </div>
      </Dialog> :
      <Dialog
        className={classes.dialog}
        open={this.state.dialogIsOpen}
        classes={{ paper: classes.dialogPaper }}
      >
        <div className={classes.result}>
          <p><span className={classes.resultPoint}>{point}</span>ポイントGET!</p>
          <img src={PointGetImg} />
          <div className={classes.resultDescription}>管理者にて確認後、ポイントは付与されます。<br />ホーム/ポイント画面でご確認ください。</div>
          <div>さらに</div>
          <p className={classes.pleaseScan}>レシートをスキャンして<br /><span className={classes.pleasePoint}>15</span>ポイントをGET!</p>
          <div className={classes.dialogButtonContainer}>
            <Fab
              className={classes.DialogScanButton}
              variant="extended"
              onClick={this.onClickScanHander}
            >
              レシートをスキャン
            </Fab>
          </div>
          <div className={classes.dialogButtonContainer}>
            <Fab
              className={classes.DialogEnqueteButton}
              variant="extended"
              href="https://ponta.post-survey.com/evpanel201907/"
            >
              アンケートの記入をお願いします
            </Fab>
          </div>
          <div className={classes.dialogButtonContainer}>
            <Button
              className={classes.DialogBackButton}
              onClick={this.onClickBackHomeHandler}
            >
              戻る
            </Button>
          </div>
        </div>
      </Dialog>

    const stationName = (<div className={classes.place}>{selectedStation.name}</div>);
    const errorMsg = (<div className={classes.error}>{error}</div>);
    return (
      <PageLayout title='caecco'>
        <div className={classes.root}>
          {(selectedStation.objectId) ? stationName : errorMsg}
          <div className={classes.progressContainer}>
            {CaeccoImg}
          </div>
          {pointContainer}
          {chargingText}
          {caeccoButton}
          <div className={classes.dummy} />

          {completeDialog}
        </div>
      </PageLayout>
    );
  }
}

Caecco.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  caeccoStart: PropTypes.func.isRequired,
  caeccoStop: PropTypes.func.isRequired,
  isStart: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  user: PropTypes.instanceOf(UserDto).isRequiered,
  startDateTime: PropTypes.instanceOf(Date).isRequired,
  selectedStation: PropTypes.instanceOf(StationData).isRequired,
  scanReceipt: PropTypes.func.isRequired,
  selectStation: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  receiptSentDialogIsOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Caecco);
