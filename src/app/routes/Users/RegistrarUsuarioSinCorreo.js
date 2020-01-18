import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
//reducer
import { registrarUsuarioSinCorreo } from "actions/authActions";
import { Alert } from "reactstrap";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import userImageDefault from "../../../assets/images/users/user.png";
//Components
import ContainerHeader from "components/ContainerHeader/index";
import FormUsuario from "./FormUsuario";

class RegistrarUsuarioSinCorreo extends Component {
  state = {
  };

  actionComponent = usuario => {
    const { history, registrarUsuarioSinCorreo } = this.props;
    registrarUsuarioSinCorreo(usuario).then(resp => {
      history.push("/app/users");
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
        <FormUsuario actionComponent={this.actionComponent} />
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
    registrarUsuarioSinCorreo: async newUser => dispatch(registrarUsuarioSinCorreo(newUser))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrarUsuarioSinCorreo)
);
