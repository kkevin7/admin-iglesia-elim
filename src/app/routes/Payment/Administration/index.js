import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ContainerHeader from 'components/ContainerHeader/index';

class PaymentAdministration extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title="Administración de Pagos"/>
            </div>
        );
    }
}

export default withRouter(PaymentAdministration);