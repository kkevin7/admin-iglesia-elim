import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
//Redux
import {
  reportCuotasGeneradas,
  reportDevoluciones
} from "actions/ReportesActions";
//Card
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
//Icons
import EventNoteIcon from "@material-ui/icons/EventNote";
//Components
import EspecificarFecha from "app/routes/Kiosko/Reportes/EspecificarFecha";
import Ingresos from "./Ingresos";

class Reportes extends Component {
  state = {
    especificarFecha: false,
    showReport: false,
    fechaInicio: new Date(),
    fechaFin: new Date()
  };

  handleEspeficiarFecha = state => {
    this.setState({
      especificarFecha: state
    });
  };

  handleShowReport = state => {
    this.setState({
      showReport: state
    });
  };

  handleReportes = async () => {
    const { reportCuotasGeneradas, reportDevoluciones } = this.props;
    await reportCuotasGeneradas(this.state);
    await reportDevoluciones(this.state);
  };

  handleFechas = async fechas => {
    await this.setState({
      fechaInicio: fechas.fechaInicio,
      fechaFin: fechas.fechaFin
    });
    await this.handleReportes();
    await this.handleShowReport(true);
  };

  render() {
    const { cuotas, devoluciones, totalCuotas, totalDevoluciones, cantidadCuotas, cantidadDevoluciones, } = this.props;

    return (
      <div className="app-wrapper">
        <Card>
          <CardContent>
            <div className="col-12">
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
                          new Date().getMonth(),
                          1
                        ),
                        fechaFin: new Date()
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleReportes();
                      await this.handleShowReport(true);
                    }}
                  >
                    Mes Actual
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
                          new Date().getMonth() - 1,
                          1
                        ),
                        fechaFin: new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          0
                        )
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleReportes();
                      await this.handleShowReport(true);
                    }}
                  >
                    Mes Pasado
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
                          new Date().getMonth() - 3,
                          1
                        ),
                        fechaFin: new Date()
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleReportes();
                      await this.handleShowReport(true);
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
                        fechaInicio: new Date(new Date().getFullYear(), 0, 1),
                        fechaFin: new Date()
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleReportes();
                      await this.handleShowReport(true);
                    }}
                  >
                    Año Actual
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
                          new Date().getFullYear() - 1,
                          0,
                          1
                        ),
                        fechaFin: new Date(new Date().getFullYear() - 1, 12, 0)
                      });
                      await this.handleEspeficiarFecha(false);
                      await this.handleReportes();
                      await this.handleShowReport(true);
                    }}
                  >
                    Año Pasado
                  </Button>
                </div>
                <div className="mt-3 col-6 col-md-4">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EventNoteIcon />}
                    fullWidth
                    onClick={() => {
                      this.handleEspeficiarFecha(true);
                      this.handleShowReport(false);
                    }}
                  >
                    Especificar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <EspecificarFecha
          visible={this.state.especificarFecha}
          handleFechas={this.handleFechas}
        />
        <Ingresos
        visible={this.state.showReport}
        fechaInicio={this.state.fechaInicio}
        fechaFin={this.state.fechaFin}
        cuotas={cuotas}
        devoluciones={devoluciones}
        />
        {/* <ProductosColocados 
        visible={this.state.showReport}
        productos={productosColocados}
        fechaInicio={this.state.fechaInicio}
        fechaFin={this.state.fechaFin}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, reportes }) => {
  return {
    cuotas: reportes.cuotas,
    devoluciones: reportes.devoluciones,
    cantidadCuotas: reportes.cantidadCuotas,
    totalCuotas: reportes.totalCuotas,
    cantidadDevoluciones: reportes.cantidadDevoluciones,
    totalDevoluciones: reportes.totalDevoluciones
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reportCuotasGeneradas: async fecha =>
      dispatch(reportCuotasGeneradas(fecha)),
    reportDevoluciones: async fecha => dispatch(reportDevoluciones(fecha))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(Reportes)
);
