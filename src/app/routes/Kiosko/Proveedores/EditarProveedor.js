import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import FormProveedor from "./FormProveedor";

class EditarProveedor extends Component {
  state = {};

  editProveedor = editProveedor => {
    const { firestore, history, proveedor } = this.props;
    firestore.update({
      collection: 'proveedores',
      doc: proveedor.id
      }, editProveedor)
      .then(() => history.push("/app/proveedores"));
  };

  render() {
    const {proveedor} = this.props;
    if(!proveedor || !(proveedor.id == this.props.match.params.id)) return <Spinner/>

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Editar Proveedor" />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <FormProveedor actionProveedor={this.editProveedor} proveedor={proveedor} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }, props) => ({
  proveedor: firestore.ordered.proveedor && firestore.ordered.proveedor[0],
  firestore: firestore
});

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "proveedores",
        storeAs: "proveedor",
        doc: props.match.params.id
      }
    ])
  )(EditarProveedor)
);
