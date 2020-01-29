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

const CardSocio = ({ socio }) => {
  if (!socio)
    return (
      <Card>
        <div className="card-header py-3 d-flex align-items-center">
          <h3 className="mb-0">
            <span className="text-uppercase">Datos del socio</span>
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
          <span className="text-uppercase">Datos del socio</span>
        </h3>
      </div>
      <CardContent>
            <p className={`font-weight-bold ${socio.id ? "" : "d-none"}`}>
              ID: {""}
              <span className="font-weight-normal">{socio.id ? socio.id : ""}</span>
            </p>
            <p className="font-weight-bold">
              Carnet: {""}
              <span className="font-weight-normal">{socio.carnet ? socio.carnet : ""}</span>
            </p>
            <p className="font-weight-bold">
              Nombre: {""}
              <span className="font-weight-normal">{socio.nombre ? socio.nombre : ""}</span>
            </p>
            <p className="font-weight-bold">
              Apellido: {""}
              <span className="font-weight-normal">{socio.apellido ? socio.apellido : ""}</span>
            </p>
            <p className="font-weight-bold">
              Télefono: {""}
              <span className="font-weight-normal">{socio.telefono ? socio.telefono : ""}</span>
            </p>
            <p className="font-weight-bold">
              Dirección: {""}
              <span className="font-weight-normal">{socio.direccion ? socio.direccion : ""}</span>
            </p>
      </CardContent>
    </Card>
  );
};

export default CardSocio;
