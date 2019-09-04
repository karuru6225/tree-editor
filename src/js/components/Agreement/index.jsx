import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Text from './text';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    textAlign: 'center',
    fontFamily: theme.typography.Helvetica,
    letterSpacing: 0,
    marginTop: '56px',
  },
  header: {
    backgroundColor: '#FFF',
    textAlign: 'center',
    height: '56px',
    lineHeight: '56px'
  },
  textContainer: {
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 56px - 176px)'
  },
  buttons: {
    position: 'absolute',
    height: '176px',
    width: 'calc(100% - 16px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    bottom: 0,
  },
  yesButton: {
    width: '100%',
    margin: '32px auto 16px auto',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.green
  },
  noButton: {
    width: '100%',
    margin: '16px auto 16px auto',
    color: theme.palette.common.green,
    border: 'solid 2px',
    dropShadow: 0,
    borderColor: theme.palette.common.green,
    backgroundColor: theme.palette.common.white
  }
});

class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
    const agree = localStorage.getItem('agreement');
    if (agree) {
      this.props.history.replace('/login');
    }
  }

  agreeHandler() {
    localStorage.setItem('agreement', true);
    this.props.history.replace('/login');
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar
          className={classes.header}
        >
          利用許諾
        </AppBar>
        <div className={classes.root}>
          <div className={classes.textContainer}>
            <Text page='agreement'/>
          </div>
          {/* <div>
              <Button>プライバシーポリシーはこちら</Button>
          </div> */}
          <div className={classes.buttons}>
            <div>
              <Fab
                className={classes.yesButton}
                variant='extended'
                onClick={() => this.agreeHandler()}
              >
                同意
              </Fab>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Agreement.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default withStyles(styles)(Agreement);
