import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from 'components/Spinner/Spinner';
import ContainerHeader from 'components/ContainerHeader/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderTableCell from '../../../../components/dashboard/eCommerce/OrderTable';
import EnhancedTable from './EnhancedTable';
import Select from 'react-select';
import ContenidoPedido from './ContenidoPedido';

class RealizarVenta extends Component {
    state = {}
    render() {
        const {productos, vendedor} = this.props;
        if (!productos && !vendedor) return <Spinner />;
        // console.log(this.props)

        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title="Realizar nueva venta" />
                {/* <OrderTableCell/> */}

                <div className="row mb-md-3">
                    <div className="col-lg-12">
                        <div className="jr-card">
                        <h1 className="text-center">Seleccionar Artículos</h1>
                        <ContenidoPedido 
                        productos={productos} 
                        vendedor={vendedor}
                        />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      productos: state.firestore.ordered.productos,
      vendedor: state.firebase.auth
    };
  };

export default withRouter(
    compose(
        connect(mapStateToProps),
        firestoreConnect([
            { 
                collection: "productos",
                where: [ "existencia", ">", 0 ]
            }
        ])
    )(RealizarVenta)
);