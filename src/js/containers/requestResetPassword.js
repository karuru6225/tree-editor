import { connect } from 'react-redux';
import RequestResetPassword from '../components/RequestResetPassword';
import { actions } from '../modules/requestResetPassword/action';

function mapStateToProps(state) {
  return {
    isProcessing: state.requestResetPassword.isProcessing,
    isComplete: state.requestResetPassword.isComplete,
    statusCode: state.requestResetPassword.statusCode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestReset: (email) => {
      dispatch(actions.requestReset(email));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestResetPassword);
