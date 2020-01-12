import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
//Icons
import PrintIcon from "@material-ui/icons/Print";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
//components
import Spinner from "components/Spinner/Spinner";
import DialogPago from "app/routes/Payment/RealizarPago/DialogPago";

const TableCuotas = ({ cuotas, history }) => {
  const btnRedirectComprobante = id => {
    history.push(`/app/comprobanteCuota/${id}`);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-inverse">
        <thead className="thead-inverse">
          <tr>
            <th>Rubro</th>
            <th>Fecha Incio</th>
            <th>Monto</th>
            <th>Código</th>
            <th>Fecha de Pago</th>
            <th>Estado</th>
            <th className="text-center">Acciones</th>
            <th className="text-center">Comprobante</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map((cuota, index) => (
            <tr key={cuota.id}>
              <td>{cuota.rubro}</td>
              <td>{moment(cuota.fecha_inicio.toDate()).format("LL")}</td>
              <td>$ {cuota.valor}</td>
              <td>{cuota.id}</td>
              <td>
                {cuota.fecha_pago
                  ? moment(cuota.fecha_pago.toDate()).format("lll")
                  : ""}
              </td>
              <td>{cuota.estado}</td>
              <td>
                {cuota.estado === "VIGENTE" ? <DialogPago cuota={cuota} /> : ""}
              </td>
              <td>
                {cuota.estado === "PAGADA" ? (
                  <Button
                    startIcon={<PrintIcon />}
                    className="bg-cyan text-white"
                    variant="contained"
                    onClick={() => btnRedirectComprobante(cuota.id)}
                  >
                    GENERAR
                  </Button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(TableCuotas);
