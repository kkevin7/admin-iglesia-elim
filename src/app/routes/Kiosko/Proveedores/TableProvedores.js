import React from 'react';
import TBodyProveedores from './TBodyProveedores';

const TableProveedores = ({proveedores}) => {
    return ( 
        <div className="table-responsive">
            <table className="table table-bordered table-striped table-inverse">
              <thead className="thead-inverse">
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Empresa</th>
                  <th className="text-center" >Estado</th>
                  <th colSpan="2" className="text-center">Acciones</th>
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