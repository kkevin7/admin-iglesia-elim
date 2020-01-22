import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import IntlMessages from "util/IntlMessages";
import CustomScrollbars from "util/CustomScrollbars";

class SidenavContent extends Component {
  componentDidMount() {
    const { history } = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`; // get current path

    const menuLi = document.getElementsByClassName("menu");
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        const parentLiEle = that.closest(this, "li");
        if (menuLi[i].classList.contains("menu") && parentLiEle !== null) {
          event.stopPropagation();

          if (menuLi[i].classList.contains("open")) {
            menuLi[i].classList.remove("open", "active");
          } else {
            menuLi[i].classList.add("open", "active");
          }
        } else {
          for (let j = 0; j < menuLi.length; j++) {
            const parentLi = that.closest(this, "li");
            if (
              menuLi[j] !== this &&
              (parentLi === null || !parentLi.classList.contains("open"))
            ) {
              menuLi[j].classList.remove("open");
            } else {
              if (menuLi[j].classList.contains("open")) {
                menuLi[j].classList.remove("open");
              } else {
                menuLi[j].classList.add("open");
              }
            }
          }
        }
      };
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const pathname = `${history.location.pathname}`; // get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector"
      ].some(function(fn) {
        if (typeof document.body[fn] === "function") {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">
          <li className="nav-header">MENÚ</li>
          <li className="menu no-arrow">
            <NavLink to="/app/home">
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">Inicio</span>
            </NavLink>
          </li>

          {/* BookStore */}
          <li className="menu collapse-box">
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-text"
              type="button"
            >
              <span className="MuiButton-label">
              <i className="zmdi zmdi-collection-text zmdi-hc-fw" />
                <span className="nav-text">
                  <span>Kiosko</span>
                </span>
              </span>
              <span className="MuiTouchRipple-root"></span>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/app/inventario">
                  <i className="zmdi zmdi-collection-text zmdi-hc-fw" />
                  <span className="nav-text">Inventario</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/app/b2">
                  <i className="zmdi zmdi-local-store zmdi-hc-fw" />
                  <span className="nav-text">Bodega</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/app/registrarProducto">
                  <i className="zmdi zmdi-collection-add zmdi-hc-fw" />
                  <span className="nav-text">Registrar producto</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/realizarVenta">
                  <i className="zmdi zmdi-collection-add zmdi-hc-fw" />
                  <span className="nav-text">Registrar venta</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/ventas">
                  <i className="zmdi zmdi-money zmdi-hc-fw" />
                  <span className="nav-text">Ventas</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/registrarCompra">
                  <i className="zmdi zmdi-collection-add zmdi-hc-fw" />
                  <span className="nav-text">Registrar compra</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/compras">
                  <i className="zmdi zmdi-collection-add zmdi-hc-fw" />
                  <span className="nav-text">Compras</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/proveedores">
                  <i className="zmdi zmdi-accounts-list zmdi-hc-fw" />
                  <span className="nav-text">Proveedores</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/categoriaProductos">
                  <i className="zmdi zmdi-format-list-numbered zmdi-hc-fw" />
                  <span className="nav-text">Categorías</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/b6">
                  <i className="zmdi zmdi-local-printshop zmdi-hc-fw" />
                  <span className="nav-text">Reportes </span>
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Payment Administación */}
          <li className="menu collapse-box">
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-text"
              type="button"
            >
              <span className="MuiButton-label">
                <i className="zmdi zmdi-money zmdi-hc-fw" />
                <span className="nav-text">
                  <span>Pagos</span>
                </span>
              </span>
              <span className="MuiTouchRipple-root"></span>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/app/paymentAdministration">
                  <i className="zmdi zmdi-chart zmdi-hc-fw" />
                  <span className="nav-text">Administación</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/asociacion">
                  <i className="zmdi zmdi-pin-account zmdi-hc-fw" />
                  <span className="nav-text">Asociar</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/contribuciones">
                  <i className="zmdi zmdi-favorite zmdi-hc-fw" />
                  <span className="nav-text">Contribuciones</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/realizarPago">
                  <i className="zmdi zmdi-money zmdi-hc-fw" />
                  <span className="nav-text">Realizar un pago </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/p3">
                  <i className="zmdi zmdi-search-in-page zmdi-hc-fw" />
                  <span className="nav-text">Busquedas</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/p5">
                  <i className="zmdi zmdi-accounts-list zmdi-hc-fw" />
                  <span className="nav-text">Devoluciones </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/p4">
                  <i className="zmdi zmdi-local-printshop zmdi-hc-fw" />
                  <span className="nav-text">Reportes</span>
                </NavLink>
              </li>
              
            </ul>
          </li>

          {/* Users of the system */}
          <li className="menu collapse-box">
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-text"
              type="button"
            >
              <span className="MuiButton-label">
                <i className="zmdi zmdi-accounts-list zmdi-hc-fw" />
                <span className="nav-text">
                  <span>Usuarios</span>
                </span>
              </span>
              <span className="MuiTouchRipple-root"></span>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/app/users">
                  <i className="zmdi zmdi-accounts-list zmdi-hc-fw" />
                  <span className="nav-text">Usuarios </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/RegistrarUsuario">
                  <i className="zmdi zmdi-account-add zmdi-hc-fw" />
                  <span className="nav-text">Nuevo usuario </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/RegistrarUsuarioSinCorreo">
                  <i className="zmdi zmdi-account-add zmdi-hc-fw" />
                  <span className="nav-text">Nuevo Usuario Sin Correo </span>
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Members profile */}
          <li className="menu collapse-box">
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-text"
              type="button"
            >
              <span className="MuiButton-label">
                <i className="zmdi zmdi-account zmdi-hc-fw" />
                <span className="nav-text">
                  <span>Perfil</span>
                </span>
              </span>
              <span className="MuiTouchRipple-root"></span>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/app/profile">
                  <i className="zmdi zmdi-account zmdi-hc-fw" />
                  <span className="nav-text">Información </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/app/profileContribucion`} >
                  <i className="zmdi zmdi-account-box-mail zmdi-hc-fw" />
                  <span className="nav-text">Contribuciones </span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/app/p1">
                  <i className="zmdi zmdi-money zmdi-hc-fw" />
                  <span className="nav-text">Cuotas </span>
                </NavLink>
              </li> */}
            </ul>
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
