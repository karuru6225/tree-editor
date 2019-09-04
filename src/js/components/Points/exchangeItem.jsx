import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Dialog } from '@material-ui/core';
import { EXCHANGE_NAME_PONTA } from 'common/model/PointExchangeItem';
import ExchangeItemDto from 'common/dto/ExchangeItem';
import UserDto from '../../utility/UserData';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  pontaButton: {
    backgroundColor: theme.palette.common.pontaOrange,
    color: theme.palette.common.white,
    margin: '16px',
    width: 'calc(100% - 32px)'
  },
  button: {
    backgroundColor: theme.palette.common.conviniBlue,
    color: theme.palette.common.white,
    margin: '16px',
    width: 'calc(100% - 32px)'
  },
  cancelButton: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.green,
    margin: '16px',
    width: 'calc(100% - 32px)'
  },
  source: {
    fontFamily: theme.typography.Helvetica,
    color: '#4d4d4d',
    fontSize: '16px',
    letterSpacing: 0,
    lineHeight: '16px',
    fontColor: '#4D4D4D'
  },
  target: {
    fontFamily: theme.typography.Helvetica,
    color: theme.palette.common.pontaOrange,
    fontSize: '16px',
    letterSpacing: 0,
    lineHeight: '16px',
  },
  dialog: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  },
});

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmDialog: false
    }
  }

  onClickExchange(user, item) {
    const postData = {
      userId: user.objectId,
      usePoint: item.exchangePoint,
      pointExchangeItemId: item.objectId
    }
    const updateData = { currentPoint: (Number(user.currentPoint) - Number(item.exchangePoint)) };
    this.props.exchange(postData);
    this.props.updateUser(user.userId, user.objectId, updateData);
    this.setState({ showConfirmDialog: false })
  }

  onClickCancel() {
    this.setState({ showConfirmDialog: false })
  }

  render() {
    const { classes, user, item } = this.props;
    const isPonta = (item.name === EXCHANGE_NAME_PONTA.name);
    return (
      <React.Fragment >
        <div className={classes.source}>{item.exchangePoint}e-ポイント → <span className={classes.target}>{item.description}</span></div>
        <Fab
          className={isPonta ? classes.pontaButton : classes.button}
          variant="extended"
          disabled={item.exchangePoint > user.currentPoint}
          onClick={() => { this.setState({ showConfirmDialog: true }) }}
        >{item.buttonLabel}</Fab>
        <Dialog
          open={this.state.showConfirmDialog}
        >
          <div className={classes.dialog}>
            交換してよろしいですか？
              <Fab
              className={classes.button}
              variant="extended"
              onClick={() => { this.onClickExchange(user, item) }}
            >
              交換する
              </Fab>
              <Fab
              className={classes.cancelButton}
              color='secodary'
              variant="extended"
              onClick={() => { this.onClickCancel() }}
            >
              キャンセル
              </Fab>
          </div>
        </Dialog>
      </React.Fragment >
    );
  }
}

Exchange.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  user: PropTypes.instanceOf(UserDto).isRequired,
  exchange: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  item: PropTypes.arrayOf(PropTypes.instanceOf(ExchangeItemDto)).isRequired,
};

export default withStyles(styles)(Exchange);
