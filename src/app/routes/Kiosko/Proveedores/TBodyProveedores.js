import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import SweetAlertEliminar from './SweetAlertEliminar';
import DeleteIcon from '@material-ui/icons/Delete';
import SweetAlert from 'react-bootstrap-sweetalert';

const TBodyProveedores = ({proveedores, history}) => {

    const handleRedirectEdit = (id) => {
      history.push(`editarProveedor/`+id);
    }

    // const [alertConfirm, setAlertConfirm] = React.useState(false);
    // const [alertOK, setAlertOK] = React.useState(false);

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
                <SweetAlertEliminar id={proveedor.id}/>
              </td>
            </tr>
        ))
     );
}
 
export default withRouter(TBodyProveedores);