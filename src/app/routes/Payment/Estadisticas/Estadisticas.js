import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
//Redux
import { countSocios, countContribuciones, countCuotas, countDevoluciones, ultimosPagos, chartUsers} from "actions/EstadisticasActions";
//Images
import socioImg from "assets/images/dashboard/companero.png";
import contribucionImg from "assets/images/dashboard/beneficio.png";
import cuotasImg from "assets/images/dashboard/negocios.png";
import devolucionesImg from "assets/images/dashboard/transferir.png";
//Components
import Spinner from "components/Spinner/Spinner";
import CardData from "app/routes/Kiosko/Estadisticas/CardData";
import UltimosPagos from "./UltimosPagos";
import ChartUsers from "./ChartUsers";

class Estadisticas extends Component {
  state = {};

  componentDidMount(){
    const {countSocios, countContribuciones, countCuotas, countDevoluciones, ultimosPagos, chartUsers } = this.props;
    countSocios();
    countContribuciones();
    countCuotas();
    countDevoluciones();
    ultimosPagos();
    chartUsers();
  }

  render() {
    const {count_socios, count_contribuciones, count_cuotas, count_devoluciones, ultimasCuotas, resultados_users} = this.props;
    if(!(count_socios >= 0)|| !(count_contribuciones >= 0) || !(count_cuotas >= 0) || !(count_devoluciones >= 0) || !ultimasCuotas || !resultados_users ) return <Spinner/>
    console.log(ultimasCuotas);
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
            <ChartUsers 
            resultados_users={resultados_users}
            />
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
    resultados_users: estadisticas.resultados_users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countSocios:async () => dispatch(countSocios()),
    countContribuciones:async () => dispatch(countContribuciones()),
    countCuotas:async () => dispatch(countCuotas()),
    countDevoluciones:async () => dispatch(countDevoluciones()),
    ultimosPagos: async () => dispatch(ultimosPagos()),
    chartUsers: async () => dispatch(chartUsers())
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
