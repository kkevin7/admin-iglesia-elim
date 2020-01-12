import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
//Card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
//Components
import Spinner from "components/Spinner/Spinner";

const CardContribucion = ({ contribucion }) => {
  if (!contribucion)
    return (
      <Card>
        <div className="card-header py-3 d-flex align-items-center">
          <h3 className="mb-0">
            <span className="text-uppercase">Contribución</span>
          </h3>
        </div>
        <CardContent>
          <Typography variant="h6" className="text-uppercase">
            {" "}
            No hay registros
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <div className="card-header py-3 d-flex align-items-center">
        <h3 className="mb-0">
          <span className="text-uppercase">Contribución</span>
        </h3>
      </div>
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
    </Card>
  );
};

export default CardContribucion;
