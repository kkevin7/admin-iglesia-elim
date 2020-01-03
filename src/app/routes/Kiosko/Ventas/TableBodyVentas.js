import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Button from "@material-ui/core/Button";
import PrintIcon from '@material-ui/icons/Print';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const TableBodyVentas = ({ props, history }) => {
  const { ventas } = props;

  const btnRedirectDetalle = (id) => {
    history.push(`/app/detalleVenta/${id}`);    
  }

  const btnRedirectComprobante = (id) => {
    history.push(`/app/comprobanteVenta/${id}`);
  }
  
  return (
    ventas &&
    ventas.map(venta => (
      <tr key={venta.id}>
        <td>{venta.id}</td>
        <td>{moment(venta.fecha_venta.toDate()).format("lll")}</td>
        <td>$ {venta.total}</td>
        <td>{(!venta.vendedor)? '': venta.vendedor.nombre}</td>
        <td >{venta.estado}</td>
        <td>
          <Button 
          startIcon={<FormatListBulletedIcon/>}
          onClick={() => btnRedirectDetalle(venta.id)}
          value={venta.id}
          variant="contained" 
          color="primary" 
          >
            DETALLES
          </Button>
        </td>
        <td>
          <Button 
          startIcon={<PrintIcon/>}
          className="bg-cyan text-white" 
          variant="contained" 
          onClick={() => btnRedirectComprobante(venta.id)}
          >
            GENERAR
          </Button>
        </td>
      </tr>
    ))
  );
};

export default withRouter(TableBodyVentas);
