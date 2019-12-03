import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ContainerHeader from "components/ContainerHeader/index";
import FormUsuario from './FormUsuario';

class RegistrarUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Registrar nuevo usuario"
        />
        <FormUsuario/>

      </div>
    );
  }
}

export default withRouter(RegistrarUsuario);
