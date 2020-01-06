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

class EspeficarCuota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor_cuota: "",
      cantidad_cuota: "",
      fecha_inicio: new Date(),
      fecha_fin: null,
      observaciones: "",
      valor_cuota_error: false,
      cantidad_cuota_error: false,
      showMessage: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
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

  handleChangeFilds = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCantidadCouta = e => {
    this.setState({
      cantidad_cuota: Number(e.target.value)
    });
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
  handleFechaInicio = date => {
    this.setState({
      fecha_inicio: date
    });
  };
  handleFechaFin = date => {
    this.setState({
      fecha_fin: date
    });
  };

  handleVerificarFields = e => {
    e.preventDefault();
    const {disableNext, setUpPago} = this.props;
    if (this.state.cantidad_cuota_error === false && this.state.valor_cuota_error === false) {
      this.setState({
        showMessage: true
      });
      disableNext(false);
      setUpPago({
        valor_cuota: this.state.valor_cuota,
        cantidad_cuota: this.state.cantidad_cuota,
        fecha_inicio: this.state.fecha_inicio,
        fecha_fin: this.state.fecha_fin,
        observaciones: this.state.observaciones,
      })
    } else {
      this.setState({
        showMessage: false
      });
      disableNext(true);
    }
  };

  render() {

    const BadMessage = <div className="col-12">
    <div className="alert alert-danger text-center font-weight-bold text-uppercase">
      Existe un error en los campos
    </div>
  </div>;
  const OKMessage = <div className="col-12">
  <div className="alert alert-success text-center font-weight-bold text-uppercase">
    Todo esta correcto
  </div>
</div>;

    return (
      <div className="col-md-12 col-12 p-4">
        <div className="col-12">
          <h2 className="text-center text-uppercase">
            Información de la Couta a Recibir
          </h2>
        </div>
        <form onSubmit={this.handleVerificarFields}>
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
                onChange={this.handleChange}
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
                value={this.state.cantidad_cuota}
                onChange={this.handleCantidadCouta}
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
                    value={this.state.fecha_inicio}
                    onChange={this.handleFechaInicio}
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
                    onChange={this.handleFechaInicio}
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
          <div className="col-12 my-4">
            <Button variant="contained" color="primary" type="submit">
              VERIFICAR
            </Button>
          </div>
          {this.state.showMessage ? OKMessage : null }
        </div>
        </form>
      </div>
    );
  }
}

export default EspeficarCuota;
