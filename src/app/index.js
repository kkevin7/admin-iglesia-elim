import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
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
import {isIOS, isMobile} from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';

class App extends React.Component {

  render() {
    const {match, drawerType, navigationStyle, horizontalNavPosition} = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

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

        <Sidebar/>
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
            <TopNav styleName="app-top-header"/>}
            <Header/>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
            <TopNav/>}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                  {/* Payment Administration */}
                  <Route path={`${match.url}/home`}
                         component={asyncComponent(() => import('./routes/Home'))}/>
                  
                  
                  {/* Productos */}
                  <Route path={`${match.url}/inventario`}
                         component={asyncComponent(() => import('./routes/Kiosko/Inventario/Productos'))}/>
                  <Route path={`${match.url}/registrarProducto`}
                         component={asyncComponent(() => import('./routes/Kiosko/Inventario/RegistrarProducto'))}/>
                  <Route path={`${match.url}/detalleProducto/:id`}
                         component={asyncComponent(() => import('./routes/Kiosko/Inventario/DetalleProducto'))}/>
                  <Route path={`${match.url}/editarProducto/:id`}
                         component={asyncComponent(() => import('./routes/Kiosko/Inventario/EditarProducto'))}/>

                  {/* Ventas */}
                  <Route path={`${match.url}/ventas`}
                         component={asyncComponent(() => import('./routes/Kiosko/Ventas/Ventas'))}/>
                  <Route path={`${match.url}/realizarVenta`}
                         component={asyncComponent(() => import('./routes/Kiosko/Ventas/RealizarVenta'))}/>
                     <Route path={`${match.url}/confirmarVenta`}
                         component={asyncComponent(() => import('./routes/Kiosko/Ventas/ConfirmarVenta'))}/>
                     <Route path={`${match.url}/detalleVenta/:id`}
                         component={asyncComponent(() => import('./routes/Kiosko/Ventas/DetalleVenta'))}/>}
                     <Route path={`${match.url}/comprobanteVenta/:id`}
                         component={asyncComponent(() => import('./routes/Kiosko/Ventas/ComprobanteVenta/ComprobanteVenta'))}/>}

                  {/* Proveedores */}
                  <Route path={`${match.url}/proveedores`}
                         component={asyncComponent(() => import('./routes/Kiosko/Proveedores/Proveedores'))}/>
                  <Route path={`${match.url}/nuevoProveedor`}
                         component={asyncComponent(() => import('./routes/Kiosko/Proveedores/NuevoProveedor'))}/>
                  <Route path={`${match.url}/editarProveedor/:id`}
                         component={asyncComponent(() => import('./routes/Kiosko/Proveedores/EditarProveedor'))}/>

                     {/* Categoria Productos */}
                  <Route path={`${match.url}/categoriaProductos`}
                         component={asyncComponent(() => import('./routes/Kiosko/CategoriaProducto/CategoriaProductos'))}/>
                  <Route path={`${match.url}/nuevoCategoriaProducto`}
                         component={asyncComponent(() => import('./routes/Kiosko/CategoriaProducto/NuevoCategoriaProducto'))}/>
                  <Route path={`${match.url}/editarCategoriaProducto/:id`}
                         component={asyncComponent(() => import('./routes/Kiosko/CategoriaProducto/EditarCategoriaProducto'))}/>

              {/* --------------------------------------- PAGOS DE CUOTAS ------------------------------------- */}

                     <Route path={`${match.url}/paymentAdministration`}
                         component={asyncComponent(() => import('./routes/Payment/Administration'))}/>

                      {/* Asociacion de Usuarios */}
                     <Route path={`${match.url}/asociacion`}
                         component={asyncComponent(() => import('./routes/Payment/Asociacion/Asociacion'))}/>

                     {/* Contribuidores */}
                     <Route path={`${match.url}/contribuciones`}
                         component={asyncComponent(() => import('./routes/Payment/Contribuciones/Contribuciones'))}/>
                     <Route path={`${match.url}/detalleContribucion/:id_contribucion`}
                         component={asyncComponent(() => import('./routes/Payment/Contribuciones/DetalleContribucion'))}/>

                     {/* Realizar un pago */}
                     <Route path={`${match.url}/realizarPago`}
                         component={asyncComponent(() => import('./routes/Payment/RealizarPago/RealizarPago'))}/>
                     <Route path={`${match.url}/contribucionesSocio/:id_usuario`}
                         component={asyncComponent(() => import('./routes/Payment/RealizarPago/ContribucionesSocio'))}/>
                     <Route path={`${match.url}/cuotas/:id_contribucion`}
                         component={asyncComponent(() => import('./routes/Payment/RealizarPago/Cuotas'))}/>
                     <Route path={`${match.url}/comprobanteCuota/:id`}
                         component={asyncComponent(() => import('./routes/Payment/RealizarPago/ComprobanteCuota'))}/>
              
              {/* ----------------------------------------- USUARIOS --------------------------------------------- */}

                  {/* Users */}
                  <Route path={`${match.url}/users`}
                         component={asyncComponent(() => import('./routes/Users/Usuarios'))}/>
                  <Route path={`${match.url}/RegistrarUsuario`}
                         component={asyncComponent(() => import('./routes/Users/RegistrarUsuario'))}/>
                     <Route path={`${match.url}/RegistrarUsuarioSinCorreo`}
                         component={asyncComponent(() => import('./routes/Users/RegistrarUsuarioSinCorreo'))}/>
                     <Route path={`${match.url}/DetalleUsuario/:id`}
                         component={asyncComponent(() => import('./routes/Users/DetalleUsuario'))}/>


                  {/* Profile */}
                  <Route path={`${match.url}/profile`}
                         component={asyncComponent(() => import('./routes/Profile/Profile'))}/>
                  <Route path={`${match.url}/profileContribucion/:year?`}
                         component={asyncComponent(() => import('./routes/Profile/ProfileContribucion'))}/>
                  
                <Route component={asyncComponent(() => import('components/Error404'))}/>
              </Switch>
            </div>
            <Footer/>
          </main>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({settings}) => {
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  return {drawerType, navigationStyle, horizontalNavPosition}
};
export default withRouter(connect(mapStateToProps)(App));