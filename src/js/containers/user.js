import { connect } from 'react-redux';
import User from '../components/User';
import { actions as authActions } from '../modules/auth/action';
import { actions as userActions } from '../modules/user/action';
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
        isAuth: state.auth.isAuth,
        user: userData,
        sending: state.common.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(authActions.logout());
        },
        fetchUser: (objectId) => {
            dispatch(userActions.fetchUser(objectId));
        },
        updateUser: (userId, objectId, userData) => {
            dispatch(userActions.updateUser(userId, objectId, userData));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
