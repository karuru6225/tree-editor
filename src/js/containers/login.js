import { connect } from 'react-redux';
import Login from '../components/Login';
import { actions as authActions } from '../modules/auth/action';
//import { actions as stationActions } from '../modules/station/action';

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth,
        sending: state.common.loading,
        errorMsg: state.auth.errorMsg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => {
            dispatch(authActions.login(username, password));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
