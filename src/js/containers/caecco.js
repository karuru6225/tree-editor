import { connect } from 'react-redux';
import Caecco from '../components/Caecco';
import { actions as caeccoActions } from '../modules/caecco/action';
import { actions as stationActions } from '../modules/map/action';
import UserData from '../utility/UserData';

function mapStateToProps(state) {
  const user = state.user.user;
  const userData = new UserData(
    user.userId,
    user.objectId,
    user.userName,
    user.email,
    user.age,
    user.gender,
    user.pontaId,
    user.otherId,
    user.currentPoint,
    user.totalPoint,
    user.rankType,
    user.vehicleModelId,
    user.vehicleNumber,
    user.emailVerified,
    user.ranking,
    user.points,
    user.pointExchangeHistories
  );

  return {
    isStart: state.caecco.isStart,
    count: state.caecco.count,
    user: userData,
    startDateTime: new Date(state.caecco.startDateTime),
    selectedStation: state.map.selectedStation,
    isReceiptSent: state.caecco.isReceiptSent,
    receiptSentDialogIsOpen: state.caecco.receiptSentDialogIsOpen,
    error: state.map.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    caeccoStart: () => {
      dispatch(caeccoActions.caeccoStart());
    },
    caeccoStop: (postData, point) => {
      dispatch(caeccoActions.caeccoStop(postData, point));
    },
    scanReceipt: () => {
      dispatch(caeccoActions.scanReceipt())
    },
    selectStation: () => {
      dispatch(stationActions.selectStation());
    },
    reset: () => {
      dispatch(caeccoActions.reset());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caecco);
