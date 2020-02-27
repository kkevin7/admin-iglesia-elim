import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Tour from '../components/Tour/index';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import { isIOS, isMobile } from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';
//Components
import Spinner from "components/Spinner/Spinner";

class App extends React.Component {

  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition, auth, profile } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    if (!profile.isLoaded || !auth.isLoaded) return <Spinner />

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        {/* <Tour/> */}

        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
              <TopNav styleName="app-top-header" />}
            <Header />
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
              <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">

              <Switch>
                {/* Payment Administration */}
                {(profile.rol == "Socio" || profile.rol == "SectorVentas" || profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/home`}
                    component={asyncComponent(() => import('./routes/Home'))} />
                ) : ("")}


                {/* Productos */}
                {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/inventario`}
                    component={asyncComponent(() => import('./routes/Kiosko/Inventario/Productos'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/registrarProducto`}
                    component={asyncComponent(() => import('./routes/Kiosko/Inventario/RegistrarProducto'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/detalleProducto/:id`}
                    component={asyncComponent(() => import('./routes/Kiosko/Inventario/DetalleProducto'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/editarProducto/:id`}
                    component={asyncComponent(() => import('./routes/Kiosko/Inventario/EditarProducto'))} />
                ) : ("")}

                {/* Ventas */}
                {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/ventas`}
                    component={asyncComponent(() => import('./routes/Kiosko/Ventas/Ventas'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/realizarVenta`}
                    component={asyncComponent(() => import('./routes/Kiosko/Ventas/RealizarVenta'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/confirmarVenta`}
                    component={asyncComponent(() => import('./routes/Kiosko/Ventas/ConfirmarVenta'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/detalleVenta/:id`}
                    component={asyncComponent(() => import('./routes/Kiosko/Ventas/DetalleVenta'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/comprobanteVenta/:id`}
                    component={asyncComponent(() => import('./routes/Kiosko/Ventas/ComprobanteVenta/ComprobanteVenta'))} />
                ) : ("")}

                {/* Proveedores */}
                {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/proveedores`}
                    component={asyncComponent(() => import('./routes/Kiosko/Proveedores/Proveedores'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/nuevoProveedor`}
                    component={asyncComponent(() => import('./routes/Kiosko/Proveedores/NuevoProveedor'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/editarProveedor/:id`}
                    component={asyncComponent(() => import('./routes/Kiosko/Proveedores/EditarProveedor'))} />
                ) : ("")}

                {/* Categoria Productos */}
                {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/categoriaProductos`}
                    component={asyncComponent(() => import('./routes/Kiosko/CategoriaProducto/CategoriaProductos'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/nuevoCategoriaProducto`}
                    component={asyncComponent(() => import('./routes/Kiosko/CategoriaProducto/NuevoCategoriaProducto'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/editarCategoriaProducto/:id`}
                    component={asyncComponent(() => import('./routes/Kiosko/CategoriaProducto/EditarCategoriaProducto'))} />
                ) : ("")}

                {/* Compras */}
                {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/registrarCompra`}
                    component={asyncComponent(() => import('./routes/Kiosko/Compras/RegistrarCompra'))} />
                ) : ("")}
                 {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/compras`}
                    component={asyncComponent(() => import('./routes/Kiosko/Compras/Compras'))} />
                ) : ("")}

                {/*Estadisticas */}
                {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/estadisticasInventario`}
                    component={asyncComponent(() => import('./routes/Kiosko/Estadisticas/Estadisticas'))} />
                ) : ("")}

                {/* Reportes */}
                {(profile.rol == "SectorVentas" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/reportesInventario`}
                    component={asyncComponent(() => import('./routes/Kiosko/Reportes/Reportes'))} />
                ) : ("")}

                {/* --------------------------------------- PAGOS DE CUOTAS ------------------------------------- */}

                {/* Asociacion de Usuarios */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/asociacion`}
                    component={asyncComponent(() => import('./routes/Payment/Asociacion/Asociacion'))} />
                ) : ("")}

                {/* Contribuidores */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/contribuciones`}
                    component={asyncComponent(() => import('./routes/Payment/Contribuciones/Contribuciones'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/detalleContribucion/:id_contribucion`}
                    component={asyncComponent(() => import('./routes/Payment/Contribuciones/DetalleContribucion'))} />
                ) : ("")}

                {/* Realizar un pago */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/realizarPago`}
                    component={asyncComponent(() => import('./routes/Payment/RealizarPago/RealizarPago'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/contribucionesSocio/:id_usuario`}
                    component={asyncComponent(() => import('./routes/Payment/RealizarPago/ContribucionesSocio'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/cuotas/:id_contribucion`}
                    component={asyncComponent(() => import('./routes/Payment/RealizarPago/Cuotas'))} />
                ) : ("")}
                {(profile.rol == "Socio" || profile.rol == "SectorVentas" || profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/comprobanteCuota/:id`}
                    component={asyncComponent(() => import('./routes/Payment/RealizarPago/ComprobanteCuota'))} />
                ) : ("")}

                {/* Devoluciones */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/devoluciones`}
                    component={asyncComponent(() => import('./routes/Payment/Devoluciones/Devoluciones'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/devolucionSocio`}
                    component={asyncComponent(() => import('./routes/Payment/Devoluciones/BuscarSocio'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/realizarDevolucion/:id`}
                    component={asyncComponent(() => import('./routes/Payment/Devoluciones/RealizarDevolucion'))} />
                ) : ("")}

                {/*Estadisticas */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/estadisticasContribuciones`}
                    component={asyncComponent(() => import('./routes/Payment/Estadisticas/Estadisticas'))} />
                ) : ("")}

                {/*Top Socios */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/topSocios`}
                    component={asyncComponent(() => import('./routes/Payment/TopSocios/TopSocios'))} />
                ) : ("")}

                {/* Reportes */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/reportePagos`}
                    component={asyncComponent(() => import('./routes/Payment/Reportes/Reportes'))} />
                ) : ("")}

                {/* ----------------------------------------- USUARIOS --------------------------------------------- */}

                {/* Users */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/users`}
                    component={asyncComponent(() => import('./routes/Users/Users/Usuarios'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/RegistrarUsuario`}
                    component={asyncComponent(() => import('./routes/Users/Users/RegistrarUsuario'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/RegistrarUsuarioSinCorreo`}
                    component={asyncComponent(() => import('./routes/Users/Users/RegistrarUsuarioSinCorreo'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/DetalleUsuario/:id`}
                    component={asyncComponent(() => import('./routes/Users/Users/DetalleUsuario'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/editarUsuario/:id`}
                    component={asyncComponent(() => import('./routes/Users/Users/EditarUsuario'))} />
                ) : ("")}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/cambiarCredenciales/:carnet`}
                    component={asyncComponent(() => import('./routes/Users/Users/CambiarCredenciales'))} />
                ) : ("")}

                {/* Cumpleaños */}
                {(profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/birthdays`}
                    component={asyncComponent(() => import('./routes/Users/Birthdays/Birthdays'))} />
                ) : ("")}

                {/* Privilegios */}
                {(profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/cambiarPrivilegios/:carnet`}
                    component={asyncComponent(() => import('./routes/Users/Privilegios/CambiarPrivilegios'))} />
                ) : ("")}

                {/*--------------------------------------------- PROFILE ---------------------------------------------*/}

                {/* Profile */}
                {(profile.rol == "Socio" || profile.rol == "SectorVentas" || profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/profile`}
                    component={asyncComponent(() => import('./routes/Profile/Profile'))} />
                ) : ("")}
                {(profile.rol == "Socio" || profile.rol == "SectorVentas" || profile.rol == "SectorPagos" || profile.rol == "Administrador") && profile.estado == true ? (
                  <Route path={`${match.url}/profileContribucion/:year?`}
                    component={asyncComponent(() => import('./routes/Profile/ProfileContribucion'))} />
                ) : ("")}

                <Route component={asyncComponent(() => import('components/Error404'))} />

              </Switch>

            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ settings, firebase }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return {
    drawerType,
    navigationStyle,
    horizontalNavPosition,
    auth: firebase.auth,
    profile: firebase.profile,
  }
};
export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(),
)(App));