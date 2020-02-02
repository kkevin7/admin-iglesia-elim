import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
//Redux
import { createDevolucion } from "actions/DevolucionesActions";
//Inputs
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputMask from "react-input-mask";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import MenuItem from "@material-ui/core/MenuItem";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
//Select
import Select from "@material-ui/core/Select";
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
//Components
import Spinner from "components/Spinner/Spinner";
import CardSocio from "app/routes/Payment/Devoluciones/CardSocio";
import FormTipoUsuario from "./FormTipoUsuario";

class CambiarPrivilegios extends Component {
  
    state = {
      tipo_usuario: "Socio"
    };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { usuario } = this.props;
    if (!usuario) return <Spinner />;

    return (
      <div className="app-wrapper">
        <CardSocio usuario={usuario} />
        <FormTipoUsuario usuario={usuario} />
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
  )(CambiarPrivilegios)
);
