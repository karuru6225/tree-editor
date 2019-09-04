import React from 'react';
import { Link } from 'react-router-dom';
import { compose, withProps, withState, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
//import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import conviniIcon from "../../../images/convinienceStore.svg";
import superIcon from "../../../images/superMarket.svg";
import NormalChargerIcon from "../../../images/normalCharger.svg";
import QuikChargerIcon from "../../../images/quickCharger.svg";
import PotisionIcon from "../../../images/position.svg";
import CustomMapControl from "./locationButton";
import PageLayout from '../Layout';
import { getParents } from '../../utility/jquery.js';

const styles = theme => ({
  root: {
    height: '100%'
  },
  convinience: {
    backgroundColor: "#579FD9",
  },
  stationMarker: {
    backgroundColor: "#FFF",
  },
  second: {

  },
  positionButton: {
    backgroundColor: "#FFF",
    display: 'flex',
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    zIndex: '3'
  },
  points: {
    marginLeft: '16px'
  },
  unit: {
    fontFamily: theme.typography.Helvetica,
    fontSize: '16px',
    letterSpacing: '0',
    lineHeight: '16px'
  }
});

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(
    pos => console.log(pos),
    err => console.log(err)
  );
}

class Chargers extends React.Component {
  renderMarkers() {
    return this.props.chargers.map((item, index) => {
      const iconUrl = (item.type === "quick") ? QuikChargerIcon : NormalChargerIcon;

      return (
        item.position ?
          (
            <Marker
              position={item.position}
              key={index}
              icon={{ url: iconUrl }}
            />
          ) : <React.Fragment key={index} />
      )
    });
  }
  render() {
    console.log(this.props);
    return (
      <React.Fragment >
        {this.renderMarkers()}
      </React.Fragment>
    );
  }
}


class StationMakers extends React.Component {
  constructor(props) {
    super(props);
    this.onClickMarker = this.onClickMarker.bind(this);
  }

  onClickMarker(station) {
    this.props.onClickStation(station);
  }

  renderMarkers() {
    // const { classes } = this.props;
    console.log(this.props);
    return this.props.stations.map((item, index) => {
      const stationIcon = (item.getTypeName() === 'convinience') ? conviniIcon : superIcon;
      return (
        ('position' in item) ?
          <InfoWindow
            key={index}
            position={item.position}
            onDomReady={() => {
              // Domの親要素を探し出し、classを付加
              const elem = document.getElementById(item.objectId);
              const parentIW = getParents(elem, '.gm-style-iw');
              if (parentIW) parentIW[0].classList.add(item.getTypeName());
              const parentIWT = getParents(elem, '.gm-style-iw-t');
              if (parentIWT) parentIWT[0].classList.add(item.getTypeName());
            }}
          >
            <Link id={item.objectId} to='/station' onClick={() => { this.onClickMarker(item) }}>
              <div>{item.name}</div>
              <div className="second">
                <img src={stationIcon} />
                <span className={"points"}>{item.pointRate}</span><span className={"unit"}>P/10分</span>
              </div>
            </Link>
          </InfoWindow >
          : <React.Fragment key={index} />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.renderMarkers()}
      </React.Fragment>
    );
  }
}

const MapView = compose(
  withState('currentPosition', 'setCurrentPosition', { lat: 35.697, lng: 139.744 }),
  withHandlers({
    // onMapMounted: ref => {
    //   console.log(ref.getBounds);
    //   refs.map = ref;
    // },
    onClick: props => e => {
      console.log(props.currentPosition);
      navigator.geolocation.getCurrentPosition(
        pos => props.setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        ,
        err => console.log(err)
      );
      //props.setCurrentPosition({ lat: 35, lng: 139})
    },
    // onCenterChanged: props => e => {
    //   console.log(refs);
    //   props.setCurrentPosition(getCenter(e))
    // }
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + window.CaeccoConstants.googleMapsApiKey + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='cE' style={{
      left: '0',
      rignt: '0',
      width: '100%',
      height: 'calc(100vh - 56px - 56px)',
      position: 'fixed',
      top: '56px'
    }} />,
    mapElement: <div style={{ height: `100%` }} />,
    refs: React.createRef
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    //ref={props.onMapMounted}
    containerElement={props.refs}
    defaultZoom={15}
    center={new google.maps.LatLng(props.currentPosition.lat, props.currentPosition.lng)}
    // onCenterChanged={() => { props.onCenterChanged() }}
    // onBoundsChanged={()=>{console.log(refs)}}
    options={{
      streetViewControl: false,
      mapTypeControl: false,
      panControl: true,
      fullscreenControl: false,
      zoomControl: false
    }}
  >
    <Marker position={props.currentPosition} />{/*現在値*/}
    <StationMakers {...props} />
    {/* <Chargers chargers={props.chargers} /> */}

    <CustomMapControl position={google.maps.ControlPosition.RIGHT_BOTTOM}>
      <Fab
        onClick={props.onClick}
        className={props.classes.positionButton}
      ><img src={PotisionIcon} /></Fab>
    </CustomMapControl>
  </GoogleMap>
);

class MapPage extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    return (
      <PageLayout title='マップ'>
        <div>
          {withProps(this.props)(MapView)()}
        </div>
      </PageLayout>
    )
  }
}

export default withStyles(styles)(MapPage);
