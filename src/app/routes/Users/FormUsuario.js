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

//calendar
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

const currencies = [
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

const FormUsuario = () => {
  // SELECT
  const [currency, setCurrency] = React.useState("4");
  const handleChange = event => {
    setCurrency(event.target.value);
  };

  // Calendar
  const [selectedDate, handleDateChange] = useState(new Date());
  // const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

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
            <form noValidate autoComplete="off">
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
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Fecha de Nacimiento"
                          format="dd/MM/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "Fecha de Nacimiento"
                          }}
                          helperText="Ingresa la Fecha de Nacimiento"
                        />
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
                          id="outlined-select-currency"
                          select
                          label="Tipo de usuario"
                          value={currency}
                          onChange={handleChange}
                          helperText="Selecciona el Tipo de Usuario"
                          variant="outlined"
                        >
                          {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
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
