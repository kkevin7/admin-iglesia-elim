import React, { Component } from "react";

import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Components
import FichaSocio from "./FichaSocio";

class BusquedaSocio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      noResultados: false,
      socio: {}
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
      //   console.log(resultado.data())
      if (!resultado.exists) {
        console.log("NO SE ENCONTRO");
        disableNext(true);
        this.setState({
          noResultados: true
        });
      } else {
        console.log("SOCIO ENCONTRADO");
        setUpSocio(resultado.data());
        disableNext(false);
        this.setState({
          noResultados: false,
          socio: resultado.data()
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
              <legend>Ingresar el Código del Socio</legend>
              <div className="form-group">
                <input
                  type="text"
                  name="busqueda"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <input
                type="submit"
                value="Buscar Alumno"
                className="btn btn-success btn-block"
              />
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
