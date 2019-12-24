import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "components/Spinner/Spinner";

class ConfirmarVenta extends Component {
  state = {};
  render() {
    const { venta, firestore } = this.props;

    if (!venta || !firestore) return <Spinner />;
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Confirmacion de Venta"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => ({
  venta: firestore.ordered.venta && firestore.ordered.venta[0],
  firestore: firestore
});

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "ventas",
        storeAs: "venta",
        doc: props.match.params.id
      }
    ])
  )(ConfirmarVenta)
);
