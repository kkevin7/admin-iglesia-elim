import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CardDetalle from "./CardDetalle";
//Redux
import { buscarProducto } from "actions/productosActions";

class DetalleProducto extends Component {
  state = {};

  componentDidMount() {
    const { buscarProducto } = this.props;
    buscarProducto(this.props.match.params.id);
  }

  render() {
    const { producto } = this.props;

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Detalles sobre el producto"
        />

        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <CardDetalle producto={producto} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, producto }) => ({
  // producto: firestore.ordered.producto && firestore.ordered.producto[0],
  producto: producto.producto
});

const mapDispatchToProps = dispatch => {
  return {
    buscarProducto: async id => dispatch(buscarProducto(id))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(
      props => {
        if (!props.match.params.id) return [];
        return [
          {
            collection: "productos",
            doc: props.match.params.id,
            storeAs: "producto",
          }
        ]
      }
    )
  )(DetalleProducto)
);
