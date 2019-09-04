import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  TextField, Button, Fab, FormControl, Input, InputLabel,
  IconButton, InputAdornment, FormHelperText
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Logo from '../../images/logo.svg';
import { withStyles } from '@material-ui/core/styles';
const packageJson = require('./../../../package.json');

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    textAlign: 'center',
    fontFamily: theme.typography.Helvetica,
    letterSpacing: 0,
  },
  logoContainer: {
    margin: "48px auto 48px auto"
  },
  logo: {
    height: '40px',
    width: '209px'
  },
  mail: {
    margin: '24px auto'
  },
  password: {
    margin: '24px auto'
  },
  button: {
    width: '100%',
    margin: '32px auto 16px auto',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.green
  },
  signup: {
    width: '100%',
    margin: '16px auto 16px auto',
    color: theme.palette.common.green,
    border: 'solid 2px',
    dropShadow: 0,
    borderColor: theme.palette.common.green,
    backgroundColor: theme.palette.common.white
  },
  forget: {
    marginBottom: '32px'
  },
  version: {
    marginTop: theme.spacing.unit * 2,
    bottom: '41px',
    color: '#CCCCCC',
    fontSize: '12px'
  },
  errorMsg: {
    color: theme.palette.common.red,
    whiteSpace: 'pre',
    fontFamily: theme.typography.HiraginoKakuGo,
    fontSize: '13px',
    letterSpacing: '0.6px',
    textAlign: 'center',
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      username: '',
      password: '',
    }
    this.onChangeField = this.onChangeField.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.appVersion = `${packageJson.version}-${window.gitHash}`;
  }

  onChangeField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickLogin(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  render() {
    const { classes, errorMsg } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.logoContainer}>
          <img src={Logo} className={classes.logo} />
        </div>
        <form>
          <TextField
            className={classes.mail}
            label="メールアドレス"
            placeholder='&nbsp;&nbsp;入力してください'
            fullWidth
            required={true}
            InputLabelProps={{ shrink: true }}
            name='username'
            onChange={this.onChangeField}
          />
          <FormControl className={classes.password} fullWidth>
            <InputLabel shrink required>パスワード</InputLabel>
            <Input
              type={this.state.showPassword ? 'text' : 'password'}
              placeholder='  入力してください'
              name='password'
              onChange={this.onChangeField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClickShowPassword}>
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>&nbsp;&nbsp;英数字を含む8文字以上</FormHelperText>
          </FormControl>

          <Fab
            className={classes.button}
            variant='extended'
            onClick={this.onClickLogin}
          >
            ログイン
          </Fab>
          <div className={classes.errorMsg}>{errorMsg}</div>
          <Button
            color='secondary'
            className={classes.forget}
            component={Link}
            to='./request_reset_password'
          >
            パスワードをお忘れですか
          </Button>

        </form>
        <div>アカウントをお持ちでない方</div>
        <div>
          <Fab
            color='secondary'
            variant='extended'
            className={classes.signup}
            component={Link}
            to='./signup'
          >
            新規登録
          </Fab>
        </div>

        <Button
          color='secondary'
          component={Link}
          to='./public_contact'
        >このアプリに関するお問い合わせ
        </Button>
        <div className={classes.version}>{`version ${this.appVersion}`}</div>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  login: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default withStyles(styles)(Login);
