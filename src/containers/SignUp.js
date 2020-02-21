import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
//Redux
import { registrarUsuario } from "actions/authActions";
import {
  nuevoUsuario,
  hideMessage,
  showAuthLoader,
  userSignIn,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignUp,
  userTwitterSignIn
} from "actions/Auth";
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
import Button from "@material-ui/core/Button";
import { Alert } from "reactstrap";
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
import IconButton from "@material-ui/core/IconButton";
//Images
import logoElim from "assets/images/elim-santa-ana.jpg";

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

const useStyles = makeStyles(theme => ({
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

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      departamento: "Santa Ana",
      fecha_nacimiento: new Date().setFullYear(new Date().getFullYear() - 25),
      fecha_socio: new Date(),
      email: "",
      password: "",
      //Errores
      nombre_error: false,
      apellido_error: false,
      telefono_error: false,
      direccion_error: false,
      departamento_error: false,
      fecha_nacimiento_error: false,
      fecha_socio_error: false,
      email_error: false,
      password_error: false
    };
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeTrim = e => {
    this.setState({
      [e.target.name]: e.target.value.trim()
    });
  };

  handleChangeError = e => {
    if (e.target.value) {
      this.setState({
        [e.target.name + "_error"]: false
      });
    } else {
      this.setState({
        [e.target.name + "_error"]: true
      });
    }
  };

  handleFechaNacimiento = e => {
    this.setState({
      fecha_nacimiento: e
    });
  };

  handleRegistrarUsuario = e => {
    const { showMessage } = this.props;
    const { email, password } = this.state;

    e.preventDefault();
    this.props.showAuthLoader();
    this.props.nuevoUsuario(this.state).then(async user => {
      if (user) {
        await this.props.history.push("/app/home");
      }
    });

    // this.props.userSignUp({ email, password });
  };

  render() {
    const {
      nombre,
      apellido,
      telefono,
      direccion,
      departamento,
      fecha_nacimiento,
      fecha_socio,
      email,
      password,
      //Errores
      nombre_error,
      apellido_error,
      telefono_error,
      direccion_error,
      departamento_error,
      fecha_nacimiento_error,
      fecha_socio_error,
      email_error,
      password_error
    } = this.state;
    const { showMessage, loader, alertMessage, authError } = this.props;

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

    return (
      <div className="app-main-content-wrapper">
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3 my-3">
          <div className="app-login-main-content">
            <div className="app-logo-content d-flex align-items-center justify-content-center">
              <Link className="logo-lg" to="/app/home" title="Jambo">
                <img src={logoElim} alt="jambo" title="jambo" />
              </Link>
            </div>

            <div className="app-login-content">
              <div className="app-login-header">
                <h1>Registrarse</h1>
              </div>

              <div className="mb-4">
                <h2>
                  <IntlMessages id="appModule.createAccount" />
                </h2>
              </div>

              <div className="app-login-form">
                <form
                  method="post"
                  action="/"
                  onSubmit={this.handleRegistrarUsuario}
                >
                  <TextField
                    required
                    error={nombre_error}
                    type="text"
                    label="Nombre"
                    name="nombre"
                    value={this.state.nombre}
                    onChange={e => {
                      this.handleChange(e);
                      this.handleChangeError(e);
                    }}
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-2"
                  />
                  <TextField
                    required
                    error={apellido_error}
                    type="text"
                    label="Apellido"
                    name="apellido"
                    value={this.state.apellido}
                    onChange={e => {
                      this.handleChange(e);
                      this.handleChangeError(e);
                    }}
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-2"
                  />
                  <FormControl fullWidth className="mt-0 mb-2">
                    <InputLabel htmlFor="telefono">
                      Número de Teléfono
                    </InputLabel>
                    <Input
                      value={this.state.telefono}
                      onChange={e => {
                        this.handleChange(e);
                        this.handleChangeError(e);
                      }}
                      id="telefono"
                      name="telefono"
                      inputComponent={TextMaskCustom}
                      fullWidth
                    />
                  </FormControl>
                  <TextField
                    required
                    error={departamento_error}
                    id="id-departamento"
                    name="departamento"
                    select
                    className="mt-0 mb-2"
                    label="Departamento"
                    value={this.state.departamento}
                    onChange={e => {
                      this.handleChange(e);
                      this.handleChangeError(e);
                    }}
                    fullWidth
                  >
                    {departments.map(department => (
                      <MenuItem key={department.value} value={department.value}>
                        {department.value}
                      </MenuItem>
                    ))}
                  </TextField>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        required
                        margin="normal"
                        name="fecha_nacimiento"
                        label="Fecha de Nacimiento"
                        format="dd/MM/yyyy"
                        className="mt-0 mb-2"
                        maxDate={new Date().setFullYear(
                          new Date().getFullYear() - 5
                        )}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        value={this.state.fecha_nacimiento}
                        onChange={e => {
                          this.handleFechaNacimiento(e)
                        }}
                        fullWidth
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <TextField
                    name="direccion"
                    label="Dirección"
                    className="mt-0 mb-2"
                    value={this.state.direccion}
                    onChange={e => {
                      this.handleChange(e);
                      this.handleChangeError(e);
                    }}
                    fullWidth
                    multiline
                    rows="3"
                  />
                  <TextField
                    required
                    error={email_error}
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={e => {
                      this.handleChangeTrim(e);
                      this.handleChangeError(e);
                    }}
                    label={<IntlMessages id="appModule.email" />}
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-2"
                  />

                  <TextField
                    required
                    error={password_error}
                    type="password"
                    name="password"
                    onChange={e => {
                      this.handleChangeTrim(e);
                      this.handleChangeError(e);
                    }}
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    defaultValue={password}
                    margin="normal"
                    className="mt-0 mb-4"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      // onClick={() => {
                      //   this.props.showAuthLoader();
                      //   // this.props.userSignUp({ email, password });
                      // }}
                    >
                      REGISTRARSE
                    </Button>
                    <Link to="/signin">
                      <IntlMessages id="signUp.alreadyMember" />
                    </Link>
                  </div>
                  {/* <div className="app-social-block my-1 my-sm-3">
                  <IntlMessages
                    id="signIn.connectWith"/>
                  <ul className="social-link">
                    <li>
                      <IconButton className="icon"
                                  onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userFacebookSignIn();
                                  }}>
                        <i className="zmdi zmdi-facebook"/>
                      </IconButton>
                    </li>

                    <li>
                      <IconButton className="icon"
                                  onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userTwitterSignIn();
                                  }}>
                        <i className="zmdi zmdi-twitter"/>
                      </IconButton>
                    </li>

                    <li>
                      <IconButton className="icon"
                                  onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userGoogleSignIn();

                                  }}>
                        <i className="zmdi zmdi-google-plus"/>
                      </IconButton>
                    </li>

                    <li>
                      <IconButton className="icon"
                                  onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userGithubSignIn();
                                  }}>
                        <i className="zmdi zmdi-github"/>
                      </IconButton>
                    </li>
                  </ul>
                </div> */}
                </form>
              </div>
              <div className="col-12 mt-3">
                <Alert color="danger" isOpen={authError != null ? true : false}>
                  {authError}
                </Alert>
              </div>
            </div>
          </div>

          {loader && (
            <div className="loader-view">
              <CircularProgress />
            </div>
          )}
          {showMessage && NotificationManager.error(alertMessage)}
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, authCustom }) => {
  // const { authError } = authCustom;
  const { loader, alertMessage, showMessage, authUser, authError } = auth;
  return { loader, alertMessage, showMessage, authUser, authError };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      nuevoUsuario,
      userSignUp,
      userSignIn,
      hideMessage,
      showAuthLoader,
      userFacebookSignIn,
      userGoogleSignIn,
      userGithubSignIn,
      userTwitterSignIn,
      registrarUsuario
    }
  )(SignUp)
);
