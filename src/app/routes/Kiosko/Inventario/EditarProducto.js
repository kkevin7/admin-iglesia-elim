import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Redux
import { updateProducto, updateProductoImg } from "actions/productosActions";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import FormProducto from "./FormProducto";

class EditarProducto extends Component {
  state = {};

  handleEditProducto = async (producto) => {
    const { history, updateProducto, updateProductoImg } = this.props;

    if(producto.file){
      await updateProductoImg(producto).then(() => history.push("/app/inventario"));
    }else{
      await updateProducto(producto).then(() => history.push("/app/inventario"));
    }
  }

  render() {
    const { producto, proveedores, categoria_producto, } = this.props;
    if (!producto || !proveedores || !categoria_producto) return <Spinner />;

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Editar Producto" />
        <FormProducto 
        producto={producto} 
        proveedores={proveedores}
        categoria_producto={categoria_producto}
        actionSubmit={this.handleEditProducto}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ firestore }) => ({
  producto: firestore.ordered.producto && firestore.ordered.producto[0],
  proveedores: firestore.ordered.proveedores,
  categoria_producto: firestore.ordered.categoria_producto,
});

const mapDispatchToProps = dispatch => {
  return {
    updateProducto: async (producto) => dispatch(updateProducto(producto)),
    updateProductoImg: async (producto) => dispatch(updateProductoImg(producto)),
  };
};


export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
      {
        collection: "productos",
        doc: props.match.params.id,
        storeAs: "producto",
      },
      {
        collection: "categoria_producto",
        where: ["estado", "==", true]
      },
      {
        collection: "proveedores",
        where: ["estado", "==", true]
      }
    ])
  )(EditarProducto)
);
