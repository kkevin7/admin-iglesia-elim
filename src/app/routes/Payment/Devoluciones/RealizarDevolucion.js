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
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
//Components
import Spinner from "components/Spinner/Spinner";
import CardSocio from "./CardSocio";

class RealizarDevolucion extends Component {
  state = {
    monto: "",
    descripcion: "",
    error_monto: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeNumber = e => {
    if (e.target.value > 0) {
      this.setState({
        [e.target.name]: Number(e.target.value),
        [`error_${e.target.name}`]: false
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        [`error_${e.target.name}`]: true
      });
    }
  };

  handleSubmit = async e => {
    const { history, createDevolucion, usuario } = this.props;

    e.preventDefault();
    if (this.state.monto > 0) {
      const nuevaDevolucion = {
        carnet: usuario.carnet,
        monto: Number(this.state.monto),
        descripcion: this.state.descripcion
      };
      await createDevolucion(nuevaDevolucion).then(async () => {
          await history.push(`/app/devoluciones`);
      })
    }
  };

  render() {
    const { usuario } = this.props;
    if (!usuario) return <Spinner />;

    return (
      <div className="app-wrapper">
        <CardSocio usuario={usuario} />
        <Card>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Typography
                variant="h6"
                gutterBottom
                className="text-uppercase text-center"
              >
                Datos de la devolución
              </Typography>
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        required
                        type="number"
                        variant="outlined"
                        error={this.state.error_monto}
                        helperText={
                          this.state.error_monto
                            ? "El total debe ser mayor a cero"
                            : ""
                        }
                        id="monto"
                        name="monto"
                        label="Monto a devolver"
                        InputProps={{
                          inputProps: { min: 0, step: 0.01 }
                        }}
                        value={this.state.monto}
                        onChange={this.handleChangeNumber}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        name="descripcion"
                        label="Descripción del motivo"
                        multiline
                        rows="4"
                        variant="outlined"
                        value={this.state.descripcion}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 mt-3">
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
  return {
    createDevolucion: async devolucion => dispatch(createDevolucion(devolucion))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => {
      if (!props.match.params.id) return [];
      return [
        {
          collection: "usuarios",
          where: [["carnet", "==", props.match.params.id]],
          storeAs: "usuario"
        }
      ];
    })
  )(RealizarDevolucion)
);
