import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { EXCHANGE_NAME_PONTA } from 'common/model/PointExchangeItem';
import ExchangeItemDto from 'common/dto/ExchangeItem';
import UserDto from '../../utility/UserData';
import ExcangeItem from './exchangeItem';

const styles = theme => ({
  // root: {
  //   margin: theme.spacing.unit,
  // },
  // pontaButton: {
  //   backgroundColor: theme.palette.common.pontaOrange,
  //   color: theme.palette.common.white,
  //   margin: '16px',
  //   width: 'calc(100% - 32px)'
  // },
  // button: {
  //   backgroundColor: theme.palette.common.conviniBlue,
  //   color: theme.palette.common.white,
  //   margin: '16px',
  //   width: 'calc(100% - 32px)'
  // },
  // source: {
  //   fontFamily: theme.typography.Helvetica,
  //   color: '#4d4d4d',
  //   fontSize: '16px',
  //   letterSpacing: 0,
  //   lineHeight: '16px',
  //   fontColor: '#4D4D4D'
  // },
  // target: {
  //   fontFamily: theme.typography.Helvetica,
  //   color: theme.palette.common.pontaOrange,
  //   fontSize: '16px',
  //   letterSpacing: 0,
  //   lineHeight: '16px',
  // },
  // dialog: {
  //   margin: theme.spacing.unit,
  //   textAlign: 'center',
  // },
});

class Exchange extends React.Component {
  render() {
    const { exchangeItems} = this.props;
    const Items = exchangeItems.map((item) => {
      return <ExcangeItem
        item={item} 
        key={item.objectId}
        {...this.props}
        />;
    });
    
    return (
      <div>
        {Items}
      </div>);
  }
}

Exchange.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  user: PropTypes.instanceOf(UserDto).isRequired,
  exchange: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  exchangeItems: PropTypes.arrayOf(PropTypes.instanceOf(ExchangeItemDto)).isRequired,
};

export default withStyles(styles)(Exchange);