import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import SweetAlertEliminar from './SweetAlertEliminar';
import Save from '@material-ui/icons/Save';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditIcon from '@material-ui/icons/Edit';

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
            <td className="text-center"><label className={`text-white p-1 ${proveedor.estado ? 'bg-success' : 'bg-danger'}`} >{proveedor.estado ? 'ACTIVO' : 'INACTIVO'}</label></td>
            <td className="text-center">
                <Button 
                className="bg-warning text-white" 
                onClick={() => handleRedirectEdit(proveedor.id)} 
                startIcon={<EditIcon/>}
                variant="contained"  
                type="submit"
                >
                  Editar
                </Button>
              </td>
              <td className="text-center">
                <SweetAlertEliminar id={proveedor.id}/>
              </td>
            </tr>
        ))
     );
}
 
export default withRouter(TBodyProveedores);