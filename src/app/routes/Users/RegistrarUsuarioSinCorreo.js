import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
import FormUsuario from "./FormUsuario";
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

//calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
//reducer
import { registrarUsuarioSinCorreo } from "actions/authActions";
import { Alert } from "reactstrap";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import userImageDefault from "../../../assets/images/users/user.png";

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

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

class RegistrarUsuarioSinCorreo extends Component {
  state = {
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    departamento: "Santa Ana",
    fecha_nacimiento: new Date().setFullYear(new Date().getFullYear() - 25),
    fecha_socio: new Date(),
    email: "",
    password: "",
    showPassword: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { history, registrarUsuarioSinCorreo } = this.props;
    registrarUsuarioSinCorreo(this.state).then(resp => {
      history.push("/app/users");
    });
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

    // function TextMaskCustom(props) {
    //   const { inputRef, ...other } = props;
    //   console.log(props)
    //   return (
    //     <MaskedInput
    //       {...other}
    //       ref={ref => {
    //         inputRef(ref ? ref.inputElement : null);
    //       }}
    //       mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    //       placeholderChar={'\u2000'}
    //       showMask
    //     />
    //   );
    // }

    // TextMaskCustom.propTypes = {
    //   inputRef: PropTypes.func.isRequired,
    // };

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Registrar nuevo usuario"
        />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <div className="jr-card-header ">
                <h3 className="card-heading">DATOS DEL USUARIO</h3>
              </div>
              <div className="jr-card-body ">
                <form
                  onSubmit={this.handleSubmit}
                  // noValidate
                  autoComplete="off"
                >
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
                                />
                              </Grid>
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                        <div className="col-md-12 col-12">
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
                        <div className="col-12 mt-3">
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.authCustom.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registrarUsuarioSinCorreo: async newUser =>
      dispatch(registrarUsuarioSinCorreo(newUser))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrarUsuarioSinCorreo)
);
