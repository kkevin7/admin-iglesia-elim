import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "components/Spinner/Spinner";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import ContentComprobante from "./ContentComprobante";
import PrintComponents from "react-print-components";

class ComprobanteVenta extends Component {
  state = {};
  render() {
    const venta = this.props.venta;
    if (!venta) return <Spinner />;

    return (
      <div className="app-wrapper">
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <div className="col-12">
                {/* <Button variant="contained" 
                className="my-3" 
                color="primary" 
                startIcon={<PrintIcon/>} 
                onClick={mostrarReporte}                
                >
                  IMPRIMIR COMPROBANTE
                </Button> */}
                <PrintComponents
                  trigger={
                    <Button
                      variant="contained"
                      className="my-1"
                      color="primary"
                      startIcon={<PrintIcon />}
                    >
                      IMPRIMIR COMPROBANTE
                    </Button>
                  }
                >
                  <ContentComprobante venta={venta} />
                </PrintComponents>
              </div>
              <ContentComprobante venta={venta} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }, props) => ({
  venta: firestore.ordered.venta && firestore.ordered.venta[0],
  firestore: firestore
});

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "ventas",
        storeAs: "venta",
        doc: props.match.params.id
      }
    ])
  )(ComprobanteVenta)
);
