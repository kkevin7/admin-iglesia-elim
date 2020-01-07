import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
import { firestoreConnect } from "react-redux-firebase";

import { createProducto } from "../../../../actions/productosActions";
//Inputs
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
// cards
import imageDefault from "../../../../assets/images/products/product1.png";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormProducto from "./FormProducto";
import Spinner from "components/Spinner/Spinner";

class RegistrarProducto extends Component {
  state = {};

  createProducto = producto => {
    // this.props.createProducto(this.state)
    // this.props.history.push(`/app/inventario`)

    const { firestore, history, firebase } = this.props;
    const nuevoProducto = {
      nombre: producto.nombre,
      precio: Number(producto.precio),
      existencia: Number(producto.existencia),
      descripcion: producto.descripcion
    };

    // firebase.

    firestore
      .add({ collection: "productos" }, nuevoProducto)
      .then(() => history.push("/app/inventario"));
  };

  render() {

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Registrar productos" />
        <FormProducto 
          actionSubmit={this.createProducto} 
        />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, firebase }) => {
  return {
    firestore: firestore && firestore,
    firebase: firebase && firebase,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProducto: producto => dispatch(createProducto(producto))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(RegistrarProducto)
);
