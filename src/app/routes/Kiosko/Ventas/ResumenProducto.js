import React, {Fragment} from 'react'

const ResumenProducto = ({producto}) => {
    return (
        <Fragment>
            <div className="border mb-4 p-4">
                <h4 className="card-text font-weight-bold mb-3">
                    Producto: <span className="font-weight-normal">{producto.nombre}</span>
                </h4>
                <h4 className="card-text font-weight-bold mb-3">
                    Cantidad: <span className="font-weight-normal">{producto.cantidad}</span>
                </h4>
                <h4 className="card-text font-weight-bold mb-3">
                    Precio Unitario: <span className="font-weight-normal">$ {producto.precio.toFixed(2)}</span>
                </h4>
            </div>
        </Fragment>
    );
}

export default ResumenProducto;