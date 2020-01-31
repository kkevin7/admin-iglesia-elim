import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
//Redux
import { buscarTopSocios } from "actions/TopSociosActions";
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
import DataTableTopSocios from "./DataTableTopSocios";
//Icons
import EventNoteIcon from "@material-ui/icons/EventNote";

class TopSocios extends Component {
  state = {
    especificarFecha: false,
    showTop: false,
    fechaInicio: new Date(),
    fechaFin: new Date()
  };

  // componentDidMount() {
  //   const { buscarTopSocios } = this.props;
  //   // buscarTopSocios();
  // }

  handleEspeficiarFecha = state => {
    this.setState({
      especificarFecha: state
    });
  };

  handleShowTop = state => {
    this.setState({
      showTop: state
    });
  };

  handleTopSocios = async () => {
    const { buscarTopSocios } = this.props;
    await buscarTopSocios(this.state);
  };

  handleFechas = async fechas => {
    await this.setState({
      fechaInicio: fechas.fechaInicio,
      fechaFin: fechas.fechaFin
    });
    await this.handleReportProductosColocados();
    await this.handleShowReport(true);
  };

  render() {
    const { topSocios, busqueda } = this.props;
    if (!topSocios) return <Spinner />;
    let topSociosBusqueda = [];

    if (busqueda) {
      topSociosBusqueda = topSocios.filter(topSocio =>
        topSocio.carnet.toLowerCase().includes(busqueda) ||
        topSocio.nombre.toLowerCase().includes(busqueda) ||
        topSocio.apellido.toLowerCase().includes(busqueda) ||
        topSocio.totalPagado.toFixed(2).includes(busqueda) ||
        topSocio.cantidadCuotas.toString().includes(busqueda) 
      );
    }

    return (
      <div className="app-wrapper">
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              className="text-center text-uppercase my-2"
            >
              Mejores Socios
            </Typography>
            <div className="col-12 my-4">
              <div className="row">
                <div className="mt-3 col-6 col-md-4">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EventNoteIcon />}
                    fullWidth
                    onClick={async () => {
                      await this.setState({
                        fechaInicio: new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 3,
                          1
                        ),
                        fechaFin: new Date()
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleShowTop(true);
                      await this.handleTopSocios();
                    }}
                  >
                    Últimos 3 Meses
                  </Button>
                </div>
                <div className="mt-3 col-6 col-md-4">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EventNoteIcon />}
                    fullWidth
                    onClick={async () => {
                      await this.setState({
                        fechaInicio: new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 6,
                          1
                        ),
                        fechaFin: new Date()
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleShowTop(true);
                      await this.handleTopSocios();
                    }}
                  >
                    Últimos 6 Meses
                  </Button>
                </div>
                <div className="mt-3 col-6 col-md-4">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EventNoteIcon />}
                    fullWidth
                    onClick={async () => {
                      await this.setState({
                        fechaInicio: new Date(new Date().getFullYear(), 0, 1),
                        fechaFin: new Date()
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleShowTop(true);
                      await this.handleTopSocios();
                    }}
                  >
                    Año Actual
                  </Button>
                </div>
              </div>
            </div>
            <DataTableTopSocios
              topSocios={busqueda ? topSociosBusqueda : topSocios}
              showTop={this.state.showTop}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ topSocios, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    topSocios: topSocios.topSocios
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buscarTopSocios: async fechas => dispatch(buscarTopSocios(fechas))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(TopSocios)
);
