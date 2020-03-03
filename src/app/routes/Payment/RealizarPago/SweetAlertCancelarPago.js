import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
//Dialog
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from '@material-ui/core';
//Redux
import {cancelarCuota} from "actions/realizarPagoActions";
//Icons
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';

const SweetAlertCancelarPago = ({id, firestore, cancelarCuota}) => {

    const [alertConfirm, setAlertConfirm] = React.useState(false);
    const [alertOK, setAlertOK] = React.useState(false);

    const handleCancelarPago = async () => {
      await cancelarCuota(id);
    }

    return ( 
        <Fragment>
          <Button className="bg-secondary text-white" onClick={() => setAlertConfirm(true)}  startIcon={<ClearIcon />} variant="contained"  type="submit">
                  Cancelar
          </Button>
            <SweetAlert
            show={alertConfirm}
            warning
            showCancel
            confirmBtnText="Si, deseo cancelarlo!"
            confirmBtnBsStyle="secondary"
            cancelBtnBsStyle="primary"
            title="¿Está seguro de deshacer este pago?"
            onConfirm={() => {
              setAlertConfirm(false);
              setAlertOK(true);
            }}
            onCancel={() => setAlertConfirm(false)}
            focusCancelBtn
          >
            Esta acción cancelará el pago realizado sobre esta cuota
          </SweetAlert>
          <SweetAlert
            show={alertOK}
            success title="Acción realizda con éxito!"
            onConfirm={() => {
              handleCancelarPago();
              setAlertOK(false)
            }}
            onCancel={() => {
              handleCancelarPago();
              setAlertOK(false)
            }}>
            OK!
          </SweetAlert>
        </Fragment>
     );
}

const mapStateToProps = ({ firestore, contribucion, busqueda }) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelarCuota: async (id) => dispatch(cancelarCuota(id)),
  };
};
 
export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(SweetAlertCancelarPago)
);
