import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import FormCategoriaProducto from "./FormCategoriaProducto";

class NuevoCategoriaProducto extends Component {
  state = {};

  createProveedor = nuevoProveedor => {
    const { firestore, history } = this.props;
    firestore.add(
      {
        collection: "categoria_producto"
      },
      nuevoProveedor).then(() => history.push("/app/categoriaProductos"));
  };

  render() {

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Nuevos Proveedor" />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <FormCategoriaProducto actionProveedor={this.createProveedor} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(firestoreConnect()(NuevoCategoriaProducto));
