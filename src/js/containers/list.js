import { connect } from 'react-redux';
import List from '../components/ListView';
import { actions as stationActions } from '../modules/map/action';

function mapStateToProps(state) {
    return {
      stations: state.map.stations,
      error: state.map.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch: () => {
            dispatch(stationActions.fetch());
        },
        onClickStation: (station) => {
            dispatch(stationActions.selectSuccess(station));
          }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
