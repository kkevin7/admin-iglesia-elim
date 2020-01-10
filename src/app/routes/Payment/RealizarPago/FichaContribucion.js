import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import MenuBookIcon from '@material-ui/icons/MenuBook';

const FichaContribucion = ({ contribucion, history }) => {

  const redirectCuota = (id) => {
    history.push(`/app/cuotas/${id}`);
  }

  return (
    <Card>
      <h3 className="card-header font-weight-bold bg-success text-white">
        Datos de la Contribución
      </h3>
      <CardContent>
      <div className="pt-md-3 pl-md-3 pr-md-3 mx-auto">
        <p className="font-weight-bold">
          Valor de la Cuota: {""}
          <span className="font-weight-normal">
            $ {contribucion.valor_cuota}
          </span>
        </p>
        <p className="font-weight-bold">
          Cantidad de Cuotas: {""}
          <span className="font-weight-normal">
            {contribucion.cantidad_cuota}
          </span>
        </p>
        <p className="font-weight-bold">
          Fecha Inicio: {""}
          <span className="font-weight-normal">
            {moment(contribucion.fecha_inicio.toDate()).format("lll")}
          </span>
        </p>
        <p className="font-weight-bold">
          Fecha Fin: {""}
          <span className="font-weight-normal">
            {moment(contribucion.fecha_fin.toDate()).format("lll")}
          </span>
        </p>
        <p className="font-weight-bold">
          Observaciones: {""}
          <span className="font-weight-normal">
            {contribucion.observaciones}
          </span>
        </p>
        <p className="font-weight-bold">
          Estado: {""}
          <span className="font-weight-normal">
            {contribucion.estado ? "ACTIVO" : "INACTIVO"}
          </span>
        </p>
        </div>
      </CardContent>
      <CardActions className="mb-4">
        <Button 
        variant="contained" 
        color="primary" 
        className="bg-cyan mx-auto"
        startIcon={<MenuBookIcon/>}
        onClick={() => {
          redirectCuota(contribucion.id)
          }
        }
        >
          Ver Cuotas
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(FichaContribucion);
