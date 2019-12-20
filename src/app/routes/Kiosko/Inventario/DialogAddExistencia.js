import React, { Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Spinner from "components/Spinner/Spinner";

const FormDialog = ({ producto, firestore }) => {
  const [open, setOpen] = React.useState(false);
  const [existencia, setExistencia] = React.useState("");
  const [error, setError] = React.useState(false);

  if (typeof producto === "undefined")
    return <h3>No se puede agregar existencias</h3>;
  if (!firestore) return <Spinner />;

  //Dialog
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
  //TextField
  const handleExistencia = e => {
    setExistencia(Number(e.target.value));
    if (e.target.value > 0) {
      handleError(false);
    } else {
      handleError(true);
    }
  };

  const handleBtnAgregar = e => {
    e.preventDefault();
    if (existencia > 0) {
      let editProducto = { ...producto };
      editProducto.existencia += existencia;

      firestore
        .update(
          {
            collection: "productos",
            doc: producto.id
          },
          editProducto
        )
        .then(() => {
          setOpen(false);
          setExistencia("");
        });

    } else {
      handleError(true);
      return;
    }
  };

  return (
    <Fragment>
      <Button
        startIcon={<AddIcon />}
        className="btn-block bg-cyan text-white"
        variant="contained"
        onClick={handleClickOpen}
      >
        Agregar Existencias
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar Existencias</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La cantidad que ingreses se agregar a la cantidad existente en el
            inventario
          </DialogContentText>
          <TextField
            required
            error={error}
            helperText={error ? "La cantidad debe ser mayor a cero" : ""}
            autoFocus
            margin="dense"
            type="number"
            inputProps={{ min: "1", step: "1" }}
            name="existencia"
            label="Existencia"
            variant="outlined"
            value={existencia}
            onChange={handleExistencia}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancelar
          </Button>
          <Button
            onClick={handleBtnAgregar}
            color="primary"
            variant="contained"
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default firestoreConnect()(FormDialog);
