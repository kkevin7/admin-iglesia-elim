import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
//Components
import TableMBContribuciones from "./TableMBContribuciones";
import TableContribuciones from "./TableContribuciones";
import DataTableContribuciones from "./DataTableContribuciones";
import Spinner from "components/Spinner/Spinner";

class Contribuciones extends Component {
  state = {};
  render() {
    const { contribuciones, busqueda } = this.props;
    if (!contribuciones) return <Spinner />;
    let contribucionesBusqueda = [];

    if (busqueda) {
      contribucionesBusqueda = contribuciones.filter(contrib =>
        (contrib.carnet ? contrib.carnet : "").toLowerCase().includes(busqueda) ||
        contrib.valor_cuota.toFixed(2).includes(busqueda) || 
        contrib.cantidad_cuota.toString().includes(busqueda) || 
        (contrib.fecha_inicio ? moment(contrib.fecha_inicio.toDate()).format("LL") : "").toLowerCase().includes(busqueda) ||
        (contrib.fecha_fin ? moment(contrib.fecha_fin.toDate()).format("LL") : "").toLowerCase().includes(busqueda) ||
        (contrib.estado ? "ACTIVO" : "INACTIVO").toLowerCase().includes(busqueda)
      );
    }

    return (
      <div className="app-wrapper">
        {/* <TableMBContribuciones contribuciones={contribuciones} /> */}
        <DataTableContribuciones contribuciones={busqueda ? contribucionesBusqueda : contribuciones} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    contribuciones: firestore.ordered.contribuciones
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: "contribuciones",
        orderBy: ["fecha_inicio", "desc"]
      }
    ])
  )(Contribuciones)
);
