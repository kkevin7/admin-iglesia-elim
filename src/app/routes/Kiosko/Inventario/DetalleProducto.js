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
import CardDetalle from './CardDetalle';

class DetalleProducto extends Component {
  state = {};
  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Detalles sobre el producto"
        />

        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <CardDetalle/>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default DetalleProducto;
