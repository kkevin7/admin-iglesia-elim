import React, { Fragment } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

const SweetAlertEliminar = ({ id, firestore, history, btnText, btnClass, btnSize, actionComponent }) => {

  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [alertOK, setAlertOK] = React.useState(false);

  const handleEliminar = () => {
    firestore.delete({
      collection: 'productos',
      doc: id
    }).then(() => {
      history.push(`/app/inventario`);
    })
  }

  return (
    <Fragment>
      <Button size={`${typeof btnSize !== 'undefined' ? btnSize : 'small'}`}
        className={`${typeof btnClass !== 'undefined' ? btnClass : "bg-danger text-white"}`}
        onClick={() => setAlertConfirm(true)} startIcon={<DeleteIcon />}
        variant="contained"
      >
        {`${typeof btnText !== 'undefined' ? btnText : 'Eliminar'}`}
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
          if(!actionComponent){
            handleEliminar();
          }else{
            actionComponent(id)
          }
          setAlertOK(false)
        }}
        onCancel={() => {
          if(!actionComponent){
            handleEliminar();
          }else{
            actionComponent(id)
          }
          setAlertOK(false)
        }}>
        OK!
          </SweetAlert>
    </Fragment>
  );
}

export default withRouter(firestoreConnect()(SweetAlertEliminar));