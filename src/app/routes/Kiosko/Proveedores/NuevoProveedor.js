import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import FormProveedor from "./FormProveedor";

class NuevoProveedor extends Component {
  state = {};

  createProveedor = nuevoProveedor => {
    const { firestore, history } = this.props;
    firestore.add(
      {
        collection: "proveedores"
      },
      nuevoProveedor).then(() => history.push("/app/proveedores"));
  };

  render() {
    // if(!firestore) return <Spinner/>
    // console.log(firestore);

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Nuevoss Proveedor" />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <FormProveedor createProveedor={this.createProveedor} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(firestoreConnect()(NuevoProveedor));
