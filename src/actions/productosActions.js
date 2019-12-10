import { getFirebase } from "react-redux-firebase";

export const createProducto = (producto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('productos').add({
            ...producto,
            nombre: "Lapicero",
            precio: "0.2",
            existencia: 22,
            descripcion: "Boligrafo para escribir"
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
};