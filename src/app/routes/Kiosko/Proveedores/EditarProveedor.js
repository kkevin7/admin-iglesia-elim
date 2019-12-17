import React, { Component } from 'react';
import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";

class NuevoProveedor extends Component {
    state = {  }
    render() {
        return (
            <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Editar Proveedor"
        />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              
            </div>
          </div>
        </div>
      </div>
        );
    }
}

export default NuevoProveedor;