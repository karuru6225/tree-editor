import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { Dialog, DialogContent, DialogTitle, Fab, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PageLayout from '../Layout';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  description: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.green
  },
  dialog: {
    width: 'calc(100% -32px)',
    margin: theme.spacing.unit,

  },
  dialogTitle: {
    textAlign: 'center',
  },
  result: {
    width: '100%',
    textAlign: 'center'
  },
});

class RequestResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: null,
      openSuccess: false,
      openNotFound: false,
      openFailed: false,
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
    this.handleCloseNotFound = this.handleCloseNotFound.bind(this);
    this.handleCloseFailed = this.handleCloseFailed.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isComplete && this.props.isComplete !== prevProps.isComplete) {
      switch (this.props.statusCode) {
        case 200:
          this.setState({ openSuccess: true });
          break;
        case 404:
          this.setState({ openNotFound: true });
          break;
        default:
          this.setState({ openFailed: true });
          break;
      }
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      emailError: null,
    });
  }

  onClickReset() {
    if (validator.isEmail(this.state.email)) {
      this.props.requestReset(this.state.email)
    } else {
      this.setState({
        emailError: '正しいメールアドレス形式で入力してください',
      })
    }
  }

  handleCloseSuccess() {
    this.setState({ openSuccess: false });
  }

  handleCloseNotFound() {
    this.setState({ openNotFound: false });
  }

  handleCloseFailed() {
    this.setState({ openFailed: false });
  }

  render() {
    const { classes, isProcessing } = this.props;

    const renderSuccessDialog = (
      <Dialog
        open={this.state.openSuccess}
        onClose={this.handleCloseSuccess}
      >
        <DialogTitle className={classes.dialogTitle}>
          送信完了
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            {this.state.email}宛に、パスワードをリセットする手順を記載したメールを送信しました。
          </Typography>
          <Fab
            variant="extended"
            color="secondary"
            className={classes.button}
            component={Link}
            to='./login'
          >
            ログイン画面に戻る
          </Fab>
        </DialogContent>
      </Dialog>
    );

    const renderNotFoundDialog = (
      <Dialog
        open={this.state.openNotFound}
        onClose={this.handleCloseNotFound}
      >
        <DialogTitle className={classes.dialogTitle}>
          未登録のメールアドレス
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            登録されていないメールアドレスです。正しいメールアドレスを入力してください。
          </Typography>
          <Fab
            variant="extended"
            color="secondary"
            className={classes.button}
            onClick={this.handleCloseNotFound}
          >
            もう一度入力する
          </Fab>
        </DialogContent>
      </Dialog>
    );

    const renderFailedDialog = (
      <Dialog
        open={this.state.openFailed}
        onClose={this.handleCloseFailed}
      >
        <DialogTitle className={classes.dialogTitle}>
          失敗しました
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            処理に失敗しました。時間をおいてからもう一度実行ください。
          </Typography>
          <Fab
            variant="extended"
            color="secondary"
            className={classes.button}
            onClick={this.handleCloseFailed}
          >
            もう一度入力する
          </Fab>
        </DialogContent>
      </Dialog>
    );

    return (
      <PageLayout title="パスワードをお忘れの方" visibleBottom={false}>
        {renderSuccessDialog}
        {renderNotFoundDialog}
        {renderFailedDialog}
        <div className={classes.root}>
          <div className={classes.description}>
            ご登録いただいたメールアドレスに、パスワードリセットのメールを送信します。<br/>
            メールアドレスを入力し、「送信」ボタンを押してください。
          </div>
          <TextField
            id="standard-name"
            label="メールアドレス"
            margin="normal"
            fullWidth
            value={this.state.email}
            onChange={this.onChangeEmail}
            error={this.state.emailError}
            helperText={this.state.emailError}
          />
          <Fab
            variant="extended"
            color="secondary"
            className={classes.button}
            onClick={this.onClickReset}
            disabled={isProcessing}
          >
            送信
          </Fab>
        </div>
      </PageLayout>
    );
  }
}

RequestResetPassword.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  requestReset: PropTypes.func.isRequired,
};

export default withStyles(styles)(RequestResetPassword);
