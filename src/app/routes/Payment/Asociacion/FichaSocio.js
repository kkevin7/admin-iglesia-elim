import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const FichaSocio = ({ socio }) => {
  return (
    <div className="card my-3">
      <Card>
        <h3 className="card-header bg-primary text-white">Datos del Socio</h3>
        <CardContent>
          <div className="card-body">
            {/* <p className="font-weight-bold">
              ID: {""}
              <span className="font-weight-normal">{socio.id ? socio.id : ""}</span>
            </p> */}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FichaSocio;
