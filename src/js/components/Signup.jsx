import React from 'react';
import PropTypes from 'prop-types';
import "core-js/"
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField, Button, Fab, FormControl, FormControlLabel, FormLabel,
  RadioGroup, Radio, Select, Input, InputLabel, MenuItem,
  IconButton, InputAdornment, FormHelperText, Dialog
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CheckedIcon from '../../images/on.svg';
import { AGE_VALUES, GENDER_VALUES, validatePassword } from 'common/model/User';
import validator from 'validator';
import { VALIDATION_MSG } from '../constants';
import PageLayout from './Layout';

const packageJson = require('./../../../package.json');

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  text: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  precautionary: {
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
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '100%',
    color: theme.palette.common.white,
  },
  about: {
    marginTop: '24px',
    textAlign: 'center',
    widh: '100%',
  },
  aboutButton: {
    color: theme.palette.common.green
  },
  dialog: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit
  },
  dialogHeader: {
    height: '80px',
    margin: 'auto',
    fontSize: '20px',
    lineHeight: '80px',
  },
  dialogText: {
    margin: theme.spacing.unit
  },
  fieldDescription: {
    fontSize: '0.75em',
    color: theme.palette.common.grey1,
    marginBottom: theme.spacing.unit * 2,
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      userName: '',
      age: 0,
      gender: 0,
      email: '',
      pontaId: '',
      otherId: '',
      password: '',
      vehicleNumber: '',
      isError: {
        userName: false,
        age: false,
        gender: false,
        email: false,
        pontaId: false,
        otherId: false,
        password: false,
      },
      errors: {
        vehicleNumber: []
      },
      isInvalidForm: false
    };
    console.log('called constructor');
    this.onChangeField = this.onChangeField.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
    this.signupCallback = this.signupCallback.bind(this);
    this.appVersion = packageJson.version;
    this.props.closeDialog();
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  onChangeField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValidPontaId(id) {
    if (id.length != 15) {
      return false;
    }
    return (Number(id.slice(0, -1)) % 7) === Number(id.slice(14));
  }

  onClickSignup() {
    this.validate(this.signupCallback);
  }

  signupCallback() {
    if (this.state.isInvalidForm) return;
    const data = {
      userName: this.state.userName,
      age: this.state.age,
      gender: this.state.gender,
      email: this.state.email,
      pontaId: this.state.pontaId,
      otherId: this.state.otherId,
      password: this.state.password,
      vehicleNumber: this.state.vehicleNumber,
      appVersion: this.appVersion,
    };
    this.props.signup(data);
  }

  validate(callback) {
    const {
      userName,
      age,
      gender,
      email,
      pontaId,
      password,
      vehicleNumber
    } = this.state;
    let isError = {
      userName: false,
      age: false,
      gender: false,
      email: false,
      pontaId: false,
      otherId: false,
      password: false,
    };

    const errors = {
      vehicleNumber: []
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

    if (!validator.isEmail(email)) {
      isError.email = true;
      isValidationError = true;
    }

    if (!this.isValidPontaId(pontaId)) {
      isError.pontaId = true;
      isValidationError = true;
    }

    if (!validatePassword(password)) {
      isError.password = true;
      isValidationError = true;
    }

    if (validator.isEmpty(vehicleNumber)) {
      errors.vehicleNumber.push(VALIDATION_MSG.vehicleNumber.require);
    }

    if (!validator.isEmpty(vehicleNumber) &&
      (!validator.isNumeric(vehicleNumber, { no_symbols: true })
        || vehicleNumber.length !== 4)) {
      errors.vehicleNumber.push(VALIDATION_MSG.vehicleNumber.numeric);
    }

    this.setState({
      isInvalidForm: isValidationError,
      isError: isError,
      errors,
    }, callback);
  }

  renderTextField(style, label, name, required, error) {
    return (
      <TextField
        className={style}
        label={error ? VALIDATION_MSG[name] : label}
        placeholder='&nbsp;&nbsp;入力してください'
        fullWidth
        name={name}
        required={required}
        error={error}
        InputLabelProps={{ shrink: true }}
        onChange={this.onChangeField}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { errors, isError } = this.state;

    return (
      <PageLayout title='新規登録' visibleBottom={false}>
        <form className={classes.root}>
          {this.renderTextField(classes.text, 'ニックネーム', 'userName', true, isError.userName)}
          {this.renderTextField(classes.text, 'メールアドレス', 'email', true, isError.email)}
          <div className={classes.precautionary}>support@caecco.comからのメールを受信できるようにしておいてください。迷惑メールとして振り分けられる可能性がございます。</div>
          <FormControl className={classes.gender} fullWidth>
            <FormLabel className={classes.genderLabel} component="legend" required
              error={isError.gender}>
              {isError.gender ? VALIDATION_MSG.gender : '性別'}
            </FormLabel>
            <RadioGroup
              className={classes.genderRadioGroup}
              name="gender"
              onChange={this.handleChange('gender')}
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
          <FormControl className={classes.gender} fullWidth>
            <InputLabel shrink required>パスワード</InputLabel>
            <Input
              type={this.state.showPassword ? 'text' : 'password'}
              placeholder='  入力してください'
              error={isError.password}
              onChange={this.onChangeField}
              name='password'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClickShowPassword}>
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={isError.password}>
              {isError.password ? VALIDATION_MSG.password : '  英数字を含む8文字以上'}
            </FormHelperText>
          </FormControl>
          <TextField
            className={classes.text}
            label={errors.vehicleNumber.length ? errors.vehicleNumber[0] : 'ナンバープレート(4ケタ)'}
            placeholder='&nbsp;&nbsp;入力してください'
            fullWidth
            required={true}
            name='vehicleNumber'
            error={errors.vehicleNumber.length}
            InputLabelProps={{ shrink: true }}
            onChange={this.onChangeField}
            inputProps={{
              maxLength: 4,
            }}
          />
          <div className={classes.fieldDescription}>
            ナンバープレートの・・は0に置き換えてください<br/>
            (例)・・34 → 0034
          </div>
          <TextField
            className={classes.text}
            label={isError.pontaId ? VALIDATION_MSG.pontaId : 'PONTA会員ID'}
            placeholder='&nbsp;&nbsp;入力してください'
            fullWidth
            required={true}
            name='pontaId'
            error={isError.pontaId}
            InputLabelProps={{ shrink: true }}
            onChange={this.onChangeField}
          />
          {this.renderTextField(classes.text, 'その他の会員ID', 'otherId', false, isError.otherId)}
          <Fab
            className={classes.button}
            variant='extended'
            color='secondary'
            onClick={this.onClickSignup}
          >
            登録
          </Fab>
          <div className={classes.about}>
            <Button
              className={classes.aboutButton}
              component={Link}
              to='./public_contact'
            >
              このアプリに関するお問い合わせ
            </Button>
          </div>
        </form>
        <Dialog
          classes={{ paper: classes.dialog }}
          open={this.props.showErrorDialog}
        >
          <div className={classes.dialogHeader}>登録できませんでした。</div>
          <div className={classes.dialogText}>
            {this.props.errorDialogMessage}
          </div>
          <Fab
            color='secondary'
            variant='extended'
            className={classes.button}
            component={Link}
            onClick={() => this.props.closeDialog()}
          >
            閉じる
          </Fab>
        </Dialog>
        <Dialog
          classes={{ paper: classes.dialog }}
          open={this.props.showRegisteredDialog}
        >
          <div className={classes.dialogHeader}>ご登録ありがとうございます</div>
          <div className={classes.dialogText}>
            認証メールを送信しました。<br />
            メールの内容を確認し、登録を完了させてください。<br />
            認証メールが届かない場合、問い合わせ窓口にご連絡ください
          </div>
          <Fab
            color='secondary'
            variant='extended'
            className={classes.button}
            component={Link}
            to='./login'
          >
            閉じる
          </Fab>
        </Dialog>
      </PageLayout>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  signup: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  showRegisteredDialog: PropTypes.bool.isRequested,
  showErrorDialog: PropTypes.bool.isRequested,
  errorDialogMessage: PropTypes.string.isRequested,
};

export default withStyles(styles)(Signup);
