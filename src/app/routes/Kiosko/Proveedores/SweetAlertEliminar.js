import React, {Fragment} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter, NavLink } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

const SweetAlertEliminar = ({id, firestore}) => {

    const [alertConfirm, setAlertConfirm] = React.useState(false);
    const [alertOK, setAlertOK] = React.useState(false);

    const handleEliminar = async () => {
      const response = await firestore.delete({
        collection: 'proveedores',
        doc: id
      })
      return response;
    }

    return ( 
        <Fragment>
          <Button className="bg-danger text-white" onClick={() => setAlertConfirm(true)}  startIcon={<DeleteIcon />} variant="contained"  type="submit">
                  Eliminar
          </Button>
            <SweetAlert
            show={alertConfirm}
            warning
            showCancel
            confirmBtnText="Si, deseo eliminarlo!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="primary"
            title="¿Está seguro de eliminar este registro?"
            onConfirm={() => {
              setAlertConfirm(false);
              setAlertOK(true);
            }}
            onCancel={() => setAlertConfirm(false)}
            focusCancelBtn
          >
            Esta acción es irreversible y no se podrá recuperar el registro
          </SweetAlert>
          <SweetAlert
            show={alertOK}
            success title="Acción realizda con éxito!"
            onConfirm={() => {
              handleEliminar();
              setAlertOK(false)
            }}
            onCancel={() => {
              handleEliminar();
              setAlertOK(false)
            }}>
            OK!
          </SweetAlert>
        </Fragment>
     );
}
 
export default  withRouter(firestoreConnect()(SweetAlertEliminar));