import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
//components
import Spinner from "components/Spinner/Spinner";

class TableCuotas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { cuotas } = this.props;
    if (!cuotas) return <Spinner />;

    return (
      <div className="table-responsive">
        <table className="table table-striped table-inverse">
          <thead className="thead-inverse">
            <tr>
              <th>Rubro</th>
              <th>Fecha Incio</th>
              <th>Monto</th>
              <th>Código</th>
              <th>Fecha de Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cuotas.map((cuota, index) => (
              <tr key={cuota.id}>
                <td>{cuota.rubro}</td>
                <td>{moment(cuota.fecha_inicio).format("LL")}</td>
                <td>{cuota.valor}</td>
                <td>{cuota.id}</td>
                <td>
                  {cuota.fecha_pago
                    ? moment(cuota.fecha_pago.toDate()).format("lll")
                    : ""}
                </td>
                <td>{cuota.estado}</td>
                <td>
                  {cuota.estado === "VIGENTE" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AttachMoneyIcon />}
                    >
                      Pagar
                    </Button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cuotas: state.firestore.ordered.cuotas
  };
};

export default withRouter(
  compose(
    firestoreConnect(props => [
      {
        collection: "cuotas",
        where: [["id_contribucion", "==", props.match.params.id_contribucion]]
      }
    ]),
    connect(mapStateToProps)
  )(TableCuotas)
);
