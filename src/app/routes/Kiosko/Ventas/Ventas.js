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

class Ventas extends Component {
    state = {  }
    render() {
        return (
            <div className="app-wrapper">
            <ContainerHeader match={this.props.match} title="Ventas realizadas" />
            {/* <OrderTableCell/> */}
            <EnhancedTable/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      ventas: state.firestore.ordered.ventas
    };
  };

export default withRouter(
    compose(
      connect(mapStateToProps),
      firestoreConnect([{ collection: "ventas" }])
    )
    (Ventas));