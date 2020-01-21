import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
import { firestoreConnect } from "react-redux-firebase";

import { createProducto, createProductoImg, uploadImageProducto } from "actions/productosActions";
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

  registrarProducto = producto => {
    const { history, createProducto, createProductoImg } = this.props;
    
    if(producto.file){
      createProductoImg(producto).then(() => history.push("/app/inventario"));
    }else{
      createProducto(producto).then(() => history.push("/app/inventario"));
    }
  };

  render() {

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Registrar productos" />
        <FormProducto 
          actionSubmit={this.registrarProducto} 
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
    createProducto: async (producto) => dispatch(createProducto(producto)),
    uploadImageProducto: async (file) => dispatch(uploadImageProducto(file)),
    createProductoImg: async (producto) => dispatch(createProductoImg(producto)),
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
