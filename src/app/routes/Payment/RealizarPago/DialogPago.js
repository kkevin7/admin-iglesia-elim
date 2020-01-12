import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//icons
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import InputAdornment from "@material-ui/core/InputAdornment";

const DialogPago = ({ cuota, firestore, history }) => {
  const [open, setOpen] = React.useState(false);
  const [valorCuota, setValorCuota] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Error
  const handleError = error => {
    setError(error);
  };
  //Valor Cuota
  const handleValorCuota = e => {
    setValorCuota(Number(e.target.value));
    if (e.target.value == cuota.valor) {
      handleError(false);
    } else {
      handleError(true);
    }
  };

  const handlePagoCuota = e => {
    e.preventDefault();
    if (valorCuota == cuota.valor && cuota.estado === "VIGENTE") {
      const editCuota = {
        saldo_anterior: cuota.saldo_actualizado,
        saldo_actualizado: valorCuota,
        fecha_pago: new Date(),
        estado: "PAGADA"
      };

      firestore
        .update(
          {
            collection: "cuotas",
            doc: cuota.id
          },
          editCuota
        )
        .then(pago => {
          const editContribucion = {
            fecha_ultimo_pago: new Date()
          };
          firestore.update(
            {
              collection: "contribuciones",
              doc: cuota.id_contribucion
            },
            editContribucion
          );
          return pago;
        })
        // .then(pago => {
        //   // setOpen(false);
        //   // setValorCuota("");
        //   // return pago
        // })
        .then(() => {
          history.push(`/app/comprobanteCuota/${cuota.id}`);
        });
    } else {
      handleError(true);
      return;
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AttachMoneyIcon />}
        onClick={handleClickOpen}
      >
        Pagar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Pago de la Cuota</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para asegurarnos de pago se realizará de forma correcta, deberá
            escribir el monto correspondiente a la cuota acordada con el socio
          </DialogContentText>
          <TextField
            required
            error={error}
            helperText={
              error ? "La cantidad debe exacta al valor de la cuota" : ""
            }
            autoFocus
            margin="dense"
            type="number"
            inputProps={{ min: "0.01", step: "0.01", max: cuota.valor }}
            max={cuota.valor}
            name="valorCuota"
            label="Valor de la cuota"
            variant="outlined"
            value={valorCuota}
            onChange={handleValorCuota}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancelar
          </Button>
          <Button
            onClick={e => handlePagoCuota(e)}
            disabled={error}
            color="primary"
            variant="contained"
          >
            REALIZAR PAGO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(firestoreConnect()(DialogPago));
