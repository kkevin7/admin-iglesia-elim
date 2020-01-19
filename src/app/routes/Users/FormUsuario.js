import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//Inputs
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { CardContent } from "@material-ui/core";
//calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
//Others components
import { Alert } from "reactstrap";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import userImageDefault from "../../../assets/images/users/user.png";
//Icons
import SaveIcon from "@material-ui/icons/Save";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

class FormUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.usuario ? props.usuario.id : "",
      nombre: props.usuario ? props.usuario.nombre : "",
      apellido: props.usuario ? props.usuario.apellido : "",
      telefono: props.usuario ? props.usuario.telefono : "",
      direccion: props.usuario ? props.usuario.direccion : "",
      departamento: props.usuario ? props.usuario.departamento : "Santa Ana",
      fecha_nacimiento: props.usuario ? props.usuario.fecha_nacimiento.toDate() : new Date().setFullYear(new Date().getFullYear() - 15),
      fecha_socio: props.usuario ? props.usuario.fecha_socio.toDate() : new Date(),
      email: props.usuario ? props.usuario.email : "",
      password: "",
      showPassword: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { actionComponent } = this.props;
    actionComponent(this.state);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFechaNacimiento = e => {
    this.setState({
      fecha_nacimiento: e
    });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { authError } = this.props;

    const departments = [
      {
        value: "Ahuachapán"
      },
      {
        value: "Cabañas"
      },
      {
        value: "Chalatenango"
      },
      {
        value: "Cuscatlán"
      },
      {
        value: "La Libertad"
      },
      {
        value: "La Paz"
      },
      {
        value: "La Unión"
      },
      {
        value: "Morazán"
      },
      {
        value: "San Miguel"
      },
      {
        value: "San Salvador"
      },
      {
        value: "San Vicente"
      },
      {
        value: "Santa Ana"
      },
      {
        value: "Sonsonate"
      },
      {
        value: "Usulután"
      }
    ];

    const classes = makeStyles(theme => ({
      root: {
        display: "flex",
        flexWrap: "wrap"
      },
      margin: {
        margin: theme.spacing(1)
      },
      withoutLabel: {
        marginTop: theme.spacing(3)
      },
      textField: {
        width: 200
      }
    }));

    return (
      <Card>
        <CardContent>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="row">
              <div className="col-md-3 col-12">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="210"
                        image={userImageDefault}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                  </Card>
                </div>
              </div>
              <div className="col-md-9 col-12">
                <div className="row">
                  <div className="col-md-4 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        required
                        name="nombre"
                        label="Nombres"
                        variant="outlined"
                        helperText="Ingresa los Nombres"
                        value={this.state.nombre}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        required
                        name="apellido"
                        label="Apellidos"
                        helperText="Ingresa los Apellidos"
                        variant="outlined"
                        value={this.state.apellido}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <FormControl>
                        <InputLabel htmlFor="telefono">
                          Número de Teléfono
                        </InputLabel>
                        <Input
                          required
                          value={this.state.telefono}
                          onChange={this.handleChange}
                          id="telefono"
                          name="telefono"
                          // defaultValue={""}
                          inputComponent={TextMaskCustom}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        id="outlined-select-currency"
                        name="departamento"
                        select
                        label="Departamento"
                        value={this.state.departamento}
                        onChange={this.handleChange}
                        helperText="Selecciona el departamento"
                        variant="outlined"
                      >
                        {departments.map(department => (
                          <MenuItem
                            key={department.value}
                            value={department.value}
                          >
                            {department.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            required
                            margin="normal"
                            name="fecha_nacimiento"
                            label="Fecha de Nacimiento"
                            format="dd/MM/yyyy"
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                            value={this.state.fecha_nacimiento}
                            onChange={this.handleFechaNacimiento}
                            helperText="Ingresa la fecha de nacimiento"
                            fullWidth
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                  <div className="col-md-8 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        name="direccion"
                        label="Dirección"
                        helperText="Ingresa la direccion del domicilio"
                        variant="outlined"
                        value={this.state.direccion}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  {this.props.correo ? (<div className="col-md-6 col-12" >
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <TextField
                        required
                        name="email"
                        type="email"
                        label="Correo Eléctronico"
                        helperText="Ingresa el correo eléctronico"
                        variant="outlined"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>) : ""}
                  {this.props.correo ? (<div className="col-md-6 col-12">
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Contraseña
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          required
                          name="password"
                          type={this.state.showPassword ? "text" : "password"}
                          label="Contraseña"
                          // helperText="Ingresa la contraseña"
                          value={this.state.password}
                          onChange={this.handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                              >
                                {this.state.showPassword ? (
                                  <Visibility />
                                ) : (
                                    <VisibilityOff />
                                  )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={85}
                        />
                      </FormControl>
                    </div>
                  </div>) : ""}
                  <div className="col-12 mt-3">
                    <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon/>}>
                      Guardar
                    </Button>
                  </div>
                  <div className="col-12 mt-3">
                    <Alert
                      color="danger"
                      isOpen={authError != null ? true : false}
                    >
                      {authError}
                    </Alert>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(FormUsuario);
