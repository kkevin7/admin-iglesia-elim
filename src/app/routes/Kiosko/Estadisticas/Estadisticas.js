import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
//Redux
import { countProductos, countVentas, countCompras, countProveedores, bajaExistenciasProductos, topVentas } from "actions/EstadisticasActions";
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

  componentDidMount() {
    const { countProductos, countVentas, countCompras, countProveedores, bajaExistenciasProductos, topVentas } = this.props;
    countProductos();
    countVentas();
    countCompras();
    countProveedores();
    bajaExistenciasProductos();
    topVentas();
  }

  render() {
    const { bajaExistencias, count_productos, count_ventas, count_compras, count_proveedores, top_ventas } = this.props;
    if (!(count_productos >= 0) || !(count_ventas >= 0) || !(count_compras >= 0) || !(count_proveedores >= 0) || !bajaExistencias || !top_ventas.length > 0) return <Spinner />
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

const mapStateToProps = ({ estadisticas }) => {
  return {
    count_productos: estadisticas.count_productos,
    count_ventas: estadisticas.count_ventas,
    count_compras: estadisticas.count_compras,
    count_proveedores: estadisticas.count_proveedores,
    bajaExistencias: estadisticas.bajaExistencias,
    top_ventas: estadisticas.topVentas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countProductos: async () => dispatch(countProductos()),
    countVentas: async () => dispatch(countVentas()),
    countCompras: async () => dispatch(countCompras()),
    countProveedores: async () => dispatch(countProveedores()),
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
