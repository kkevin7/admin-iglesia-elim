import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import TableProveedores from "./TableProvedores";
import { Button } from "@material-ui/core";

class Proveedores extends Component {
  state = {};

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Proveedores de productos"
        />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <NavLink
                className="MuiButtonBase-root MuiButton-root MuiButton-contained my-4 MuiButton-containedPrimary text-white"
                to="/app/proveedores"
              >
                <i className="zmdi zmdi-accounts-list zmdi-hc-fw" />
                <span className="nav-text">Nuevo Proveedor</span>
              </NavLink>

              <TableProveedores />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Proveedores);
