import React from 'react';
import TBodyProveedores from './TBodyProveedores';

const TableProveedores = ({proveedores}) => {
    return ( 
        <div className="table-responsive">
            <table className="table table-striped table-inverse">
              <thead className="thead-inverse">
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Empresa</th>
                  <th>Estado</th>
                  <th colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <TBodyProveedores proveedores={proveedores}/>
              </tbody>
            </table>
          </div>
     );
}
 
export default TableProveedores;