import React, { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Inputs
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// cards
import imageDefault from "../../../../assets/images/products/product1.png";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Spinner from "components/Spinner/Spinner";
import SweetAlertEliminar from './SweetAlertEliminar';
import DialogAddExistencia from './DialogAddExistencia';

const CardDetalle = ({ producto, history }) => {
  if (!producto) return <Spinner />;

  const handleRedirectEdit = () => {
    history.push(`/app/editarProducto/${producto.id}`);
  }

  let classExistencia = `mt-2 badge text-uppercase text-white `;
  if (producto.existencia > 5) {
    classExistencia += "bg-success";
  }
  if (producto.existencia <= 5 && producto.existencia > 0) {
    classExistencia += "bg-warning";
  }
  if (producto.existencia < 1) {
    classExistencia += "bg-danger";
  }

  return (
    <Fragment>
      <div className="jr-card-header ">
        <h3 className="card-heading font-weight-bold text-center">
          DATOS DEL PRODUCTO
        </h3>
      </div>
      <div className="jr-card-body ">
        <form
          // noValidate
          autoComplete="off"
        >
          <div className="row">
            <div className="col-md-3 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="210"
                      image={imageDefault}
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                </Card>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  my-2">
                <div className="col-md-6 col-12 my-2">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <h4>
                      <span className="font-weight-bold">Nombre:</span> {""}
                      {producto.nombre}
                    </h4>
                  </div>
                </div>
                <div className="col-md-6 col-12 my-2">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <h4>
                      <span className="font-weight-bold">Precio:</span> {"$ "}
                      {producto.precio}
                    </h4>
                  </div>
                </div>
                <div className="col-md-6 col-12 my-2">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <h4>
                      <span className={`font-weight-bold`}>Existencia:</span>{" "}
                      {""}
                      {producto.existencia}
                    </h4>
                  </div>
                </div>
                <div className="col-md-12 col-12 my-2">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <h4>
                      <span className="font-weight-bold">Descripcion:</span>{" "}
                      {""}
                      {producto.descripcion}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-12">
              <div className="row  my-2">
                <div className="col-12 my-2">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    {/* <Button startIcon={<AddIcon/>} className="btn-block bg-cyan text-white" variant="contained" >sddAgregar Existencia</Button> */}
                    <DialogAddExistencia producto={producto}/>
                  </div> 
                </div>
                <div className="col-12 my-2">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <Button 
                    startIcon={<EditIcon/>} 
                    className="btn-block bg-warning text-white" 
                    variant="contained" 
                    onClick={handleRedirectEdit}
                    >Editar Producto</Button>
                  </div>
                </div>
                <div className="col-12 my-2">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <SweetAlertEliminar 
                    id={producto.id}
                    btnSize="medium" 
                    btnText="Eliminar Producto" 
                    btnClass="btn-block bg-danger text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ firestore }) => ({
  producto: firestore.ordered.producto && firestore.ordered.producto[0],
  firestore: firestore
});

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "productos",
        storeAs: "producto",
        doc: props.match.params.id
      }
    ])
  )(CardDetalle)
);
