import { connect } from 'react-redux';
import Points from '../components/Points';
import { actions as pointActions } from '../modules/point/action';
import { actions as userActions } from '../modules/user/action';
import ExchangeItemDto from 'common/dto/ExchangeItem';
import UserData from '../utility/UserData';

function mapStateToProps(state) {
  let { exchangeItems } = state.point;
  exchangeItems = exchangeItems.map((item) => {
    return new ExchangeItemDto(
      item.objectId,
      item.name,
      item.exchangePoint,
      item.description,
      item.buttonLabel
    );
  });
  
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
    exchangeItems: exchangeItems,
    user: userData,
    isPointDialogOpen: state.point.isPointDialogOpen,
    exchangedObjectId: state.point.exchangedObjectId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchExchange: () => {
      dispatch(pointActions.fetchExchange());
    },
    exchange: (userId, objectId, exchangePoint) => {
      dispatch(pointActions.exchange(userId, objectId, exchangePoint));
    },
    updateUser: (userId, objectId, userData) => {
      dispatch(userActions.updateUser(userId, objectId, userData));
    },
    closeDialog: () => {
      dispatch(pointActions.closeDialog());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Points);