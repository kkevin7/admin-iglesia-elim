import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter, NavLink } from "react-router-dom";

const TBodyProveedores = ({proveedores, history}) => {

    const handleRedirectEdit = (id) => {
      history.push(`editarProveedor/`+id);
    }

    return ( 
        proveedores && proveedores.map(proveedor => (
            <tr key={proveedor.id}>
            <td>{proveedor.nombre}</td>
            <td>{proveedor.apellido}</td>
            <td>{proveedor.telefono}</td>
            <td>{proveedor.empresa}</td>
            <td>{proveedor.estado ? 'ACTIVO' : 'INACTIVO'}</td>
            <td>
                <Button className="bg-warning text-white" onClick={() => handleRedirectEdit(proveedor.id)} variant="contained"  type="submit">
                  Editar
                </Button>
              </td>
              <td>
              <Button className="bg-danger text-white" variant="contained"  type="submit">
                  Eliminar
                </Button>
              </td>
            </tr>
        ))
     );
}
 
export default withRouter(TBodyProveedores);