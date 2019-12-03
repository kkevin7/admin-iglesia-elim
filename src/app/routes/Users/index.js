import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

class Users extends Component {
  state = {};
  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Usuarios del Sistema"
        />
      </div>
    );
  }
}

export default withRouter(Users);
