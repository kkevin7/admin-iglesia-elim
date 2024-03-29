import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
//Components
import DataTableCompras from "./DataTableCompras";
import Spinner from "components/Spinner/Spinner";
//Form
import Button from "@material-ui/core/Button";
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class Compras extends Component {
  state = {};

  redirectGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { compras, busqueda } = this.props;
    if (!compras) return <Spinner />;
    let comprasBusqueda = [];

    if (busqueda) {
      comprasBusqueda = compras.filter(com =>
        com.id_producto.toLowerCase().includes(busqueda) ||
        com.cantidad.toString().includes(busqueda) ||
        com.precio_compra.toFixed(2).toString().includes(busqueda) ||
        com.total.toFixed(2).toString().includes(busqueda) ||
        (com.fecha ? moment(com.fecha.toDate()).format("LLL") : "").toLowerCase().includes(busqueda)
      );
    }

    return (
      <div className="app-wrapper">
        <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <h2 className="title mb-3 mb-sm-0">Compras de Productos</h2>
          <Button
            variant="contained"
            className="my-1 bg-cyan text-white"
            startIcon={<ArrowBackIcon />}
            onClick={() => this.redirectGoBack()}
          >
            VOLVER
          </Button>
        </div>
        <DataTableCompras compras={busqueda ? comprasBusqueda : compras} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    compras: firestore.ordered.compras
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect([
      {
        collection: "compras",
        orderBy: [["fecha", "desc"]]
      }
    ])
  )(Compras)
);
