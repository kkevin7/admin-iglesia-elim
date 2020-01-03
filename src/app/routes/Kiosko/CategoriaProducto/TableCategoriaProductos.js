import React from 'react';
import TBodyCategoriaProductos from './TBodyCategoriaProductos';

const TableCategoriaProductos = ({categoria_producto}) => {
    return ( 
        <div className="table-responsive">
            <table className="table table-striped table-inverse">
              <thead className="thead-inverse">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th colSpan="2" className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <TBodyCategoriaProductos categoria_producto={categoria_producto}/>
              </tbody>
            </table>
          </div>
     );
}
 
export default TableCategoriaProductos;