import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Form
import { Button } from "@material-ui/core";
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@material-ui/icons/Add';
//Components
import ContainerHeader from "components/ContainerHeader/index";
import TableCategoriaProductos from "./TableCategoriaProductos";
import Spinner from "components/Spinner/Spinner";
import SweetAlertEliminar from './SweetAlertEliminar';
import DataTableCategoriaProducto from "./DataTableCategoriaProducto";

class CategoriaProductos extends Component {
  state = { };

  render() {

    const {categoria_producto} = this.props;
    if(!categoria_producto) return <Spinner/>

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="CategoriaProductos de Productos"
        />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <NavLink
                className="MuiButtonBase-root MuiButton-root MuiButton-contained my-4 MuiButton-containedPrimary text-white"
                to="/app/nuevoCategoriaProducto"
              >
                <FontAwesomeIcon icon={faPlus} />{" "}
              <span className="nav-text">Nueva Categoría</span>
              </NavLink>

              {/* <TableCategoriaProductos categoria_producto={categoria_producto} /> */}
              <DataTableCategoriaProducto categoria_producto={categoria_producto} /> 

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoria_producto: state.firestore.ordered.categoria_producto
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "categoria_producto" }])
  )
  (CategoriaProductos));
