import React, { Component } from 'react';
import ContainerHeader from 'components/ContainerHeader/index';

class RegistrarProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title="Registrar productos"/>

                
                    
            </div>
        );
    }
}

export default RegistrarProducto;