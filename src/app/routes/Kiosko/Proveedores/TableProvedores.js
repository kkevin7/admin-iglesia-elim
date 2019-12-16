import React from 'react';
import TBodyProveedores from './TBodyProveedores';

const TableProveedores = () => {
    return ( 
        <div className="table-responsive">
            <table className="table table-striped table-inverse">
              <thead className="thead-inverse">
                <tr>
                  <th>Id Proveedor</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Empresa</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <TBodyProveedores/>
              </tbody>
            </table>
          </div>
     );
}
 
export default TableProveedores;