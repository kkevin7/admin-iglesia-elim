import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//Inputs
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const currencies = [
  {
    value: "1",
    label: "GRANDE"
  },
  {
    value: "2",
    label: "MEDIANO"
  },
  {
    value: "3",
    label: "PEQUEÑO"
  }
];

const FormProducto = () => {
  const [currency, setCurrency] = React.useState("1");
  const handleChange = event => {
    setCurrency(event.target.value);
  };

  return (
    <div className="row mb-md-3">
      <div className="col-lg-12">
        <div className="jr-card">
          <div class="jr-card-header ">
            <h3 class="card-heading">
              <h1>DATOS DEL PRODUCTO</h1>
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
                          image={require("assets/images/products/product1.png")}
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
                          label="Nombre"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          id="outlined-required"
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          label="Costo"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          id="outlined-required"
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          label="Precio"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          id="outlined-required"
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          label="Descuento"
                          defaultValue="0.0"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          id="outlined-select-currency"
                          select
                          label="Tipo de Producto"
                          value={currency}
                          onChange={handleChange}
                          helperText="Selecciona el tipo de producto"
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
                    <div className="col-md-8 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          id="outlined-multiline-static"
                          label="Descripción"
                          multiline
                          rows="4"
                          defaultValue=""
                          variant="outlined"
                        />
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

export default withRouter(FormProducto);
