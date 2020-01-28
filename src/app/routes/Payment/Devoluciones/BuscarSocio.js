import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
//Redux
import { buscarSocio } from "actions/DevolucionesActions";
//Card
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//Components
import Spinner from "components/Spinner/Spinner";
import CardSocio from "./CardSocio";
import FichaSocio from "app/routes/Payment/Asociacion/FichaSocio";

class BuscarSocio extends Component {
  state = {
    busqueda: ""
  };

  hadleBuscarSocio = async e => {
    e.preventDefault();
    const { buscarSocio } = this.props;
    await buscarSocio(this.state.busqueda);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  redirectDevolucion = async () => {
    const { history, socio } = this.props;
    history.push(`/app/realizarDevolucion/${socio.carnet}`);
  };

  render() {
    const { socio, noResultados } = this.props;
    console.log(socio);

    let fichaSocio = "";
    if (socio) {
      fichaSocio = <FichaSocio socio={socio} />;
    } else {
      fichaSocio = "";
    }

    //Mostrar mensaje de error
    let mensajeResultado = "";
    if (noResultados == true) {
      mensajeResultado = (
        <div className="alert alert-danger text-center font-weight-bold text-uppercase">
          No se encontro el socio
        </div>
      );
    } else {
      mensajeResultado = "";
    }

    return (
      <div className="app-wrapper">
        <Card>
          <CardContent>
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-md-8 ">
                  <form className="mb-4" onSubmit={this.hadleBuscarSocio}>
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
                        value={this.state.busqueda}
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
                  {socio ? (
                    <Button
                      type="submit"
                      variant="contained"
                      className="bg-primary text-white"
                      onClick={this.redirectDevolucion}
                    >
                      Continuar
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, devolucion }) => {
  return {
    // usuario: firestore.ordered.usuario && firestore.ordered.usuario[0]
    socio: devolucion.socio && devolucion.socio[0],
    noResultados: devolucion.noResultados
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buscarSocio: async socio => dispatch(buscarSocio(socio))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(BuscarSocio)
);
