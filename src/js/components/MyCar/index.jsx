import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Fab, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import PageLayout from '../Layout';
import Maker from 'common/dto/Maker';
import VehicleModel from 'common/dto/VehicleModel';
import validator from 'validator';
import UserDto from '../../utility/UserData';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: 'calc(100% - 16px)',
  },
  vehicleNumber: {
    margin: theme.spacing.unit,
    width: 'calc(100% - 16px)',
  },
  button: {
    marginTop: '32px',
    background: theme.palette.common.green,
    color: theme.palette.common.white,
    width: '100%',
  },
  changedDialog: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  }
});

class MyCar extends React.Component {
  constructor(props) {
    super(props);
    const vehicleModel = props.vehicleModels.find(item => item.objectId === props.user.vehicleModelId);

    this.state = {
      maker: (vehicleModel) ? vehicleModel.makerId : "",
      vehicleModel: props.user.vehicleModelId || "",
      vehicleNumber: String(props.user.vehicleNumber),
      isError: {
        maker: false,
        vehicleModel: false,
        vehicleNumber: false,
      },
      isInvalidForm: false,
      showChangeDialog: false,
    }
    this.onClickChange = this.onClickChange.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.closeDialogs = this.closeDialogs.bind(this);
  }

  componentDidMount() {
    this.props.fetch();
  }

  onClickChange() {
    this.validate();
    if (this.isInvalidForm) return;

    this.props.change(this.state.vehicleModel, Number(this.state.vehicleNumber));
    this.setState({
      showChangeDialog: true
    });
  }

  onChangeField(e) {
    this.setState({ [e.target.name]: String(e.target.value) });
  }

  renderMakerItem() {
    return this.props.makers.map((item) => {
      return <MenuItem value={item.objectId} key={item.objectId}>{item.name}</MenuItem>
    });
  }

  renderVehicleModelItem() {
    const vehicleModels = this.props.vehicleModels.filter(item => item.makerId === this.state.maker);
    return vehicleModels.map((item) => {
      return <MenuItem value={item.objectId} key={item.objectId}>{item.name}</MenuItem>
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  closeDialogs() {
    this.setState({
      showChangeDialog: false
    });
  }

  validate() {
    const { maker, vehicleModel, vehicleNumber } = this.state;

    let isError = {
      maker: false,
      vehicleModel: false,
      vehicleNumber: false,
    };

    let isValidationError = false;

    if (!maker) {
      isError.maker = true;
      isValidationError = true;
    }

    if (!vehicleModel) {
      isError.vehicleModel = true;
      isValidationError = true;
    }
    if (validator.isEmpty(vehicleNumber) ||
      (!validator.isNumeric(vehicleNumber, { no_symbols: true })
        || vehicleNumber.length !== 4)) {
      isError.vehicleNumber = true;
    }
    this.setState({
      isInvalidForm: isValidationError,
      isError: isError
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <PageLayout title='マイカー'>
        <div className={classes.root}>
          <div>
            <FormControl
              className={classes.formControl}
              required
            >
              <InputLabel>メーカー</InputLabel>
              <Select
                value={this.state.maker}
                onChange={this.handleChange('maker')}
              >
                {this.renderMakerItem()}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              className={classes.formControl}
              required
            >
              <InputLabel>車種</InputLabel>
              <Select
                value={this.state.vehicleModel}
                onChange={this.handleChange('vehicleModel')}
              >
                {this.renderVehicleModelItem()}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              className={classes.vehicleNumber}
              label={this.state.isError.vehicleNumber ? 'ナンバープレートは4桁の数値で入力してください。' : 'ナンバープレート(4ケタ)'}
              placeholder={this.state.vehicleNumber ? this.state.vehicleNumber : '  入力してください'}
              name='vehicleNumber'
              required
              error={this.state.isError.vehicleNumber}
              InputLabelProps={{ shrink: true }}
              onChange={this.onChangeField}
            />
          </div>
          <Fab
            variant="extended"
            className={classes.button}
            onClick={this.onClickChange}
          >変更</Fab>
        </div>
        <Dialog
          open={this.state.showChangeDialog}
        >
          <div
            className= {classes.changedDialog}
          >
            保存しました
            <Fab
              variant="extended"
              className={classes.button}
              onClick={this.closeDialogs}
            >
              閉じる
            </Fab>
          </div>
        </Dialog>
      </PageLayout>
    );
  }
}

MyCar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  fetch: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserDto).isRequiered,
  makers: PropTypes.arrayOf(PropTypes.instanceOf(Maker)).isRequired,
  vehicleModels: PropTypes.arrayOf(PropTypes.instanceOf(VehicleModel)).isRequired,
};

export default withStyles(styles)(MyCar);