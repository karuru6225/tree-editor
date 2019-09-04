import { connect } from 'react-redux';
import Header from '../components/Header';
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
        notifications: state.notification.notifications,
        user: userData,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
