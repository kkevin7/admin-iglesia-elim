import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
//calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import moment from "moment";

class EspeficarCuota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor_cuota: "",
      cantidad_cuota: "",
      fecha_inicio: new Date(),
      fecha_fin: null,
      observaciones: "",
      //Errores
      valor_cuota_error: false,
      cantidad_cuota_error: false,
      fecha_inicio_error: false,
      fecha_fin_error: false,
      showMessage: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleChangeError(e);
  };

  handleChangeError = e => {
    if (e.target.value > 0) {
      this.setState({
        [e.target.name + "_error"]: false
      });
    } else {
      this.setState({
        [e.target.name + "_error"]: true
      });
    }
  };

  handleChangeNumber = e => {
    if (e.target.value) {
      this.setState({
        [e.target.name]: Math.floor(Number(e.target.value))
      });
    } else {
      this.setState({
        [e.target.name]: ""
      });
    }
    this.handleChangeError(e);
  };

  handleChangeDecimal = e => {
    if (e.target.value) {
      this.setState({
        [e.target.name]: Number(e.target.value)
      });
    } else {
      this.setState({
        [e.target.name]: ""
      });
    }
    this.handleChangeError(e);
  };

  handleCantidadCouta = e => {
    this.handleChangeNumber(e);
    if (e.target.value) {
      const fecha = new Date();
      let lastDay = new Date(
        fecha.getFullYear(),
        fecha.getMonth() + Number(e.target.value) + 1,
        0
      );
      this.setState({
        fecha_fin: lastDay
      });
    }
    if (e.target.value > 0) {
      this.setState({
        [e.target.name + "_error"]: false
      });
    } else {
      this.setState({
        [e.target.name + "_error"]: true
      });
    }
  };

  handleFechaInicio = async date => {
    await this.setState({
      fecha_inicio: date,
    });
    const {fecha_inicio, fecha_fin} = this.state;
    const fechaActual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    console.log(fecha_inicio < fecha_fin ? "TRUE": "FALSE");
    console.log(fecha_inicio);
    console.log(fecha_fin);
    if (date >= fechaActual && fecha_inicio < fecha_fin) {
      console.log("CUMPLE")
      await this.setState({
        fecha_inicio: date,
        fecha_inicio_error: false
      });
    } else {
      console.log("NO CUMPLE")
      await this.setState({
        fecha_inicio_error: true
      });
    }
  }

  handleFechaFin = async date => {
    await this.setState({
      fecha_fin: date,
    });
    const {fecha_inicio, fecha_fin} = this.state;
    const fechaActual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    console.log(fecha_inicio < fecha_fin ? "TRUE": "FALSE");
    console.log(fecha_inicio);
    console.log(fecha_fin);
    if (date >= fechaActual && fecha_inicio < fecha_fin) {
      console.log("CUMPLE")
      await this.setState({
        fecha_fin_error: false
      });
    } else {
      console.log("NO CUMPLE")
      await this.setState({
        fecha_fin_error: true
      });
    }
  };


  handleVerificarFields = e => {
    const { disableNext, setUpPago } = this.props;
    if (
      this.state.cantidad_cuota_error == false && this.state.cantidad_cuota &&
      this.state.valor_cuota_error == false && this.state.valor_cuota &&
      this.state.fecha_inicio_error == false && this.state.fecha_inicio &&
      this.state.fecha_fin_error == false && this.state.fecha_fin
    ) {
      this.setState({
        showMessage: true
      });
      disableNext(false);
      setUpPago({
        valor_cuota: this.state.valor_cuota,
        cantidad_cuota: this.state.cantidad_cuota,
        fecha_inicio: this.state.fecha_inicio,
        fecha_fin: this.state.fecha_fin,
        observaciones: this.state.observaciones
      });
    } else {
      this.setState({
        showMessage: false
      });
      disableNext(true);
    }
  };

  render() {
    const maxYear = new Date().setFullYear(new Date().getFullYear() + 100);

    const BadMessage = (
      <div className="col-12">
        <div className="alert alert-danger text-center font-weight-bold text-uppercase">
          Existe un error en los campos
        </div>
      </div>
    );
    const OKMessage = (
      <div className="col-12">
        <div className="alert alert-success text-center font-weight-bold text-uppercase">
          Todo esta correcto
        </div>
      </div>
    );

    return (
      <div className="col-md-12 col-12 p-4">
        <div className="col-12">
          <h2 className="text-center text-uppercase">
            Información de la Couta a Recibir
          </h2>
        </div>
        <form>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <TextField
                  required
                  error={this.state.valor_cuota_error}
                  id="valorCuota"
                  label="Valor de Aportacion"
                  type="number"
                  name="valor_cuota"
                  value={this.state.valor_cuota}
                  onChange={async e => {
                    await this.handleChangeDecimal(e);
                    await this.handleVerificarFields(e);
                  }}
                  InputProps={{
                    inputProps: { min: 0, step: 0.01 }
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <TextField
                  required
                  error={this.state.cantidad_cuota_error}
                  id="cantidadCuota"
                  label="Cantidad de Cuotas"
                  type="number"
                  name="cantidad_cuota"
                  minDate={new Date()}
                  maxDate={maxYear}
                  value={this.state.cantidad_cuota}
                  onChange={async e => {
                    await this.handleCantidadCouta(e);
                    await this.handleVerificarFields(e);
                  }}
                  InputProps={{
                    inputProps: { min: 1, step: 1 }
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      required
                      margin="normal"
                      fullWidth
                      readOnly
                      id="date-picker-dialog"
                      label="Fecha Inicio"
                      format="dd/MM/yyyy"
                      minDate={new Date()}
                      maxDate={maxYear}
                      value={this.state.fecha_inicio}
                      onChange={async (e) => {
                        await this.handleFechaInicio(e);
                        await this.handleVerificarFields(e);
                      }
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      required
                      margin="normal"
                      fullWidth
                      readOnly
                      id="date-picker-dialog"
                      label="Fecha Fin"
                      format="dd/MM/yyyy"
                      minDate={new Date()}
                      value={this.state.fecha_fin}
                      onChange={async (e) => {
                        await this.handleFechaFin(e);
                        await this.handleVerificarFields(e);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="col-md-12 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <TextField
                  id="observaciones"
                  name="observaciones"
                  label="Observaciones"
                  multiline
                  rows="4"
                  value={this.state.observaciones}
                  onChange={this.handleChangeFilds}
                />
              </div>
            </div>
            {/* <div className="col-12 my-4">
              <Button variant="contained" color="primary" type="submit">
                VERIFICAR
              </Button>
            </div> */}
            {this.state.showMessage ? OKMessage : null}
          </div>
        </form>
      </div>
    );
  }
}

export default EspeficarCuota;
