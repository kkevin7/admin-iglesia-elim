import React from "react";

const TableVentas = () => {
  return (
    <div className="row mb-md-3">
      <div className="col-lg-12">
        <div className="jr-card">
          <div className="table-responsive">
            <table className="table table-striped table-inverse table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th>Id de venta</th>
                  <th>Fecha</th>
                  <th>Total cancelado</th>
                  <th>vendedor</th>
                  <th>Estado</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableVentas;
