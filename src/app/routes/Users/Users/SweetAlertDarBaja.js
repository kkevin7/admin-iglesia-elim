import React, { Fragment } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Button } from "@material-ui/core";
//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

//redux
import { darBajaUser, reactivarUser } from "actions/authActions";

const SweetAlertDarBaja = ({
  id,
  estado,
  history,
  btnText,
  btnClass,
  btnSize,
  darBajaUser,
  reactivarUser,
}) => {
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [alertOK, setAlertOK] = React.useState(false);

  const handleEliminar = () => {
    if (estado) {
      darBajaUser(id);
    } else {
      reactivarUser(id);
    }
  };

  return (
    <Fragment>
      <Button
        size={`${typeof btnSize !== "undefined" ? btnSize : "small"}`}
        className={`${
          typeof btnClass !== "undefined" ? btnClass : "bg-danger text-white"
        }`}
        onClick={() => setAlertConfirm(true)}
        startIcon={estado ? <CloseIcon /> : <CheckIcon />}
        variant="contained"
      >
        {`${typeof btnText !== "undefined" ? btnText : "Eliminar"}`}
      </Button>
      <SweetAlert
        show={alertConfirm}
        warning
        showCancel
        confirmBtnText="Si, deseo continuar!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="primary"
        title={`${estado ? "¿Está seguro de bloquear este usuario?" : "¿Está seguro de reactivar este usuario?"}`}
        onConfirm={() => {
          setAlertConfirm(false);
          setAlertOK(true);
        }}
        onCancel={() => setAlertConfirm(false)}
        focusCancelBtn
      >
        {`${estado ? "Este usuario ya no podra podrá ser utilizado en el sistema" : "Ahora este usuario podrá ser utilizado en el sistema"}`}
      </SweetAlert>
      <SweetAlert
        show={alertOK}
        success
        title="Acción realizda con éxito!"
        onConfirm={() => {
          handleEliminar();
          setAlertOK(false);
        }}
        onCancel={() => {
          handleEliminar();
          setAlertOK(false);
        }}
      >
        OK!
      </SweetAlert>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    darBajaUser: async id => dispatch(darBajaUser(id)),
    reactivarUser: async id => dispatch(reactivarUser(id))
  };
};

export default withRouter(
  compose(
    connect(
      null,
      mapDispatchToProps
    )
  )(SweetAlertDarBaja)
);
