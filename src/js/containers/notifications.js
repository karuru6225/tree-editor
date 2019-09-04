import { connect } from 'react-redux';
import Notifications from '../components/Notifications';
import { actions } from '../modules/notification/action';

function mapStateToProps(state) {
  return {
    notifications: state.notification.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    read: () => {
      dispatch(actions.fetch());
    },
    checkRead: (objectId) => {
      dispatch(actions.checkRead(objectId));
  }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);