import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
//Redux
import { bajaExistenciasProductos } from "actions/productosActions";
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
    const {bajaExistenciasProductos} = this.props;
    bajaExistenciasProductos();
  }

  render() {
    const {bajaExistencias} = this.props;
    if(!bajaExistencias.length > 0) return <Spinner/>

    return (
      <div className="app-wrapper">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
          <div className="row">
            <CardData
              titulo={`Productos`}
              resultado={Number(9)}
              color={`bg-primary`}
              img={productoImg}
            />
            <CardData
              titulo={`Ventas`}
              resultado={Number(9)}
              color={`bg-warning`}
              img={ventaImg}
            />
            <CardData
              titulo={`Compras`}
              resultado={Number(9)}
              color={`bg-danger`}
              img={compraImg}
            />
            <CardData
              titulo={`Preveedores`}
              resultado={Number(9)}
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

const mapStateToProps = ({ firestore, producto}) => {
  return {
    bajaExistencias: producto.bajaExistencias,
    // proveedores: firestore.ordered.proveedores,
    // categoria_producto: firestore.ordered.categoria_producto,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bajaExistenciasProductos: async (producto) => dispatch(bajaExistenciasProductos(producto)),
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
