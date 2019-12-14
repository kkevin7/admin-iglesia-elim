import React, { Component, Fragment } from 'react';
import Producto from '../Inventario/Producto';

const ResumenPedido = (props) => {
    const productos = props.productos;
    if(!productos) return null;

        return (
            <Fragment>
                <h2 className="text-center my-5">Resumen y Cantidades</h2>
                <div className="table-responsive">
                <table className="table">
                    <thead className="bg-success text-white">
                        <tr className="font-weight-bold">
                            <th>Productos</th>
                            <th>Precio</th>
                            <th>Inventario</th>
                            <th>Cantidad</th>
                            <th>Eliminar</th>
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
            </Fragment>
        );
}

export default ResumenPedido;