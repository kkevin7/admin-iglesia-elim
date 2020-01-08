import React, { Component } from "react";
import moment from 'moment';

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import { MDBDataTable } from "mdbreact";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import PrintIcon from '@material-ui/icons/Print';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const newFormat = (contribuciones) => {
  console.log(contribuciones);
 
  var tbody = contribuciones.map(contribucion => {
    console.log(moment(contribuciones.fecha_fin).format('LLL'))
    return {
      cantidad_cuota: contribucion.cantidad_cuota,
      estado: contribucion.estado ? 'ACTIVO' : 'INACTIVO',
      fecha_fin: moment(contribucion.fecha_fin.toDate()).format('LLL'),
      fecha_inicio: moment(contribucion.fecha_inicio.toDate()).format('LLL'),
      fecha_ultimo_pago: moment(null).format('LLL'),
      id: contribucion.id,
      id_usuario: contribucion.id_usuario,
      observaciones: contribucion.observaciones,
      saldo: contribucion.saldo,
      valor_cuota: contribucion.valor_cuota,
      detalle: <Button 
      startIcon={<FormatListBulletedIcon/>}
      variant="contained" 
      color="primary" 
      >
        DETALLES
      </Button>
    };
  })
  return tbody;
}

const TableMBContribuciones = ({ contribuciones }) => {
  
  const newRows= newFormat(contribuciones);

  const data = {
    columns: [
      {
        label: "ID SOCIO",
        field: "id_usuario",
        sort: "asc",
        width: 150
      },
      {
        label: "Valor de Cuota",
        field: "valor_cuota",
        sort: "asc",
        width: 270
      },
      {
        label: "Cantidad de Cuotas",
        field: "cantidad_cuota",
        sort: "asc",
        width: 200
      },
      {
        label: "Fecha Inicio",
        field: "fecha_inicio",
        sort: "asc",
        width: 100
      },
      {
        label: "Fecha Fin",
        field: "fecha_fin",
        sort: "asc",
        width: 150
      },
      {
        label: "Estado",
        field: "estado",
        sort: "asc",
        width: 100
      },
      {
        label: "Acciones",
        field: "detalle",
        sort: "asc",
        width: 100
      }
    ],
    rows: newRows
  };

  console.log(data);

  return (
    <Card>
      <div className="table-responsive">
        <CardContent>
          <MDBDataTable striped bordered hover responsive data={data} />
        </CardContent>
      </div>
    </Card>
  );
};

export default TableMBContribuciones;