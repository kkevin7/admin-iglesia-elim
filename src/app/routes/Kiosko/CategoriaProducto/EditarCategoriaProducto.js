import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import FormCategoriaProducto from "./FormCategoriaProducto";

class EditarProveedor extends Component {
  state = {};

  editProveedor = editProveedor => {
    const { firestore, history, categoria_producto } = this.props;
    firestore.update({
      collection: 'categoria_producto',
      doc: categoria_producto.id
      }, editProveedor)
      .then(() => history.push("/app/categoriaProductos"));
  };

  render() {
    const {categoria_producto} = this.props;
    if(!categoria_producto || !(categoria_producto.id == this.props.match.params.id)) return <Spinner/>

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Editar Proveedor" />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <FormCategoriaProducto actionForm={this.editProveedor} categoria_producto={categoria_producto} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }, props) => ({
  categoria_producto: firestore.ordered.categoria_producto && firestore.ordered.categoria_producto[0],
  firestore: firestore
});

export default withRouter(
  compose(
    firestoreConnect(props => {
      console.log(props.match.params.id);
      return [
        {
          collection: "categoria_producto",
          storeAs: "categoria_producto",
          doc: props.match.params.id
        }
      ]
    }),
    connect(mapStateToProps),
  )(EditarProveedor)
);
