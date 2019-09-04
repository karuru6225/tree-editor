import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeActive from '../../images/footer/Active/home.svg';
import PointActive from '../../images/footer/Active/point.svg';
import MapActive from '../../images/footer/Active/map.svg';
import CaeccoActive from '../../images/footer/Active/baiden.svg';
import ListActive from '../../images/footer/Active/list.svg';

import HomeIcon from '../../images/footer/Disabled/home.svg';
import PointIcon from '../../images/footer/Disabled/point.svg';
import MapIcon from '../../images/footer/Disabled/map.svg';
import CaeccoIcon from '../../images/footer/Disabled/baiden.svg';
import ListIcon from '../../images/footer/Disabled/list.svg';

const styles = () => ({
  wrapper: {
    //margin: theme.spacing.unit,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    display: 'block'
  },
  root: {
    color: '#b2b2b2',
    "&$selected": {
      color: '#83997a',
    }
  },
  selected: {}
});


class BottomMenu extends Component {
  render() {
    const { pathname } = this.props.location;

    const buttonList = [
      { label: 'ホーム', link: '/home', icon: <img src={(pathname == '/home') ? HomeActive : HomeIcon} /> },
      { label: 'ポイント', link: '/points', icon: <img src={(pathname == '/points') ? PointActive : PointIcon} /> },
      { label: 'caecco', link: '/caecco', icon: <img src={(pathname == '/caecco') ? CaeccoActive : CaeccoIcon} /> },
      { label: 'リスト', link: '/list', icon: <img src={((pathname == '/list') || (pathname == '/station')) ? ListActive : ListIcon} /> },
      { label: '地図', link: '/map', icon: <img src={(pathname == '/map') ? MapActive : MapIcon} /> },
    ];

    const buttons = buttonList.map((button, index) => {
      return (
        <BottomNavigationAction
          // 店舗詳細画面はリストアイコンをアクティブにする。
          value={(pathname === '/station') ? '/station' : button.link}
          label={button.label}
          icon={button.icon}
          component={Link}
          to={button.link}
          key={index}
        />
      );
    });

    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <BottomNavigation
          value={this.props.location.pathname}
          showLabels
          children={buttons}
        />
      </div>
    )
  }
}

BottomMenu.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
};
export default withRouter(withStyles(styles)(BottomMenu));