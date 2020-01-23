export const bajaExistenciasProductos = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("productos")
            .orderBy('existencia', 'asc')
            .limit(5)
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    return;
                } else {
                    const productos = snapshot.docs.map(item => ({id: item.id, ...item.data()}))
                    await dispatch({
                        type: "PRODUCTOS_BAJA_EXISTENCIA",
                        bajaExistencias: productos
                    });
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "PRODUCTOS_BAJA_EXISTENCIA_ERROR",
                    error
                });
            });
    };
};

export const countProductos = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("productos")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    return;
                } else {
                    await dispatch({
                        type: "COUNT_PRODUCTOS",
                        count_productos: snapshot.size
                    });
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "COUNT_PRODUCTOS_ERROR",
                    error
                });
            });
    };
};

export const countVentas = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("ventas")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    return;
                } else {
                    await dispatch({
                        type: "COUNT_VENTAS",
                        count_ventas: snapshot.size
                    });
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "COUNT_VENTAS_ERROR",
                    error
                });
            });
    };
};

export const countCompras = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("compras")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    return;
                } else {
                    await dispatch({
                        type: "COUNT_COMPRAS",
                        count_compras: snapshot.size
                    });
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "COUNT_COMPRAS_ERROR",
                    error
                });
            });
    };
};

export const countProveedores = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("proveedores")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    return;
                } else {
                    await dispatch({
                        type: "COUNT_PROVEEDORES",
                        count_proveedores: snapshot.size
                    });
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "COUNT_PROVEEDORES_ERROR",
                    error
                });
            });
    };
};