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

export const topVentas = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let productos = [];
        let ventas = [];
        let productosVentas = [];
        let topVentas = [];

        const productosRef = await firestore.collection("productos");
        const ventasRef = await firestore.collection("ventas");

        await productosRef.get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No se encontraron productos.');
                    return;
                } else {
                    productos = await snapshot.docs.map(item => ({ id: item.id, ...item.data() }))
                }
            })
            .catch(err => {
                console.log('Error al obtener los productos', err);
            });

        await ventasRef
            .where("fecha_venta", ">=" ,new Date((new Date()).getFullYear(), (new Date()).getMonth()-6, (new Date()).getDate()))
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No se encontraron ventas.');
                    return;
                } else {
                    ventas = await snapshot.docs.map(item => {
                        item.data().pedido.forEach(producto => {
                            productosVentas.push(producto);
                        })
                        return (item.data().pedido)
                    })
                }
            })
            .catch(err => {
                console.log('Error al obtener los ventas', err);
            });

        await productos.forEach(producto => {
            const productoFilter = productosVentas.filter(venta => venta.id == producto.id);
            if (productoFilter.length > 0) {
                const cantidadTotal = productoFilter.reduce((total, pv) => {
                    return total + pv.cantidad;
                }, 0);
                topVentas.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    cantidad: cantidadTotal,
                    precio: producto.precio,
                    url: producto.url
                })
            }
        });

        await topVentas.sort(function (a,b){
            if(a.cantidad < b.cantidad){
                return 1;
            }
            if(a.cantidad > b.cantidad){
                return -1;
            }
            return 0;
        });

        await dispatch({
            type: "TOP_VENTAS",
            topVentas: topVentas.slice(0,5),
        });

    };
}