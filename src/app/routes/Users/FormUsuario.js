import React, { Fragment, useState } from "react";
//Inputs
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

//calendar
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const FormUsuario = () => {
  // SELECT
  const roles = [
    {
      value: "1",
      label: "PASTOR"
    },
    {
      value: "2",
      label: "ADMINISTRACIÓN DE PAGOS"
    },
    {
      value: "3",
      label: "KIOSKO"
    },
    {
      value: "4",
      label: "SOCIO"
    }
  ];
  const [rol, setRol] = React.useState("4");
  const handleChange = event => {
    setRol(event.target.value);
  };

  // DATEPICKER
  let fecha = new Date();
  fecha.setYear(fecha.getFullYear() - 15);
  const [selectedFechaNacimiento, setselectedFechaNacimiento] = React.useState(fecha);
  const handleDateChange = date => {
    setselectedFechaNacimiento(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = {
      rol: rol,
      fecha_nacimiento: selectedFechaNacimiento
    }
    console.log(usuario);
  }

  return (
    <div className="row mb-md-3">
      <div className="col-lg-12">
        <div className="jr-card">
          <div className="jr-card-header ">
            <h3 className="card-heading">
              DATOS DEL USUARIO
            </h3>
          </div>
          <div className="jr-card-body ">
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className="row">
                <div className="col-md-3 col-12">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="210"
                          image={require("assets/images/users/user.png")}
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
                          id="outlined-required"
                          label="Nombres"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          id="outlined-required"
                          label="Apellidos"
                          helperText="Ingresa los Apellidos"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          id="outlined-required"
                          label="Telefono"
                          helperText="Ingresa la numero teléfonico"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Date picker dialog"
                              format="MM/dd/yyyy"
                              value={selectedFechaNacimiento}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          id="outlined-required"
                          label="Correo Eléctronico"
                          helperText="Ingresa el correo eléctronico"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          id="outlined-select-rol"
                          select
                          label="Tipo de usuario"
                          value={rol}
                          onChange={handleChange}
                          helperText="Selecciona el Tipo de Usuario"
                          variant="outlined"
                        >
                          {roles.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
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
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUsuario;
