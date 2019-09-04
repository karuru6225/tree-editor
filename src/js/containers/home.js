import { connect } from 'react-redux';
import Home from '../components/Home';
import { actions } from '../modules/user/action';
import { actions as notificationActions } from '../modules/notification/action';
import { actions as mycarActions } from '../modules/mycar/action';
import UserDto from '../utility/UserData';

function mapStateToProps(state) {
    const { user } = state.user;
    const userDto = new UserDto(
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
        user: userDto,
        notifications: state.notification.notifications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: (objectId) => {
            dispatch(actions.fetchUser(objectId));
        },
        fetchNotification: () => {
            dispatch(notificationActions.fetch());
        },
        fetchVehicle: () => {
            dispatch(mycarActions.fetch());
        },
        checkRead: (objectId) => {
            dispatch(notificationActions.checkRead(objectId));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
