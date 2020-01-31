import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import userImageDefault from "../../../assets/images/users/user.png";
import Spinner from "../../../components/Spinner/Spinner";
import Button from "@material-ui/core/Button";
import DataTableUsuarios from "./DataTableUsuarios";

class Users extends Component {
  state = {};

  render() {
    const { usuarios, firebase, busqueda } = this.props;
    if (!usuarios || !firebase) return <Spinner />;
    let usuariosBusqueda = [];

    if (busqueda) {
      usuariosBusqueda = usuarios.filter(
        usuario =>
          (usuario.carnet ? usuario.carnet : "")
            .toLowerCase()
            .includes(busqueda) ||
          usuario.nombre.toLowerCase().includes(busqueda) ||
          usuario.apellido.toLowerCase().includes(busqueda) ||
          (usuario.telefono ? usuario.telefono : "")
            .toLowerCase()
            .includes(busqueda) ||
          (usuario.rol ? usuario.rol : "").toLowerCase().includes(busqueda) ||
          (usuario.estado ? "ACTIVO" : "INACTIVO")
            .toLowerCase()
            .includes(busqueda)
      );
    }

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Usuarios del Sistema"
        />

        <DataTableUsuarios usuarios={busqueda ? usuariosBusqueda : usuarios} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, firebase, busqueda }) => {
  const { ordered } = firestore;
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    usuarios: ordered.usuarios,
    firebase: firebase
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: "usuarios",
        orderBy: [["fecha_socio", "desc"]]
      }
    ])
  )(Users)
);
