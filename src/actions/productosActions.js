import { getFirebase } from "react-redux-firebase";

export const createProducto = producto => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { nombre, precio, existencia, descripcion, proveedor, categoria_producto, } = producto;

        await firestore
            .collection("productos")
            .add({
                nombre,
                precio: Number(precio),
                existencia: Number(existencia),
                descripcion,
                fecha_creacion: new Date(),
                url: null,
                file_id: null,
                proveedor,
                categoria_producto,
                estado: true,
            })
            .then(async () => {
                await dispatch({
                    type: "CREATE_PRODUCTO",
                    producto: producto
                });
            })
            .catch(async error => {
                await dispatch({
                    type: "CREATE_PRODUCTO_ERROR",
                    error
                });
            });
    };
};

export const createProductoImg = producto => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const { nombre, precio, existencia, descripcion, file, proveedor, categoria_producto, } = producto;
        const file_id = (new Date()).getTime();

        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`/productos/${file_id}`).put(file);
        await uploadTask.then(async snapshotFile => {
            await snapshotFile.ref.getDownloadURL().then(async url => {
                await firestore
                    .collection("productos")
                    .add({
                        nombre,
                        precio: Number(precio),
                        existencia: Number(existencia),
                        descripcion,
                        fecha_creacion: new Date(),
                        url: url,
                        file_id: snapshotFile.ref.name,
                        proveedor,
                        categoria_producto,
                        estado: true
                    })
                    .then(async () => {
                        await dispatch({
                            type: "CREATE_PRODUCTO",
                            producto: producto
                        });
                    })
                    .catch(async error => {
                        await dispatch({
                            type: "CREATE_PRODUCTO_ERROR",
                            error
                        });
                    });
            });
        });
    };
};

export const updateProducto = producto => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { id, nombre, precio, existencia, descripcion, proveedor, categoria_producto, estado } = producto;

        await firestore
            .update(
                {
                    collection: "productos",
                    doc: id
                },
                {
                    nombre,
                    precio: Number(precio),
                    existencia: Number(existencia),
                    descripcion,
                    fecha_creacion: new Date(),
                    proveedor,
                    categoria_producto,
                    estado,
                })
            .then(async () => {
                await dispatch({
                    type: "UPDATE_PRODUCTO",
                    producto: producto
                });
            })
            .catch(async error => {
                await dispatch({
                    type: "UPDATE_PRODUCTO_ERROR",
                    error
                });
            });
    };
};

export const updateProductoImg = producto => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const { id, nombre, precio, existencia, descripcion, file, file_id, proveedor, categoria_producto, estado } = producto;
        const nuevoFileId = (new Date()).getTime();

        const storageRef = firebase.storage().ref();
        const desertRef = storageRef.child(`/productos/${file_id}`);
        const uploadTask = storageRef.child(`/productos/${nuevoFileId}`).put(file);
        if (file_id) {
            await desertRef.delete();
        }
        await uploadTask.then(async snapshotFile => {
            await snapshotFile.ref.getDownloadURL().then(async url => {
                await firestore
                    .update(
                        {
                            collection: "productos",
                            doc: id
                        },
                        {
                            nombre,
                            precio: Number(precio),
                            existencia: Number(existencia),
                            descripcion,
                            fecha_creacion: new Date(),
                            url: url,
                            file_id: nuevoFileId,
                            proveedor,
                            categoria_producto,
                            estado,
                        })
                    .then(async () => {
                        await dispatch({
                            type: "UPDATE_PRODUCTO",
                            producto: producto
                        });
                    })
                    .catch(async error => {
                        await dispatch({
                            type: "UPDATE_PRODUCTO_ERROR",
                            error
                        });
                    });
            });
        });
    };
};


export const uploadImageProducto = (file) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const file_id = (new Date()).getTime();

        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`/productos/${file_id}`).put(file);
        return await uploadTask.then(async () => {
            await dispatch({
                type: "UPLOAD_IMG_PRODUCTO_SUCCESS",
            });
        }).catch(async error => {
            await dispatch({
                type: "UPLOAD_IMG_PRODUCTO_ERROR",
                error
            });
        });
    };
};

export const deleteProducto = id => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        await firestore.delete({
            collection: 'productos',
            doc: id
        }).then(async () => {
            await dispatch({
                type: "DELETE_PRODUCTO",
            });
        })
            .catch(async error => {
                await dispatch({
                    type: "DELETE_PRODUCTO_ERROR",
                    error
                });
            });
    }
}

export const deleteImageProducto = file_id => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const storageRef = firebase.storage().ref();
        const desertRef = storageRef.child(`/productos/${file_id}`);
        await desertRef.delete().then(async () => {
            await dispatch({
                type: "DELETE_IMG_PRODUCTO_SUCCESS",
            });
        }).catch(async (error) => {
            await dispatch({
                type: "DELETE_IMG_PRODUCTO_ERROR",
                error
            });
        });
    }
}

export const buscarProductoHayExistencia = producto => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        return await firestore
            .collection("productos")
            .where("existencia", ">", 0)
            .get()
            .then(async resultado => {
                await dispatch({
                    type: "PRODUCTO_HAY_EXISTENCIA",
                    producto: resultado.data()
                });
            })
            .catch(async error => {
                await dispatch({
                    type: "PRODUCTO_HAY_EXISTENCIA_ERROR",
                    error
                });
            });
    };
};

export const buscarProducto = id => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        const productosRef = await firestore.collection("productos");
        const proveedoresRef = await firestore.collection("proveedores");
        const categoriaProductoRef = await firestore.collection("categoria_producto");
        let producto = {};
        let proveedor = {};
        let categoriaProducto = {};

        await productosRef.doc(id)
            .get()
            .then(async snapshot => {
                if (snapshot.exists) {
                    producto = { ...snapshot.data() };
                }else{
                    producto= {};
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "BUSCAR_PRODUCTO_ERROR",
                    error
                });
            });

        if(producto){
            await proveedoresRef.doc(producto.proveedor)
            .get()
            .then(async snapshot => {
                if (snapshot.exists) {
                    const proveedor = snapshot.data();
                    producto.proveedor = proveedor.nombre +" "+ proveedor.apellido;
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "BUSCAR_PRODUCTO_ERROR",
                    error
                });
            });

            await categoriaProductoRef.doc(producto.categoria_producto)
            .get()
            .then(async snapshot => {
                if (snapshot.exists) {
                    const categoriaProducto = snapshot.data();
                    producto.categoria_producto = categoriaProducto.nombre;
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "BUSCAR_PRODUCTO_ERROR",
                    error
                });
            });
        }

        await dispatch({
            type: "BUSCAR_PRODUCTO",
            producto,
        });

    };
};