import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
// Card
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableVentas from "./TableVentas";
import DataTableVentas from "./DataTableVentas";

class Ventas extends Component {
  state = {};
  render() {
    const { ventas, busqueda } = this.props;
    if (!ventas) return <Spinner />;
    let ventasBusqueda = [];

    if (busqueda) {
      ventasBusqueda = ventas.filter(ven =>
        ven.id.toLowerCase().includes(busqueda) ||
        (ven.fecha_venta ? moment(ven.fecha_venta.toDate()).format("LLL"): "").toLowerCase().includes(busqueda) ||
        ven.total.toFixed(2).includes(busqueda) ||
        // (ven.vendedor ? ven.vendedor.nombre : "").toLowerCase().includes(busqueda) ||
        ven.estado.toLowerCase().includes(busqueda) 
      );
    }

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Ventas realizadas" />
        {/* <Card>
          <CardContent>
            <TableVentas ventas={ventas} />
          </CardContent>
        </Card>     */}
        <DataTableVentas ventas={busqueda ? ventasBusqueda : ventas} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    ventas: firestore.ordered.ventas
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: "ventas",
        orderBy: [["fecha_venta", "desc"]]
      }
    ])
  )(Ventas)
);
