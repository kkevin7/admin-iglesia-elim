import React, { Component } from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class Users extends Component {
    state = {  }
    render() {
        return (
            <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="Usuarios del Sistema"/>}/>
        <div className="d-flex justify-content-center">
        </div>
      </div>
        );
    }
}

export default Users;