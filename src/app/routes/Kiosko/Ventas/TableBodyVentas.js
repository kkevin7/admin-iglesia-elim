import React from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";

const TableBodyVentas = ({ props }) => {
  const { ventas } = props;
  console.log(ventas);
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
          <Button variant="contained" color="primary" type="submit">
            DETALLES
          </Button>
        </td>
        <td>
          <Button className="bg-cyan text-white" variant="contained" type="submit">
            Confirmar
          </Button>
        </td>
      </tr>
    ))
  );
};

export default TableBodyVentas;
