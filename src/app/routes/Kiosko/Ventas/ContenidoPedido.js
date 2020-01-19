import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from "components/Spinner/Spinner";
import Select from "react-select";
import Animated from "react-select/animated";
import ResumenPedido from "./ResumenPedido";
import GenerarPedido from "./GenerarPedido";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

class ContenidoPedido extends Component {
  state = {
    productos: [],
    total: 0
  };

  seleccionarProducto = productos => {
    this.setState({
      productos
    });
  };

  actualizarCantidad = (cantidad, index) => {
    // leer el state de productos
    const productos = this.state.productos;
    // aregar la cantidad desde la interfaz
    productos[index].cantidad = cantidad;
    this.setState(
      {
        productos
      },
      () => {
        this.actualizarTotal();
      }
    );
  };

  actualizarTotal = () => {
    const productos = this.state.productos;
    if (productos.length === 0) {
      this.setState({
        total: 0
      });
      return;
    }
    let nuevoTotal = 0;
    // realizar la opéracion de cantidad x precio
    productos.map(
      producto => (nuevoTotal += producto.cantidad * producto.precio)
    );
    this.setState({
      total: nuevoTotal.toFixed(2)
    });
  };

  eliminarProducto = id => {
    const productos = this.state.productos;
    const productosRestantes = productos.filter(producto => producto.id !== id);
    this.setState(
      {
        productos: productosRestantes
      },
      () => {
        this.actualizarTotal();
      }
    );
  };

  validarPedido = props => {
    let noValido = !props.productos || props.total <= 0 || props.total == "NaN";
    return noValido;
  };

  handleAgregarVenta = e => {
    e.preventDefault();
    console.log("SUBMIT");

    const productosInput = this.state.productos.map(producto => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      cantidad: Number(producto.cantidad)
    }));
    const restaProducto = this.state.productos.map(producto => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      existencia: Number(producto.existencia - producto.cantidad),
      descripcion: producto.descripcion
    }));

    const nuevoPedido = {
      pedido: productosInput,
      total: Number(this.state.total),
      fecha_venta: new Date(),
      vendedor: this.props.vendedor,
      estado: "COMPLETADA"
    };
    console.log(restaProducto);

    const { firestore, history } = this.props;
    firestore
      .add({ collection: "ventas" }, nuevoPedido)
      .then(responseVenta => {
        restaProducto &&
          restaProducto.map(producto =>
            firestore.update(
              {
                collection: "productos",
                doc: producto.id
              },
              producto
            )
          );
        return responseVenta;
      })
      .then(response => {
        // console.log(response);
        history.push(`/app/comprobanteVenta/${response.id}`);
      });
  };

  render() {
    // const mensaje = (this.state.total <0) ? <Error error="Las cantidades no pueden ser negativas"/>: "";
    return (
      <Fragment>
        <Select
          onChange={this.seleccionarProducto}
          options={this.props.productos}
          isMulti={true}
          components={Animated()}
          placeholder="Seleccionar Productos"
          getOptionValue={options => options.id}
          getOptionLabel={options => options.nombre}
          value={this.state.productos}
        />
        <form
          // noValidate
          onSubmit={this.handleAgregarVenta}
          autoComplete="off"
        >
          <ResumenPedido
            productos={this.state.productos}
            actualizarCantidad={this.actualizarCantidad}
            eliminarProducto={this.eliminarProducto}
          />
          <h4 className="font-weight-bold text-right p-2">
            Total:{" "}
            <span className="font-weight-normal">$ {this.state.total}</span>
          </h4>
          <Button
            disabled={this.validarPedido(this.state)}
            type="submit"
            className={` ${!this.validarPedido(this.state) ? "bg-amber" : ""}`}
            variant="contained"
          >
            Realizar Venta
          </Button>
        </form>
      </Fragment>
    );
  }
}

export default withRouter(firestoreConnect()(ContenidoPedido));
