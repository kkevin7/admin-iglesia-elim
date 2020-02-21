import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
// Card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//Icons
import Badge from "@material-ui/core/Badge";
import MenuBookIcon from "@material-ui/icons/MenuBook";
//Components
import TableCuotas from "./TableCuotas";
import DataTableCuotas from "./DataTableCuotas";
import Spinner from "components/Spinner/Spinner";

class Cuotas extends Component {
  state = {};
  render() {
    const { cuotas, busqueda } = this.props;
    if (!cuotas) return <Spinner />;
    let cuotasBusqueda = [];

    if (busqueda) {
      cuotasBusqueda = cuotas.filter(
        cuota =>
          cuota.rubro.toLowerCase().includes(busqueda) ||
          (cuota.fecha_inicio
            ? moment(cuota.fecha_inicio.toDate()).format("LL")
            : ""
          )
            .toLowerCase()
            .includes(busqueda) ||
          cuota.valor.toFixed(2).includes(busqueda) ||
          cuota.id.toLowerCase().includes(busqueda) ||
          (cuota.fecha_pago
            ? moment(cuota.fecha_pago.toDate()).format("LLL")
            : ""
          )
            .toLowerCase()
            .includes(busqueda) ||
          cuota.estado.toLowerCase().includes(busqueda) 
      );
    }

    return (
      <div className="app-wrapper">
        <DataTableCuotas cuotas={busqueda ? cuotasBusqueda : cuotas} totalCantidadCuotas={cuotas.length} />
      </div>
    );
  }
}
const mapStateToProps = ({ firestore, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    cuotas: firestore.ordered.cuotas
  };
};

export default withRouter(
  compose(
    firestoreConnect(props => [
      {
        collection: "cuotas",
        where: [["id_contribucion", "==", props.match.params.id_contribucion]],
        orderBy: ["fecha_inicio", "asc"]
      }
    ]),
    connect(mapStateToProps)
  )(Cuotas)
);
