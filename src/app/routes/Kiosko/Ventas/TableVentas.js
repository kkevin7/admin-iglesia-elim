import React from "react";
import TableBodyVentas from './TableBodyVentas';

const TableVentas = (props) => {
  // console.log(props)
  return (
    
          <div className="table-responsive">
            <table className="table table-striped table-inverse">
              <thead className="thead-inverse">
                <tr>
                  <th>Id de venta</th>
                  <th>Fecha</th>
                  <th>Total cancelado</th>
                  <th>Vendedor</th>
                  <th>Estado</th>
                  <th>Detalles</th>
                  <th>Comprobante</th>
                </tr>
              </thead>
              <tbody>
                <TableBodyVentas props={props} />
              </tbody>
            </table>
          </div>
  );
};

export default TableVentas;
