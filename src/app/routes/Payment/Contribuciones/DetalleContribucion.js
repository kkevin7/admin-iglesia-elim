import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
//Card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
//Components
import Spinner from "components/Spinner/Spinner";
import CardSocio from "./CardSocio";
import CardContribucion from "./CardContribucion";
import CardCuotas from "./CardCuotas";
//Reducers
import {
  buscarContribucionAndSocio,
  activarFinalizarContribucion
} from "actions/contribucionesActions";

class DetalleContribucion extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    const { buscarContribucionAndSocio } = this.props;
    buscarContribucionAndSocio(this.props.match.params.id_contribucion);
  }

  redirectEditContribucion = (id) => {
    const {history} = this.props;
    history.push(`/app/editarContribucion/${id}`);
  }

  render() {
    const {
      contribucion,
      cuotas,
      socio,
      busqueda,
      activarFinalizarContribucion
    } = this.props;
    if (!contribucion || !cuotas || !socio) return <Spinner />;

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
        <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <h2 className="title mb-3 mb-sm-0">Detalles de la contribución</h2>
          <Button
            variant="contained"
            className="my-1 bg-warning text-white"
            onClick={() => this.redirectEditContribucion(contribucion.id)}
          >
            Editar Contribución
          </Button>
        </div>
        <div className="row">
          <div className="col-lg-6 col-lg-6 col-sm-6 col-12 my-2">
            <CardSocio socio={socio} />
          </div>
          <div className="col-lg-6 col-lg-6 col-sm-6 col-12 my-2">
            <CardContribucion
              contribucion={contribucion}
              activarFinalizarContribucion={activarFinalizarContribucion}
            />
          </div>
          <div className="col-lg-12 col-lg-12 col-sm-12 col-12 my-2">
            <CardCuotas
              cuotas={busqueda ? cuotasBusqueda : cuotas}
              totalCantidadCuotas={cuotas.length}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, contribucion, busqueda }) => {
  return {
    busqueda: busqueda.busqueda.toLowerCase(),
    socio: contribucion.socio,
    contribucion: contribucion.contribucion && contribucion.contribucion,
    cuotas: firestore.ordered.cuotas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buscarContribucionAndSocio: async busqueda =>
      dispatch(buscarContribucionAndSocio(busqueda)),
    activarFinalizarContribucion: async contribucion =>
      dispatch(activarFinalizarContribucion(contribucion))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => [
      {
        collection: "cuotas",
        where: [["id_contribucion", "==", props.match.params.id_contribucion]],
        orderBy: ["fecha_inicio", "asc"]
      }
    ])
  )(DetalleContribucion)
);
