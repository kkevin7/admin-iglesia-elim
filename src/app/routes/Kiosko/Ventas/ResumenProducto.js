import React, {Fragment} from 'react'

const ResumenProducto = ({producto}) => {
    return (
        <Fragment>
            <div className="border mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Producto: <span className="font-weight-normal">{producto.nombre}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad: <span className="font-weight-normal">{producto.cantidad}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio Unitario: <span className="font-weight-normal">$ {producto.precio}</span>
                </p>
            </div>
        </Fragment>
    );
}

export default ResumenProducto;