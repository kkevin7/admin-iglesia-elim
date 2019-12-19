import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import FormProducto from "./FormProducto";

class EditarProducto extends Component {
  state = {};

  handleEditProducto = (editProducto) => {
    // e.preventDefault();
    const { firestore, history, producto } = this.props;
    firestore
      .update(
        {
          collection: "productos",
          doc: producto.id
        },
        editProducto
      )
      .then(() => history.push("/app/detalleProducto/"+producto.id));
  }

  render() {
    const { producto, firestore } = this.props;
    if (!producto || !firestore) return <Spinner />;

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

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "productos",
        storeAs: "producto",
        doc: props.match.params.id
      }
    ])
  )(EditarProducto)
);
