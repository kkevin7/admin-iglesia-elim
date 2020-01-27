import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
//Redux
import { countProductos, countVentas, countCompras, countProveedores, bajaExistenciasProductos, topVentas } from "actions/EstadisticasInventarioActions";
//Images
import productoImg from "assets/images/dashboard/producto2.png";
import ventaImg from "assets/images/dashboard/venta.png";
import compraImg from "assets/images/dashboard/compra.png";
import proveedorImg from "assets/images/dashboard/proveedor.png";
//Components
import CardData from "./CardData";
import TopVendidos from "./TopVendidos";
import BajaExistencias from "./BajaExistencias";
import Spinner from "components/Spinner/Spinner";

class Estadisticas extends Component {
  state = {};

  componentDidMount(){
    const {countProductos, countVentas, countCompras, countProveedores, bajaExistenciasProductos,topVentas } = this.props;
    countProductos();
    countVentas();
    countCompras();
    countProveedores();
    bajaExistenciasProductos();
    topVentas();
  }

  render() {
    const {bajaExistencias, count_productos, count_ventas, count_compras, count_proveedores, top_ventas} = this.props;
    if(!count_productos || !count_ventas || !count_proveedores || !bajaExistencias || !top_ventas.length > 0 ) return <Spinner/>
    return (
      <div className="app-wrapper">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
          <div className="row">
            <CardData
              titulo={`Productos`}
              resultado={Number(count_productos)}
              color={`bg-primary`}
              img={productoImg}
            />
            <CardData
              titulo={`Ventas`}
              resultado={Number(count_ventas)}
              color={`bg-warning`}
              img={ventaImg}
            />
            <CardData
              titulo={`Compras`}
              resultado={Number(count_compras)}
              color={`bg-danger`}
              img={compraImg}
            />
            <CardData
              titulo={`Preveedores`}
              resultado={Number(count_proveedores)}
              color={`bg-info`}
              img={proveedorImg}
            />
          </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
          <div className="row">
            <TopVendidos 
              productos={top_ventas}
            />
            <BajaExistencias
              productos={bajaExistencias}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, estadisticasInventario}) => {
  return {
    count_productos:  estadisticasInventario.count_productos,
    count_ventas:  estadisticasInventario.count_ventas,
    count_compras:  estadisticasInventario.count_compras,
    count_proveedores:  estadisticasInventario.count_proveedores,
    bajaExistencias: estadisticasInventario.bajaExistencias,
    top_ventas: estadisticasInventario.topVentas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countProductos:async () => dispatch(countProductos()),
    countVentas:async () => dispatch(countVentas()),
    countCompras:async () => dispatch(countCompras()),
    countProveedores:async () => dispatch(countProveedores()),
    bajaExistenciasProductos: async () => dispatch(bajaExistenciasProductos()),
    topVentas: async () => dispatch(topVentas()),
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
