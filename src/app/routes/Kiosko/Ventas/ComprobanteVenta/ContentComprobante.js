import React, { Component, Fragment } from "react";
import moment from "moment";

class ContentComprobante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  render() {
    return (
      <Fragment>
        <div className="col-12 my-4">
          <h1 className="text-center text-uppercase font-weight-bold">
            Comprobante de Venta
          </h1>
        </div>
        <div className="col-12 text-right">
        <p>
            COMPROBANTE: <span className="font-weight-bold">{this.props.venta.id}</span>
          </p>
          <p>
            FECHA: <span className="font-weight-bold">{moment(this.props.venta.fecha_venta.toDate()).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}</span>
          </p>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-inverse">
            <tbody>
              <tr>
                <td className="">Vendedor</td>
                <td className="font-weight-bold">
                  {this.props.venta.vendedor.nombre_vendedor}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-inverse">
            <thead className="thead-inverse">
              <tr className="font-weight-bold">
                <th className="align-middle">ID</th>
                <th className="align-middle">Nombre</th>
                <th className="align-middle">Precio Unitario</th>
                <th className="align-middle">Cantidad</th>
                <th className="align-middle">Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.venta.pedido.map(producto => {
                return (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.cantidad * producto.precio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="col-12 text-right my-1">
            <h2>Total: <span className="font-weight-bold">$ {this.props.venta.total}</span></h2>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ContentComprobante;
