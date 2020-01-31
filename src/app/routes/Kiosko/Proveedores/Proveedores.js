import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Form
import { Button } from "@material-ui/core";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import TableProveedores from "./TableProvedores";
import SweetAlertEliminar from "./SweetAlertEliminar";
import DataTableProveedores from "./DataTableProveedores";

class Proveedores extends Component {
  state = {};

  render() {
    const { proveedores, busqueda } = this.props;
    if (!proveedores) return <Spinner />;
    let proveedoresBusqueda = [];

    if (busqueda) {
      proveedoresBusqueda = proveedores.filter(
        prov =>
          prov.nombre.toLowerCase().includes(busqueda) ||
          prov.apellido.toLowerCase().includes(busqueda) ||
          prov.telefono.toLowerCase().includes(busqueda) ||
          prov.empresa.toLowerCase().includes(busqueda) ||
          (prov.estado ? "ACTIVO" : "INACTIVO").toLowerCase().includes(busqueda)
      );
    }

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
                to="/app/nuevoProveedor"
              >
                <FontAwesomeIcon icon={faPlus} />{" "}
                <span className="nav-text">Nuevo Proveedor</span>
              </NavLink>

              {/* <TableProveedores proveedores={proveedores} /> */}
              <DataTableProveedores
                proveedores={busqueda ? proveedoresBusqueda : proveedores}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    proveedores: firestore.ordered.proveedores
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "proveedores" }])
  )(Proveedores)
);
