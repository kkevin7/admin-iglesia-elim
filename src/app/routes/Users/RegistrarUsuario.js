import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
//Components
import FormUsuario from "./FormUsuario";
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
//calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
//reducers
import { registrarUsuario, signOut } from "actions/authActions";
import { userSignOut } from "actions/Auth";
//Others components
import clsx from "clsx";
import { Alert } from "reactstrap";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
//Image
import userImageDefault from "../../../assets/images/users/user.png";

class RegistrarUsuario extends Component {
  state = {};

  actionComponent = usuario => {
    const { history, registrarUsuario, authError, userSignOut } = this.props;
    console.log(authError);
    registrarUsuario(usuario).then(() => {
      // history.push('/app/users');
      userSignOut();
    });
  };

  render() {
    const { authError } = this.props;

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Registrar nuevo usuario"
        />
        <FormUsuario actionComponent={this.actionComponent} correo={true} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.authCustom.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registrarUsuario: async newUser => dispatch(registrarUsuario(newUser)),
    // signOut: async () => dispatch(signOut()),
    userSignOut: () => dispatch(userSignOut())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrarUsuario)
);
