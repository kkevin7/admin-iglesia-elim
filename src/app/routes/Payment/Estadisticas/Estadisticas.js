import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
//Redux
import { countSocios, countContribuciones, countCuotas, countDevoluciones, ultimosPagos} from "actions/EstadisticasActions";
//Images
import socioImg from "assets/images/dashboard/companero.png";
import contribucionImg from "assets/images/dashboard/beneficio.png";
import cuotasImg from "assets/images/dashboard/negocios.png";
import devolucionesImg from "assets/images/dashboard/transferir.png";
//Components
import Spinner from "components/Spinner/Spinner";
import CardData from "app/routes/Kiosko/Estadisticas/CardData";
import UltimosPagos from "./UltimosPagos";

class Estadisticas extends Component {
  state = {};

  componentDidMount(){
    const {countSocios, countContribuciones, countCuotas, countDevoluciones, ultimosPagos } = this.props;
    countSocios();
    countContribuciones();
    countCuotas();
    countDevoluciones();
    ultimosPagos();
  }

  render() {
    const {count_socios, count_contribuciones, count_cuotas, count_devoluciones, ultimasCuotas} = this.props;
    if(!count_socios|| !count_contribuciones || !count_cuotas || !count_devoluciones || !ultimasCuotas ) return <Spinner/>
    return (
      <div className="app-wrapper">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
          <div className="row">
            <CardData
              titulo={`Socios`}
              resultado={Number(count_socios)}
              color={`bg-primary`}
              img={socioImg}
            />
            <CardData
              titulo={`Contribuciones`}
              resultado={Number(count_contribuciones)}
              color={`bg-cyan`}
              img={contribucionImg}
            />
            <CardData
              titulo={`Cuotas Canceladas`}
              resultado={Number(count_cuotas)}
              color={`bg-green`}
              img={cuotasImg}
            />
            <CardData
              titulo={`Devoluciones`}
              resultado={Number(count_devoluciones)}
              color={`bg-danger`}
              img={devolucionesImg}
            />
          </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
          <div className="row">
            <UltimosPagos
              cuotas={ultimasCuotas}
            />
            {/* <TopVendidos 
              productos={top_ventas}
            />
            <BajaExistencias
              productos={bajaExistencias}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ estadisticas}) => {
  return {
    count_socios:  estadisticas.count_socios,
    count_contribuciones:  estadisticas.count_contribuciones,
    count_cuotas:  estadisticas.count_cuotas,
    count_devoluciones:  estadisticas.count_devoluciones,
    ultimasCuotas: estadisticas.ultimasCuotas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countSocios:async () => dispatch(countSocios()),
    countContribuciones:async () => dispatch(countContribuciones()),
    countCuotas:async () => dispatch(countCuotas()),
    countDevoluciones:async () => dispatch(countDevoluciones()),
    ultimosPagos: async () => dispatch(ultimosPagos()),
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect()
  )(Estadisticas)
);