import React, { Component } from "react";
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
import EspecificarFecha from "./EspecificarFecha";
import ProductosColocados from "./ProductosColocados";

class Reportes extends Component {
  state = {
    especificarFecha: false,
    showReport: false,
  };

  handleEspeficiarFecha = (state) => {
    this.setState({
      especificarFecha: state
    })
  }

  handleShowReport = (state) => {
    this.setState({
      showReport: state
    })
  }

  render() {

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
                    onClick={() => {
                      this.handleEspeficiarFecha(false)
                      this.handleShowReport(true)
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
                    onClick={() => {
                      this.handleEspeficiarFecha(false)
                      this.handleShowReport(true)
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
                    onClick={() => {
                      this.handleEspeficiarFecha(false)
                      this.handleShowReport(true)
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
                    onClick={() => {
                      this.handleEspeficiarFecha(false)
                      this.handleShowReport(true)
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
                    onClick={() => {
                      this.handleEspeficiarFecha(false)
                      this.handleShowReport(true)
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
                      this.handleEspeficiarFecha(true)
                      this.handleShowReport(false)
                    }}
                  >
                    Especificar
                  </Button>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        <EspecificarFecha visible={this.state.especificarFecha} />
        <ProductosColocados visible={this.state.showReport}/>
      </div>
    );
  }
}

export default Reportes;
