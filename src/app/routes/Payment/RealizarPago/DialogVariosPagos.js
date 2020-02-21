import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Redux
import { realizarPagoCuota } from "actions/realizarPagoActions";
import { buscarContribucionAndSocio, finalizarContribucion } from "actions/contribucionesActions";

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
import Typography from "material-ui/styles/typography";

const DialogPago = ({
  cuotas,
  contribucion,
  firestore,
  history,
  realizarPagoCuota,
  finalizarContribucion,
  estadoContribucion,
  limpairSeleccionados,
  countPagadas,
  totalCantidadCuotas,
}) => {
  const [open, setOpen] = React.useState(false);
  const [valorCuota, setValorCuota] = React.useState("");
  const [error, setError] = React.useState(false);

  const totalSumaCuotas = cuotas.reduce((total, c) => {
    return total + c.valor;
  }, 0);

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

  const handleMultiplePagos = async (e) => {
    e.preventDefault();
    cuotas.forEach(cuota => {
      handlePagoCuota(cuota);
    })
    if (countPagadas + cuotas.length == totalCantidadCuotas) {
      contribucion.estado = false;
      const id_contribucion = cuotas[0].id_contribucion;
      await finalizarContribucion(id_contribucion);
    }
  }

  const handlePagoCuota = async (cuota) => {
    if (cuota.valor && cuota.estado === "VIGENTE") {
      const editCuota = {
        id: cuota.id,
        id_contribucion: cuota.id_contribucion,
        saldo_anterior: cuota.saldo_actualizado,
        saldo_actualizado: cuota.valor,
        estado_contribucion:
          estadoContribucion != null ? estadoContribucion : true
      };

      await realizarPagoCuota(editCuota)
      .then(async () => {
        await handleClose();
      }).then(async () => {
        await limpairSeleccionados()
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
        REALIZAR VARIOS PAGOS
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Multiples Pagos de la Cuotas
        </DialogTitle>
        <DialogContent>
          <h2 className="text-center">
            Cantidad de cuotas :{" "}
            <span className="font-weight-bold bg-cyan text-white px-3 p-1">
              {cuotas.length}
            </span>
          </h2>
          <h2 className="text-center">
            Total a cancelar:{" "}
            <span className="font-weight-bold bg-green text-white p-1">
              $ {totalSumaCuotas.toFixed(2)}
            </span>
          </h2>
          <DialogContentText>
            Deberás confirmar cuando el monto de la cuota sea recibida
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancelar
          </Button>
          <Button
            onClick={e => handleMultiplePagos(e)}
            disabled={error}
            color="primary"
            variant="contained"
          >
            CONFIRMAR PAGO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ contribucion }) => {
  return {
    contribucion: contribucion.contribucion && contribucion.contribucion,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    realizarPagoCuota: async editCuota => dispatch(realizarPagoCuota(editCuota)),
    finalizarContribucion: async (id) => dispatch(finalizarContribucion(id)),
    buscarContribucionAndSocio: async busqueda =>
      dispatch(buscarContribucionAndSocio(busqueda)),
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(DialogPago)
);
