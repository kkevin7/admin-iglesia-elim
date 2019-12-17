import React from 'react';
import { Button } from '@material-ui/core';

const TBodyProveedores = ({proveedores}) => {
    console.log(proveedores)
    return ( 
        proveedores && proveedores.map(proveedor => (
            <tr>
            <td>{proveedor.nombre}</td>
            <td>{proveedor.apellido}</td>
            <td>{proveedor.telefono}</td>
            <td>{proveedor.empresa}</td>
            <td>{proveedor.estado ? 'ACTIVO' : 'INACTIVO'}</td>
            <td>
                <Button className="bg-warning text-white" value={proveedor.id} variant="contained"  type="submit">
                  Editar
                </Button>
              </td>
              <td>
              <Button className="bg-danger text-white" value={proveedor.id} variant="contained"  type="submit">
                  Eliminar
                </Button>
              </td>
            </tr>
        ))
     );
}
 
export default TBodyProveedores;