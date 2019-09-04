import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Badge, Button, Toolbar, MenuList, MenuItem, Drawer, Divider, Typography } from '@material-ui/core';
import NotifiCationsIcon from '@material-ui/icons/NotificationsNone';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CarIcon from '../../images/side/car.svg';
import UserIcon from '../../images/side/user.svg';
import KiyakuIcon from '../../images//kiyaku.svg';
import ContactIcon from '../../images/info.svg';
import Logo from '../../images/logo.svg';
import BackIcon from '@material-ui/icons/chevronLeft';
import NotificationData from 'common/dto/notification';
import Config from 'common/config/develop';
import UserDto from '../utility/UserData';

const styles = (theme) => ({
  wrapper: {
    //margin: theme.spacing.unit,
    width: '100%',
    position: 'fixed',
    top: 0,
    display: 'block',
    zIndex: 10
  },
  appBar: {
    flexGrow: 1,
    backgroundColor: '#FFF'
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuIcon: {
    margin: '8px 8px 8px 0px',
    width: '28px',
    height: '28px',
    background: 'transparent',
  },
  menuItem: {
    height: '64px'
  },
  itemLabelContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemSecond: {
    color: theme.palette.common.red,
    fontFamily: theme.typography.HiraginoSans,
    fontSize: "12px",
    letterSpacing: 0,
  },
  dummy: {
    width: '48px'
  },
  rightButton: {
    color: theme.palette.common.green,
    fontSize: '16px',
  },
  badge: {
    '&& span': {
      background: theme.palette.common.red,
      color: theme.palette.common.white
    }
  },
  drawer: {
    width: '281px',
  },
  userName: {
    backgroundColor: theme.palette.common.green2,
    color: theme.palette.common.white,
    height: '88px',
    fontSize: '17px',
    paddingTop: '55px',
    paddingLeft: '16px',
  },
  logo: {
    position: 'absolute',
    left: '16px',
    bottom: '53px',
  },
  version: {
    position: 'absolute',
    left: '16px',
    bottom: '24px',
    fontFamily: theme.typography.Helvetica,
    fontSize: '12px',
    color: theme.palette.common.grey3,
    letterSpacing: 0,
    textAlign: 'center',
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleToggleDrawer() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  renderRightButton() {
    const { classes } = this.props;
    const path = this.props.location.pathname;
    if (path === '/list') {
      return <Button className={classes.rightButton} component={Link} to='/map'>マップ</Button>;
    } else if (path === '/map') {
      return <Button className={classes.rightButton} component={Link} to='/list'>リスト</Button>;
    } else {
      return <div className={classes.dummy} />;
    }
  }

  render() {
    const { classes, notifications, user } = this.props;
    const menuItemList = [
      { label: 'マイカー', to: '/mycar', icon: CarIcon, showSecond: true },
      { label: 'お客様情報', to: '/user', icon: UserIcon },
      { label: 'お問合せ', to: '/contact', icon: ContactIcon },
      { label: '利用規約', to: '/terms', icon: KiyakuIcon },
    ];

    const MenuItems = menuItemList.map((item, index) => {
      return (
        <div key={'item' + index} >
          <MenuItem className={classes.menuItem} button component={Link} to={item.to} >
            <img className={classes.menuIcon} src={item.icon} />
            <div className={classes.itemLabelContainer}>
              <div>{item.label}</div>
              <div className={classes.itemSecond}>{(item.showSecond && !user.vehicleModelId) ? "未記入項目があります" : null}</div>
            </div>
          </MenuItem>
        </div>
      );
    });
    // const unread = 
    const unreadCount = notifications.filter(i => i.isRead === false).length;
    // ホーム画面のみ通知アイコンとサイドメニューを表示する。
    const MenuBarHome =
      (
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => { this.handleToggleDrawer() }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color='inherit' variant="h6" className={classes.grow}>
            {this.props.title}
          </Typography>
          <IconButton
            color="inherit"
            component={Link}
            to="/notifications"
          >
            <Badge color="secondary" badgeContent={unreadCount}>
              <NotifiCationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      );
    const MenuBarOther =
      (
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => { this.props.history.goBack() }}
          >
            <BackIcon />
          </IconButton>
          <Typography color='inherit' variant="h6" className={classes.grow}>
            {this.props.title}
          </Typography>
          {this.renderRightButton()}
        </Toolbar>
      );
    const MenuBar = (this.props.location.pathname === '/home') ?
      MenuBarHome : MenuBarOther;

    return (
      <div className={classes.wrapper}>
        <Drawer
          open={this.state.isOpen}
          onClick={() => {
            console.log('onclick');
            this.setState({ isOpen: false });
          }}
          onClose={() => {
            console.log('onclose');
            this.setState({ isOpen: false });
          }}
        >
          <div className={classes.drawer}>
            <div className={classes.userName}>{user.userName}</div>
            <Divider />
            <MenuList>
              {MenuItems}
            </MenuList>
            <div className={classes.logo}><img src={Logo} /></div>
            <div className={classes.version}>VERSION{Config.appVersion}</div>
          </div>
        </Drawer>

        <div className={classes.root}>
          <AppBar
            className={classes.appBar}
            title="List"
            position='sticky'
          >
            {MenuBar}
          </AppBar>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  title: PropTypes.string.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  user: PropTypes.instanceOf(UserDto).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.instanceOf(NotificationData)).isRequired,
};

export default withRouter(withStyles(styles)(Header));
