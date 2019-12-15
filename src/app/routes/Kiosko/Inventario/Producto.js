import React, { Component, Fragment } from 'react';

class Producto extends Component {
    state = { 
        // cantidad: 0
     }
    render() {

        const {producto} = this.props;
        // console.log(producto);
        return (
            <Fragment>
                <tr>
                    <td className="align-middle">{producto.nombre}</td>
                    <td className="align-middle">$ {producto.precio}</td>
                    <td className="align-middle">{producto.existencia}</td>
                    <td className="align-middle">
                        <input 
                        required
                        
                        type="number"
                        name="cantidad"
                        className="form-control"
                        max={producto.existencia}
                        step={1}
                        min={1}
                        onChange={e => {
                            if(e.target.value > producto.existencia){
                                e.target.value = producto.existencia;
                            }
                            this.props.actualizarCantidad(e.target.value, this.props.index)
                        }}
                    /></td>
                    <td className="align-middle">
                        <button 
                        type="button" 
                        className="btn btn-danger font-weight-bold" 
                        onClick={e => this.props.eliminarProducto(producto.id)}
                        >&times; Eliminar</button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Producto;