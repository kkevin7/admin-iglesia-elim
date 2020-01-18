import { getFirebase } from "react-redux-firebase";

export const createProducto = (producto) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        return await firestore.collection('productos').add({
            ...producto,
            nombre: producto.nombre,
            precio: producto.precio,
            existencia: producto.existencia,
            descripcion: producto.descripcion,
            fecha_creacion: new Date()
        }).then((productoRef) => {
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

export const createProductoImg = (producto) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        return await firestore.collection('productos').add({
            ...producto,
            nombre: producto.nombre,
            precio: producto.precio,
            existencia: producto.existencia,
            descripcion: producto.descripcion,
            fecha_creacion: new Date()
        }).then((productoRef) => {
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

export const uploadImageProducto = (file) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const storageRef = firebase.storage().ref(`productos/${file.name}`)
        const task = storageRef.put(file);
        return await task;

        // const task = storageRef.child(`productos`).child(`recuro_${(new Date()).getTime()}`).put(file);
        // return await task;

    //     return await task.on('state_changed', (snapshot) => {
    //     let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     // this.setState({
    //     //   uploadValue: percentage
    //     // })
    //   }, (error) => {
    //     console.error(error.message)
    //   }, () => {
    //     console.log("TASK", task.snapshot.downloadURL);
    //     // Upload complete
    //     // this.setState({
    //     //   picture: task.snapshot.downloadURL
    //     // })
    //   })

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