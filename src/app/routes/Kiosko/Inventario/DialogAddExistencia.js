import React, { Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Redux
import { updateProducto } from "actions/productosActions";
import { createCompra } from "actions/ComprasActions";
//Dialog
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Spinner from "components/Spinner/Spinner";

const FormDialog = ({ history, producto, firestore, createCompra, updateProducto }) => {
  const [open, setOpen] = React.useState(false);
  const [existencia, setExistencia] = React.useState("");
  const [precioCompra, setPrecioCompra] = React.useState("");
  const [total, setTotal] = React.useState("");
  //Errores
  const [errorExistencia, setErrorExistencia] = React.useState(false);
  const [errorPrecioCompra, setErrorPrecioCompra] = React.useState(false);
  const [errorTotal, setErrorTotal] = React.useState(false);

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
  const handleError = (error, e )=> {
    if(e.target.name == "existencia"){
      setExistencia(e.target.value);
      setErrorExistencia(error);
    }
    if(e.target.name == "precio_compra"){
      setPrecioCompra(e.target.value);
      setErrorPrecioCompra(error);
    }
    if(e.target.name == "total"){
      setTotal(e.target.value);
      setErrorTotal(error);
    }
  };
  //TextField
  const handleValidation = e => {
    if (e.target.value > 0) {
      handleError(false, e);
    } else {
      handleError(true, e);
    }
  };

  const handleBtnAgregar = async e => {
    e.preventDefault();
    if (existencia > 0 && total>0) {
      let editProducto = { ...producto };
      editProducto.existencia += existencia;

      const compra = {
        id_producto: producto.id,
        cantidad: existencia,
        precio_compra: precioCompra ? precioCompra.toFixed(2) : "",
        total: total.toFixed(2)
      };

      await updateProducto(editProducto)
        .then(async () => {
          await createCompra(compra);
        })
        .then(async () => {
          await setOpen(false);
          await setExistencia("");
        }).then(async () => {
          await history.push("/app/compras")
        });
    } else {
      if(!existencia > 0){
      setErrorExistencia(true);
      }
      if(!total > 0){
      setErrorTotal(true);
      }
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
        <DialogTitle id="form-dialog-title">Agregar una Compra</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estas a punto de realizar un compra de productos.
            La cantidad que ingreses se agregar a la cantidad existente en el
            inventario
          </DialogContentText>
          <TextField
           autoFocus
            required
            error={errorExistencia}
            helperText={errorExistencia ? "La cantidad debe ser mayor a cero" : ""}
            margin="dense"
            type="number"
            inputProps={{ min: "1", step: "1" }}
            name="existencia"
            label="Existencia"
            variant="outlined"
            value={existencia}
            onChange={handleValidation}
            fullWidth
          />
          <TextField
            error={errorPrecioCompra}
            helperText={errorPrecioCompra ? "El precio debe ser mayor a cero" : ""}
            margin="dense"
            type="number"
            inputProps={{ min: "0.01", step: "0.01" }}
            name="precio_compra"
            label="Precio Unitario de Compra"
            variant="outlined"
            value={precioCompra}
            onChange={handleValidation}
            fullWidth
          />
          <TextField
            required
            error={errorTotal}
            helperText={errorTotal ? "El total debe ser mayor a cero" : ""}
            margin="dense"
            type="number"
            inputProps={{ min: "0.01", step: "0.01" }}
            name="total"
            label="Total"
            variant="outlined"
            value={total}
            onChange={handleValidation}
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

const mapDispatchToProps = dispatch => {
  return {
    updateProducto: async producto => dispatch(updateProducto(producto)),
    createCompra: async compra => dispatch(createCompra(compra))
  };
};

export default withRouter(
  compose(
    connect(
      null,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(FormDialog)
);
