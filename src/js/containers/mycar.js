import { connect } from 'react-redux';
import MyCar from '../components/MyCar';
import { actions } from '../modules/mycar/action';
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
    makers: state.mycar.makers,
    vehicleModels: state.mycar.vehicleModels,
    user: userData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => {
      dispatch(actions.fetch());
    },
    change: (vehicleModel, vehicleNumber) => {
      dispatch(actions.send(vehicleModel, vehicleNumber));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCar);