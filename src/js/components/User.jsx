import React from 'react';
import PropTypes from 'prop-types';
import "core-js/";
import { withStyles } from '@material-ui/core/styles';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  TextField, Button, Fab, FormControl, FormControlLabel, FormLabel, Dialog,
  RadioGroup, Radio, Select, InputLabel, MenuItem
} from '@material-ui/core';
import CheckedIcon from '../../images/on.svg';
import PageLayout from './Layout';
import { AGE_VALUES, GENDER_VALUES } from 'common/model/User';
import validator from 'validator';
import { VALIDATION_MSG } from '../constants';
import UserDto from '../utility/UserData';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  text: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  gender: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  genderLabel: {
    fontSize: '0.75em'
  },
  genderRadioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  withdrawal: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  changeButton: {
    width: '100%',
    margin: '32px auto 16px auto',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.green
  },
  logoutButton: {
    width: '100%',
    margin: '16px auto 16px auto',
    color: theme.palette.common.green,
    border: 'solid 2px',
    dropShadow: 0,
    borderColor: theme.palette.common.green,
    backgroundColor: theme.palette.common.white
  },
  logoutDialog: {
    width: '100%',
    textAlign: 'center',
    fontFamily: theme.typography.HiraginoSansW3,
  },
  dialogHeader: {
    height: '80px',
    fontSize: "20px",
    lineHeight: '80px'
  },
  dialogBody: {
    textAlign: 'left',
    marginLeft: '16px'
  },
  buttonContainer: {
    width: '100%',
    margin: '64px 0px 16px 0px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly'
  },
  dialogLogoutButton: {
    width: '148px',
    margin: theme.spacing.unit,
    border: 'solid 2px',
    dropShadow: 0,
    borderColor: theme.palette.common.green,
    color: theme.palette.common.green,
    backgroundColor: theme.palette.common.white
  },
  cancelButton: {
    width: '148px',
    margin: theme.spacing.unit,
    color: theme.palette.common.white,
    border: 'solid 2px',
    dropShadow: 0,
    borderColor: theme.palette.common.green,
    backgroundColor: theme.palette.common.green
  },
  changedDialog: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  }
});

class User extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      showPassword: false,
      showLogoutDialog: false,
      showChangedDialog: false,
      userName: user.userName,
      gender: user.gender,
      age: user.age,
      pontaId: user.pontaId,
      otherId: user.otherId,
      isError: {
        userName: false,
        age: false,
        gender: false,
        otherId: false
      },
      isInvalidForm: false
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onClickUpdateUser = this.onClickUpdateUser.bind(this);
    this.updateUserCallback = this.updateUserCallback.bind(this);
    this.onClickWithdrawal = this.onClickWithdrawal.bind(this);
    this.closeDialogs = this.closeDialogs.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  renderTextField(label, name, styleClass, required, error) {
    return (
      <TextField
        className={styleClass}
        name={name}
        label={error ? VALIDATION_MSG[name] : label}
        placeholder={this.state[name]}
        fullWidth
        required={required}
        error={error}
        InputLabelProps={{ shrink: true }}
        onChange={this.onChangeField}
      />
    );
  }

  onClickDialogChange(e) {
    this.setState({
      showLogoutDialog: e
    })
  }

  closeDialogs() {
    this.setState({
      showLogoutDialog: false,
      showChangedDialog: false,
    })
  }

  onChangeField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickUpdateUser() {
    this.validate(this.updateUserCallback);
    this.setState({ showChangedDialog: true });
  }

  updateUserCallback = () => {
    if (this.state.isInvalidForm) return;
    const { userId, objectId } = this.props.user;
    const userData = {
      userName: this.state.userName,
      age: this.state.age,
      gender: this.state.gender,
      vehicleNumber: this.state.vehicleNumber,
      otherId: this.state.otherId
    }
    this.props.updateUser(userId, objectId, userData);
  }

  validate(callback) {
    const {
      userName,
      age,
      gender,
    } = this.state;
    let isError = {
      userName: false,
      age: false,
      gender: false,
      pontaId: false,
      otherId: false
    };

    let isValidationError = false;

    if (validator.isEmpty(userName)) {
      isError.userName = true;
      isValidationError = true;
    }

    if (age === 0) {
      isError.age = true;
      isValidationError = true;
    }

    if (gender === 0) {
      isError.gender = true;
      isValidationError = true;
    }

    this.setState({
      isInvalidForm: isValidationError,
      isError: isError
    }, callback);
  }

  onClickLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  onClickWithdrawal() {
    this.props.history.push('/contact');
  }

  componentDidMount() {
    const userId = JSON.parse(localStorage.getItem('authInfo')).user.userId;
    this.props.fetchUser(userId);
  }

  render() {
    const { classes } = this.props;
    const isError = this.state.isError;

    return (
      <PageLayout title='お客様情報'>
        <div className={classes.root}>
          <form >
            {this.renderTextField('ニックネーム', 'userName', classes.text, true, isError.userName)}
            <FormControl className={classes.gender} fullWidth>
              <FormLabel className={classes.genderLabel} component="legend" required
                error={isError.gender}>
                {isError.gender ? VALIDATION_MSG.gender : '性別'}
              </FormLabel>
              <RadioGroup
                className={classes.genderRadioGroup}
                name="gender"
                value={this.state.gender.toString()}
                onChange={this.onChangeField}
              >
                {GENDER_VALUES.map(v => (
                  <FormControlLabel value={v.value.toString()} key={v.value} control={<Radio checkedIcon={<img src={CheckedIcon} />} />} label={v.label} />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.gender} fullWidth>
              <InputLabel shrink required error={isError.age}>
                {isError.age ? VALIDATION_MSG.age : '年代'}
              </InputLabel>
              <Select
                value={this.state.age}
                onChange={this.handleChange('age')}
                displayEmpty
              >
                <MenuItem value="" disabled>&nbsp;&nbsp;選択してください</MenuItem>
                {AGE_VALUES.map(v => (
                  <MenuItem value={v.value} key={v.value}>{v.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className={classes.text}
              label={'メールアドレス'}
              placeholder={this.props.user.email}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />

            <TextField
              className={classes.text}
              label={'PONTA会員ID'}
              placeholder={'登録済み'}
              fullWidth
              disabled={true}
              InputLabelProps={{ shrink: true }}
            />
            {this.renderTextField('その他の会員ID', 'otherId', classes.text, false, isError.otherId)}
            <Fab
              className={classes.changeButton}
              variant='extended'
              onClick={this.onClickUpdateUser}
            >
              変更
            </Fab>
          </form>
          <Fab
            className={classes.logoutButton}
            variant='extended'
            onClick={() => { this.onClickDialogChange(true) }}
          >
            ログアウト
          </Fab>
          <div>退会について</div>
          <div>現在利用できません。退会についてはお問い合わせページよりお願いいたします。</div>
          <Button
            className={classes.withdrawal}
            fullWidth
            color='secondary'
            onClick={this.onClickWithdrawal}
          >
            退会
          </Button>
          <Dialog
            open={this.state.showChangedDialog}
          >
            <div
              className= {classes.changedDialog}
            >
              お客様情報を変更しました。
            <Fab
                className={classes.changeButton}
                variant='extended'
                onClick={this.closeDialogs}
              >
                閉じる
            </Fab>
            </div>
          </Dialog>
          <Dialog
            open={this.state.showLogoutDialog}
            contentStyle={{ width: 'calc(100% -32px)' }}
            onClick={() => { this.onClickDialogChange(false) }}
          >
            <div className={classes.logoutDialog}>
              <div className={classes.dialogHeader}>ログアウト</div>
              <div className={classes.dialogBody}>ログアウトしてもよろしいですか</div>
              <div className={classes.buttonContainer}>
                <Fab
                  className={classes.dialogLogoutButton}
                  variant='extended'
                  onClick={(e) => { this.onClickLogout(e) }}
                >
                  ログアウト
                </Fab>
                <Fab
                  className={classes.cancelButton}
                  variant='extended'
                  onClick={this.closeDialogs}
                >
                  キャンセル
                </Fab>
              </div>
            </div>
          </Dialog>
        </div>
      </PageLayout>
    );
  }
}

User.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  logout: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserDto).isRequiered,
  updateUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default withStyles(styles)(User);
