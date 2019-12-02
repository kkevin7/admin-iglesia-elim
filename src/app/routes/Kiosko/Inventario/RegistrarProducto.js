import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import ContainerHeader from "components/ContainerHeader/index";
import FormProducto from './FormProducto';

class RegistrarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Registrar productos" />

        <FormProducto/>
      </div>
    );
  }
}

export default withRouter(RegistrarProducto);
