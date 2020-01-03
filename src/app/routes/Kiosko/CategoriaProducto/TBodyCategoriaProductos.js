import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import SweetAlertEliminar from './SweetAlertEliminar';
import Save from '@material-ui/icons/Save';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditIcon from '@material-ui/icons/Edit';

const TBodyCategoriaProductos = ({categoria_producto, history}) => {

    const handleRedirectEdit = (id) => {
      history.push(`editarCategoriaProducto/`+id);
    }

    // const [alertConfirm, setAlertConfirm] = React.useState(false);
    // const [alertOK, setAlertOK] = React.useState(false);

    return ( 
        categoria_producto && categoria_producto.map(categoriaProducto => (
            <tr key={categoriaProducto.id}>
            <td>{categoriaProducto.nombre}</td>
            <td>{categoriaProducto.descripcion}</td>
            <td><label className={`text-white p-1 ${categoriaProducto.estado ? 'bg-success' : 'bg-danger'}`} >{categoriaProducto.estado ? 'ACTIVO' : 'INACTIVO'}</label></td>
            <td>
                <Button 
                
                className="bg-warning text-white" 
                onClick={() => handleRedirectEdit(categoriaProducto.id)} 
                startIcon={<EditIcon/>}
                variant="contained"  
                type="submit"
                >
                  Editar
                </Button>
              </td>
              <td>
                <SweetAlertEliminar id={categoriaProducto.id}/>
              </td>
            </tr>
        ))
     );
}
 
export default withRouter(TBodyCategoriaProductos);