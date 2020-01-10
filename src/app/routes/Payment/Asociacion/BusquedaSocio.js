import React, { Component } from "react";

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

  buscarSocio = e => {
    e.preventDefault();
    const { busqueda } = this.state;
    const { firestore, setUpSocio, disableNext } = this.props;
    const usuariosRef = firestore.collection("usuarios").doc(busqueda);
    // const consulta = coleccion.where('uid', "==", busqueda).get();
    const consulta = usuariosRef.get();
    consulta.then(resultado => {
      if (!resultado.exists) {
        // console.log("NO SE ENCONTRO");
        disableNext(true);
        this.setState({
          noResultados: true,
          socio: {}
        });
      } else {
        // console.log("SOCIO ENCONTRADO");
        // console.log({...resultado.data(), id: busqueda})
        setUpSocio({ ...resultado.data(), id: busqueda });
        disableNext(false);
        this.setState({
          noResultados: false,
          socio: { ...resultado.data(), id: busqueda }
        });
      }
    });
  };

  render() {
    let fichaSocio;
    if (this.state.socio.nombre) {
      fichaSocio = <FichaSocio socio={this.state.socio} />;
    } else {
      fichaSocio = null;
    }

    //Mostrar mensaje de error
    const { noResultados } = this.state;
    let mensajeResultado = "";
    if (noResultados) {
      mensajeResultado = (
        <div className="alert alert-danger text-center font-weight-bold text-uppercase">
          No se encontro el socio
        </div>
      );
    } else {
      mensajeResultado = null;
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
                Ingresar el Código del Socio
              </Typography>
              <div className="form-group">
                <TextField
                  type="text"
                  id="busqueda"
                  name="busqueda"
                  label="Código"
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
                Buscar Alumno
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

export default BusquedaSocio;
