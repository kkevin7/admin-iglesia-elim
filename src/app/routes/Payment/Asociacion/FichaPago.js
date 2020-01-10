import React from "react";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const FichaPago = ({ pago }) => {
  return (
    <div className="card my-3">
      <Card>
        <h3 className="card-header bg-success text-white">
          Datos de la Contribución
        </h3>
        <CardContent>
          <div className="card-body">
            <p className="font-weight-bold">
              Valor de la Cuota: {""}
              <span className="font-weight-normal">$ {pago.valor_cuota}</span>
            </p>
            <p className="font-weight-bold">
              Cantidad de Cuotas: {""}
              <span className="font-weight-normal">{pago.cantidad_cuota}</span>
            </p>
            <p className="font-weight-bold">
              Fecha Inicio: {""}
              <span className="font-weight-normal">
                {moment(pago.fecha_inicio).format("lll")}
              </span>
            </p>
            <p className="font-weight-bold">
              Fecha Fin: {""}
              <span className="font-weight-normal">
                {moment(pago.fecha_fin).format("lll")}
              </span>
            </p>
            <p className="font-weight-bold">
              Observaciones: {""}
              <span className="font-weight-normal">{pago.observaciones}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FichaPago;
