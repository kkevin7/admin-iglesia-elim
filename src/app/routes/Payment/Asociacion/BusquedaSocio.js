import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Redux
import { buscarSocioCarnet } from "actions/AsociacionActions";

import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

//Components
import FichaSocio from "./FichaSocio";

class BusquedaSocio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      noResultados: false,
      socio: {},
      pago: {}
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
    const { buscarSocioCarnet, noResultados } = this.props;
    await buscarSocioCarnet(busqueda);
  };

  render() {
    const { socio, noResultados, disableNext,} = this.props;

    let fichaSocio = "";
    if (socio) {
      disableNext(false);
      fichaSocio = <FichaSocio socio={socio} />;
    } else {
      disableNext(true);
      fichaSocio = "";
    }

    //Mostrar mensaje de error
    let mensajeResultado = "";
    if (noResultados === true) {
      mensajeResultado = (
        <div className="alert alert-danger text-center font-weight-bold text-uppercase">
          No se encontro el socio
        </div>
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
            {fichaSocio}
            {mensajeResultado}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ firestore, asociacion }) => {
  return {
    socio: asociacion.socio && asociacion.socio[0],
    noResultados: asociacion.noResultados
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buscarSocioCarnet: async socio => dispatch(buscarSocioCarnet(socio))
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(),
  )(BusquedaSocio)
);
