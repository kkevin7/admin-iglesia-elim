import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
//Redux
import { bajaExistenciasProductos, countProductos, countVentas, countCompras, countProveedores } from "actions/EstadisticasInventarioActions";
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
    const {bajaExistenciasProductos, countProductos, countVentas, countCompras, countProveedores} = this.props;
    bajaExistenciasProductos();
    countProductos();
    countVentas();
    countCompras();
    countProveedores();
  }

  render() {
    const {bajaExistencias, count_productos, count_ventas, count_compras, count_proveedores} = this.props;
    if(!bajaExistencias.length > 0 || !count_productos || !count_ventas || !count_proveedores ) return <Spinner/>

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
            <TopVendidos />
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
    bajaExistencias: estadisticasInventario.bajaExistencias,
    count_productos:  estadisticasInventario.count_productos,
    count_ventas:  estadisticasInventario.count_ventas,
    count_compras:  estadisticasInventario.count_compras,
    count_proveedores:  estadisticasInventario.count_proveedores,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bajaExistenciasProductos: async () => dispatch(bajaExistenciasProductos()),
    countProductos:async () => dispatch(countProductos()),
    countVentas:async () => dispatch(countVentas()),
    countCompras:async () => dispatch(countCompras()),
    countProveedores:async () => dispatch(countProveedores()),
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
