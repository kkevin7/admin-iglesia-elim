import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ContainerHeader from 'components/ContainerHeader/index';

class PaymentAdministration extends Component {
        state = {  };

    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title="Administración de Pagos"/>
                <div className="col-md-6 col-12">
                </div>
            </div>
        );
    }
}

export default withRouter(PaymentAdministration);