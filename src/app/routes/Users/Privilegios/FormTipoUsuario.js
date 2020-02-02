import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
//Redux
import { updateUserRol } from "actions/authActions";
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

class FormTipoUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo_usuario: props.usuario ? props.usuario.rol : "Socio"
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const{updateUserRol, usuario} = this.props;
    const user = {
      id: usuario.id,
      rol: this.state.tipo_usuario
    }
    await updateUserRol(user);
  }

  render() {
    const { usuario } = this.props;
    if (!usuario) return <Spinner />;

    const roles = [
      {
        value: "Socio",
        label: "Socio"
      },
      {
        value: "SectorVentas",
        label: "Sector de Ventas"
      },
      {
        value: "SectorPagos",
        label: "Sector de Pagos"
      },
      {
        value: "Administrador",
        label: "Administrador"
      }
    ];

    return (
      <Card>
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <Typography
              variant="h6"
              gutterBottom
              className="text-uppercase text-center"
            >
              Seleccionar el tipo de Usuario
            </Typography>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 col-12 mx-auto">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <TextField
                      id="select-tipo-usuario"
                      select
                      label="Select"
                      name="tipo_usuario"
                      value={this.state.tipo_usuario}
                      onChange={this.handleChange}
                      helperText="Selecciona el Privilegio del sistema"
                      variant="outlined"
                    >
                      {roles.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
                <div className="col-12 mt-3 mx-auto text-center">
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    color="primary"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    usuario: firestore.ordered.usuario && firestore.ordered.usuario[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserRol: async(user) => dispatch(updateUserRol(user))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
  )(FormTipoUsuario)
);