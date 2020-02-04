import React, { Fragment } from 'react';
import moment from 'moment';

const ContentOneCuota = ({ cuota }) => {
  return (
    <Fragment>
      <div className="col-12 my-4">
        <h1 className="text-center text-uppercase font-weight-bold">
          Comprobante de Pago
          </h1>
      </div>
      <div className="col-12">
        <div className="row">
        <div className="col-md-6 col-12">
            <p className="text-left">
              CONTRIBUCIÓN: <span className="font-weight-bold">{cuota.id_contribucion}</span>
            </p>
          </div>
          <div className="col-md-6 col-12">
            <p className=" text-right">
              COMPROBANTE: <span className="font-weight-bold">{cuota.id}</span>
            </p>
          </div>
          <div className="col-md-12 col-12">
            <p className=" text-right">
              FECHA: <span className="font-weight-bold">{moment(cuota.fecha_pago.toDate()).format("LLL")}</span>
            </p>
          </div>
        </div>

      </div>
      {/* <div className="table-responsive">
          <table className="table table-striped table-inverse">
            <tbody>
              <tr>
                <td className="">Vendedor</td>
                <td className="font-weight-bold">
                  {cuota.venta.vendedor.nombre_vendedor}
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      <div className="table-responsive">
        <table className="table table-striped table-inverse">
          <thead className="thead-inverse">
            <tr className="font-weight-bold">
              <th>Rubro</th>
              <th>Fecha Incio</th>
              <th>Monto</th>
              <th>Código</th>
              <th>Fecha de Pago</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {/* {cuota.map((pago, index) => ( */}
            <tr key={cuota.id}>
              <td>{cuota.rubro}</td>
              <td>{moment(cuota.fecha_inicio.toDate()).format("LL")}</td>
              <td>$ {cuota.valor}</td>
              <td>{cuota.id}</td>
              <td>
                {cuota.fecha_pago
                  ? moment(cuota.fecha_pago.toDate()).format("lll")
                  : ""}
              </td>
              <td>{cuota.estado}</td>
            </tr>
            {/* ) */}
            {/* )} */}
          </tbody>
        </table>
        <div className="col-12 text-right my-1">
          <h2>Total: <span className="font-weight-bold">$ {cuota.valor}</span></h2>
        </div>
      </div>
    </Fragment>
  );
}

export default ContentOneCuota;