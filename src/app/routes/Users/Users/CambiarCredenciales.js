import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Inputs
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { CardContent } from "@material-ui/core";
//calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
//Components
import ProfileHeader from "components/profile/ProfileHeader/index";
import Spinner from "components/Spinner/Spinner";
import CardSocio from "app/routes/Payment/Devoluciones/CardSocio";
//Others components
import clsx from "clsx";
import { Alert } from "reactstrap";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

class CambiarCredenciales extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const { actionComponent } = this.props;
    actionComponent(this.state);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeError = e => {
    if (e.target.value) {
      this.setState({
        [e.target.name + "_error"]: false
      });
    } else {
      this.setState({
        [e.target.name + "_error"]: true
      });
    }
  };

  handleFechaNacimiento = e => {
    this.setState({
      fecha_nacimiento: e
    });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { usuario } = this.props;
    if (!usuario || !usuario.carnet == this.props.match.params.carnet)
      return <Spinner />;

    const classes = makeStyles(theme => ({
      root: {
        display: "flex",
        flexWrap: "wrap"
      },
      margin: {
        margin: theme.spacing(1)
      },
      withoutLabel: {
        marginTop: theme.spacing(3)
      },
      textField: {
        width: 200
      }
    }));

    return (
      <div className="app-wrapper">
        <CardSocio usuario={usuario} />
        <Card>
          <CardContent>
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <TextField
                      required
                      error={this.state.email_error}
                      helperText={
                        this.state.email_error
                          ? "Debes ingresar un correo eléctronico"
                          : ""
                      }
                      name="email"
                      type="email"
                      label="Correo Eléctronico"
                      helperText="Ingresa el correo eléctronico"
                      variant="outlined"
                      value={this.state.email}
                      onChange={e => {
                        this.handleChange(e);
                        this.handleChangeError(e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Contraseña
                      </InputLabel>
                      <OutlinedInput
                        required
                        error={this.state.password_error}
                        // helperText={this.state.password_error ? "Debes ingresar una contraseña" : ""}
                        id="password"
                        name="password"
                        type={this.state.showPassword ? "text" : "password"}
                        label="Contraseña"
                        value={this.state.password}
                        onChange={e => {
                          this.handleChange(e);
                          this.handleChangeError(e);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                              edge="end"
                            >
                              {this.state.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={85}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    usuario: firestore.ordered.usuario && firestore.ordered.usuario[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => {
      if (!props.match.params.carnet) return [];
      return [
        {
          collection: "usuarios",
          where: [["carnet", "==", props.match.params.carnet]],
          storeAs: "usuario"
        }
      ];
    })
  )(CambiarCredenciales)
);
