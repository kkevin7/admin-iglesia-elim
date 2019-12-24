import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import ContainerHeader from "components/ContainerHeader/index";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "components/Spinner/Spinner";
import ResumenProducto from "./ResumenProducto";

class DetalleVenta extends Component {
  state = {};
  render() {
    const { venta, firestore } = this.props;
    if (!venta || !firestore) return <Spinner />;
    console.log(venta);

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Detalle de la venta" />
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
            <h3 className="card-text text-center mb-4 text-uppercase">Datos del pedido</h3>
              <div className="row">
                <div className="col-12">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <div className="border mb-4 p-4 ">
                    <p className="font-weight-bold">
                      Pedido ID:
                      <span className="font-weight-normal"> {venta.id}</span>
                    </p>
                    <p className="font-weight-bold">
                      Fecha Pedido:
                      <span className="font-weight-normal">
                        {" "}
                        {moment(venta.fecha_venta.toDate()).format("lll")}
                      </span>
                    </p>
                    <p className="font-weight-bold">
                      Vendedor:
                      <span className="font-weight-normal"> {venta.vendedor.nombre}</span>
                    </p>
                    <p className="font-weight-bold">
                      Total:
                      <span className="font-weight-normal">
                        {" "}
                        $ {venta.total}{" "}
                      </span>
                    </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                <h3 className="card-text text-center mb-4 text-uppercase">Productos</h3>
                </div>
                <div className="col-12">
                  <div className="row">
                    {venta.pedido.map(producto => (
                      <div className="col-md-4 col-12" key={producto.id}>
                        <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                          <ResumenProducto
                            key={producto.id}
                            producto={producto}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
  )(DetalleVenta)
);
