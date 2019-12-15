import React, { Component, Fragment } from 'react';
import Producto from '../Inventario/Producto';

const ResumenPedido = (props) => {
    const productos = props.productos;
    if(!productos) return null;

        return (
            <Fragment>
                <h2 className="text-center my-5">Resumen y Cantidades</h2>
                <form 
                  // noValidate
                  autoComplete="off">
                <div className="table-responsive">
                <table className="table">
                    <thead className="bg-success text-white ">
                        <tr className="font-weight-bold">
                            <th className="align-middle">Productos</th>
                            <th className="align-middle">Precio</th>
                            <th className="align-middle">Existencia</th>
                            <th className="align-middle">Cantidad</th>
                            <th className="align-middle">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <Producto
                                key={producto.id}
                                id={producto.id}
                                producto={producto}
                                index={index}
                                actualizarCantidad={props.actualizarCantidad}
                                eliminarProducto={props.eliminarProducto}
                            />
                        ))}
                    </tbody>
                </table>
                </div>
                </form>
            </Fragment>
        );
}

export default ResumenPedido;