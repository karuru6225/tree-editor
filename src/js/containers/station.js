import { connect } from 'react-redux';
import Station from '../components/Station';

function mapStateToProps(state) {
    return {
      stations: state.map.stations,
      selectedStation:state.map.selectedStation
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Station);
