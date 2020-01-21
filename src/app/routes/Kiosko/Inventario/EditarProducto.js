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
    const { producto, firestore } = this.props;
    if (!producto || !firestore) return <Spinner />;
    console.log("consulta producto:",producto)

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Editar Producto" />
        <FormProducto 
        producto={producto} 
        actionSubmit={this.handleEditProducto}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ firestore: { ordered }, firestore }) => ({
  producto: ordered.producto && ordered.producto[0],
  firestore: firestore && firestore
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
        storeAs: "producto",
        doc: props.match.params.id
      }
    ])
  )(EditarProducto)
);
