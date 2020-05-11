import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import moment from "moment";
//Redux
import {
  editarContribucion,
  editarCuotas
} from "actions/contribucionesActions";
//Inputs
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
//calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
//Componets
import { CardContent } from "@material-ui/core";
import Spinner from "components/Spinner/Spinner";
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";

function MoneyFormatCustom(props) {
  const { inputRef, onChange, name, type, checked, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
            name,
            type,
            checked,
          },
        });
      }}
      thousandSeparator={true}
      isNumericString={true}
      allowNegative={false}
      prefix="$ "
      decimalScale={2}
    />
  );
}

MoneyFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

class FormContribucion extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            valor_cuota:  "",
            cantidad_cuota: "",
            fecha_inicio: new Date(),
            fecha_fin: null,
            observaciones:  "",
            estado: "",
            //Errores
            valor_cuota_error: false,
            cantidad_cuota_error: false,
            fecha_inicio_error: false,
            fecha_fin_error: false,
            showMessage: ""
         };
    }

    componentWillReceiveProps(nextProps) {
      const { contribucion } = nextProps;
  
      if (contribucion) {
        this.setState({
          valor_cuota: contribucion
            ? contribucion.valor_cuota
            : "",
          cantidad_cuota: contribucion
            ? contribucion.cantidad_cuota
            : "",
          fecha_inicio: contribucion
            ? contribucion.fecha_inicio
            : new Date(),
          fecha_fin: contribucion
            ? contribucion.fecha_fin
            : null,
          observaciones: contribucion
            ? contribucion.observaciones
            : "",
          estado: contribucion ? contribucion.estado : ""
        });
      }

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
          this.handleFechaFin(lastDay);
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
          fecha_inicio: date
        });
        const { fecha_inicio, fecha_fin } = this.state;
        const fechaActual = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );
        if (date >= fechaActual && fecha_inicio < fecha_fin) {
          await this.setState({
            fecha_inicio: date,
            fecha_inicio_error: false
          });
        } else {
          await this.setState({
            fecha_inicio_error: true
          });
        }
      };
    
      handleFechaFin = async date => {
        await this.setState({
          fecha_fin: date
        });
        const { fecha_inicio, fecha_fin } = this.state;
        const fechaActual = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );
        const fechaFinal = new Date().setFullYear(
          Number(new Date().getFullYear()) + 100
        );
        if (
          date >= fechaActual &&
          fecha_inicio < fecha_fin &&
          fecha_fin < fechaFinal
        ) {
          await this.setState({
            fecha_fin_error: false
          });
        } else {
          await this.setState({
            fecha_fin_error: true
          });
        }
      };
    
      handleSubmit = e => {
        e.preventDefault();
        const { actionComponent, contribucion } = this.props;
        if (
          this.state.valor_cuota_error == false &&
          this.state.valor_cuota 
        ) {
            
          actionComponent({id: contribucion.id,...this.state});
        }
      };

    

    render() {
      
      if (
        !this.props.contribucion ||
        !this.props.contribucion.id_contribucion == this.props.match.params.id_contribucion
      )
        return <Spinner />;


        return (
            <Card>
          <CardContent>
            <div className="col-md-12 col-12 p-4">
              <div className="col-12">
                <h2 className="text-center text-uppercase">
                  Información de la Contribución
                </h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        required
                        error={this.state.valor_cuota_error}
                        helperText={
                          this.state.valor_cuota_error
                            ? "Ingrese un valor válido"
                            : ""
                        }
                        id="valorCuota"
                        variant="outlined"
                        label="Valor de Aportacion"
                        type="number"
                        name="valor_cuota"
                        value={this.state.valor_cuota}
                        onChange={async e => {
                          await this.handleChangeDecimal(e);
                        }}
                        InputProps={{
                          inputComponent: MoneyFormatCustom,
                          inputProps: { min: 0, step: 0.01 }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <FormControl variant="outlined">
                        <InputLabel htmlFor="estado">
                          Estado
                        </InputLabel>
                        <Select
                          required
                          labelId="estado-label"
                          id="estado"
                          name="estado"
                          variant="outlined"
                          className={`${
                            this.state.estado ? "bg-green" : "bg-red"
                          }`}
                          // defaultValue={true}
                          value={this.state.estado}
                          onChange={this.handleChange}
                        >
                          <MenuItem className={`bg-green`} value={true}>
                            ACTIVO
                          </MenuItem>
                          <MenuItem className={`bg-red`} value={false}>
                            FINALIZADO
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-12 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                      multiline
                      rows="4"
                      variant="outlined"
                        id="observaciones"
                        name="observaciones"
                        label="Observaciones"
                        value={this.state.observaciones}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 my-4">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
        );
    }
}

export default withRouter( (FormContribucion));