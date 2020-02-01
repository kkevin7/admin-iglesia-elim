import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Redux
import {
  buscarSocioCarnet,
  buscarContribucionActivas
} from "actions/AsociacionActions";

import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
//Alert
import { Alert, AlertTitle } from '@material-ui/lab';
//Components
import FichaSocio from "./FichaSocio";
import ExpasionPanelContribuciones from "./ExpansionPanelContribuciones";

class BusquedaSocio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  buscarSocio = async e => {
    e.preventDefault();
    const { busqueda } = this.state;
    const { buscarSocioCarnet, buscarContribucionActivas, disableNext, } = this.props;
    const socioResp = await buscarSocioCarnet(busqueda);
    if (socioResp) {
      await buscarContribucionActivas(busqueda);
      disableNext(false);
    }else{
      disableNext(true);
    }
  };

  render() {
    const { socio, noResultados,  contribuciones, noContribucion } = this.props;

    let fichaSocio = "";
    if (socio) {
      fichaSocio = <FichaSocio socio={socio} />;
    } else {
      fichaSocio = "";
    }

    let contribucionesActivas = "";
    if (noContribucion == false && contribuciones.length > 0) {
      contribucionesActivas = (
        <Fragment>
          <Alert severity="warning">
            <AlertTitle className="text-uppercase">El socio tiene contribuciones activas</AlertTitle>
            Desea continuar con la operación agregando otra contribución
        </Alert>
          <ExpasionPanelContribuciones
            contribuciones={contribuciones}
          />
        </Fragment>
      );
    }
    if (noContribucion == true && contribuciones.length == 0) {
      contribucionesActivas = (
        <Alert severity="success">
          <AlertTitle className="text-uppercase">No se encontraron contribuciones activas</AlertTitle>
          Puede continuar con la operación
        </Alert>
      );
    }

    //Mostrar mensaje de error
    let mensajeResultado = "";
    if (noResultados === true) {
      mensajeResultado = (
        <div className="alert alert-danger text-center font-weight-bold text-uppercase">
          No se encontro el socio
        </div>
        // <Alert severity="error" className="text-center font-weight-bold text-uppercase" >No se encontro el socio</Alert>
      );
    } else {
      mensajeResultado = "";
    }

    return (
      <div className="col-12">
        <div className="row justify-content-center">
          <div className="col-md-8 ">
            <form className="mb-4" onSubmit={this.buscarSocio}>
              <Typography
                variant="h6"
                gutterBottom
                className="text-uppercase text-center"
              >
                Ingresar el Carnet del Socio
              </Typography>
              <div className="form-group">
                <TextField
                  type="text"
                  id="busqueda"
                  name="busqueda"
                  label="Carnet"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="bg-green text-white"
              >
                Buscar Socio
              </Button>
            </form>
            {contribucionesActivas}
            {fichaSocio}
            {mensajeResultado}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({asociacion }) => {
  return {
    socio: asociacion.socio && asociacion.socio[0],
    noResultados: asociacion.noResultados,
    contribuciones: asociacion.contribuciones,
    noContribucion: asociacion.noContribucion,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buscarSocioCarnet: async socio => dispatch(buscarSocioCarnet(socio)),
    buscarContribucionActivas: async socio =>
      dispatch(buscarContribucionActivas(socio))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(BusquedaSocio)
);
