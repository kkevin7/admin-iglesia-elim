import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from 'components/Spinner/Spinner';
import Select from 'react-select';
import Animated from 'react-select/animated';
import ResumenPedido from './ResumenPedido';
import GenerarPedido from './GenerarPedido';

class ContenidoPedido extends Component {
    state = {
        productos: [],
        total: 0
    }

    seleccionarProducto = (productos) => {
        this.setState({
            productos
        })
    }

    actualizarCantidad = (cantidad, index) => {
        // leer el state de productos
        const productos = this.state.productos;
        // aregar la cantidad desde la interfaz
        productos[index].cantidad = cantidad;
        this.setState({
            productos,
        }, () => {
            this.actualizarTotal()
        })
    }

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
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));
        this.setState({
            total: nuevoTotal.toFixed(2)
        });
    }

    eliminarProducto = (id) => {
        const productos = this.state.productos;
        const productosRestantes = productos.filter(producto => producto.id !== id);
        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal();
        });
    }

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
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos}
                />
                <ResumenPedido
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />
                <p className="font-weight-bold text-right p-2">
                    Total: <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
                <GenerarPedido
                productos={this.state.productos}
                total={this.state.total}
                vendedor={this.props.vendedor}
                />
            </Fragment>
        );
    }
}

export default ContenidoPedido;