import React from "react";
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
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const EspecificarFecha = ({ visible, handleFechas }) => {
  const [fechaInicio, setFechaInicio] = React.useState(new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()));
  const [fechaFin, setFechaFin] = React.useState(new Date());

  if (!visible) return "";

  return (
    <Card className="mt-3">
      <CardContent>
        <div className="col-12">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      required
                      margin="normal"
                      name="fecha_inicio"
                      label="Fecha Inicio"
                      format="dd/MM/yyyy"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      maxDate={new Date()}
                      value={fechaInicio}
                      onChange={e => setFechaInicio(new Date(e.getFullYear(), e.getMonth(), e.getDate()))}
                      fullWidth
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      required
                      margin="normal"
                      name="fecha_fin"
                      label="Fecha Fin"
                      format="dd/MM/yyyy"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      maxDate={new Date()}
                      value={fechaFin}
                      onChange={e => setFechaFin(e)}
                      fullWidth
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="mt-4 col-md-4 col-12">
              <Button 
              startIcon={<PlaylistPlayIcon/>} 
              variant="contained" 
              color="primary" 
              fullWidth
              onClick={async () => await handleFechas({
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
              })}
              >
                GENERAR
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EspecificarFecha;
