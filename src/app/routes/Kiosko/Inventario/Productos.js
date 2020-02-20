import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import CardProducto from "./CardProducto";
import CircularProgress from "@material-ui/core/CircularProgress";

class BookStore extends Component {
  render() {
    const { productos, busqueda } = this.props;
    if (!productos) return <Spinner />;
    let productosBusqueda = [];

    if (busqueda) {
      productosBusqueda = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(busqueda) ||
        prod.descripcion.toLowerCase().includes(busqueda) ||
        prod.existencia.toString().includes(busqueda) ||
        prod.precio.toFixed(2).includes(busqueda) 
      );
    }

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Quiosco" />
        <div className="jr-entry-header">
          <h3 className="entry-heading">
            <span>Productos del Quiosco</span>
          </h3>
        </div>
        <div className="row mb-md-3">
          {busqueda ?
            productosBusqueda &&
            productosBusqueda.map(producto => {
              return <CardProducto key={producto.id} producto={producto} />;
            })
          : productos &&
            productos.map(producto => {
              return <CardProducto key={producto.id} producto={producto} />;
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    productos: firestore.ordered.productos
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "productos" }])
  )(BookStore)
);
