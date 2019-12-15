import { getFirebase } from "react-redux-firebase";

export const createProducto = (producto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('productos').add({
            ...producto,
            nombre: producto.nombre,
            precio: producto.precio,
            existencia: producto.existencia,
            descripcion: producto.descripcion,
            fecha_creacion: new Date()
        }).then(() => {
            dispatch({
                type: 'CREATE_PRODUCTO',
                producto: producto
            });
        }).catch((err) => {
            dispatch({
                type: 'CREATE_PRODUCTO_ERROR',
                err
            })
        })
    }
}

export const buscarProductoHayExistencia = (producto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('productos').where('existencia', ">", 0).get()
            .then((resultado) => {
                dispatch({
                    type: 'PRODUCTO_HAY_EXISTENCIA',
                    producto: producto.data()
                });
            }).catch((err) => {
                dispatch({
                    type: 'PRODUCTO_HAY_EXISTENCIA_ERROR',
                    err
                })
            })
    }

}