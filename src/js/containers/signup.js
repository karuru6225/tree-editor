import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { actions } from '../modules/signup/action';

function mapStateToProps(state) {
  const {
    showRegisteredDialog,
    showErrorDialog,
    errorDialogMessage
  } = state.signup;
  return {
    showRegisteredDialog,
    showErrorDialog,
    errorDialogMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (requestData) => {
      dispatch(actions.signup(requestData));
    },
    closeDialog: () => {
      dispatch(actions.closeDialog());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
