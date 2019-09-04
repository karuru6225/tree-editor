import { connect } from 'react-redux';
import MapView from '../components/MapView';
import { actions } from '../modules/map/action';

function mapStateToProps(state) {
  return {
    stations: state.map.stations,
    chargers: state.chargers.chargers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => {
      dispatch(actions.fetch());
  },
    geocode: (stations) => {
      dispatch(actions.geocode(stations));
    },
    onClickStation: (station) => {
      dispatch(actions.selectSuccess(station));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView);