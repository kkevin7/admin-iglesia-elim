/**---------------------------------------- SECTOR DE VENTAS ---------------------------------------- */

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
                    await dispatch({
                        type: "PRODUCTOS_BAJA_EXISTENCIA",
                        bajaExistencias: []
                    });
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
                    await dispatch({
                        type: "COUNT_PRODUCTOS",
                        count_productos: 0
                    });
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
                    await dispatch({
                        type: "COUNT_VENTAS",
                        count_ventas: 0
                    });
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
                    await dispatch({
                        type: "COUNT_COMPRAS",
                        count_compras: 0
                    });
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
                    await dispatch({
                        type: "COUNT_PROVEEDORES",
                        count_proveedores: 0
                    });
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

/*---------------------------------- ADMINISTACION DE CUOTAS DE SOCIOS --------------------------------------------------------*/

export const countSocios = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("usuarios")
            .where("rol", "==", "Socio")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    await dispatch({
                        type: "COUNT_SOCIOS",
                        count_socios: 0
                    });
                    return;
                } else {
                    await dispatch({
                        type: "COUNT_SOCIOS",
                        count_socios: snapshot.size
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

export const countContribuciones = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("contribuciones")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    await dispatch({
                        type: "COUNT_CONTRIBUCIONES",
                        count_contribuciones: 0
                    });
                    return;
                } else {
                    await dispatch({
                        type: "COUNT_CONTRIBUCIONES",
                        count_contribuciones: snapshot.size
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

export const countCuotas = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("cuotas")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    await dispatch({
                        type: "COUNT_CUOTAS",
                        count_cuotas: 0
                    });
                    return;
                } else {
                    await dispatch({
                        type: "COUNT_CUOTAS",
                        count_cuotas: snapshot.size
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


export const countDevoluciones = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("devoluciones")
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros de devoluciones.');
                    await dispatch({
                        type: "COUNT_DEVOLUCIONES",
                        count_devoluciones: 0
                    });
                } else {
                    await dispatch({
                        type: "COUNT_DEVOLUCIONES",
                        count_devoluciones: snapshot.size
                    });
                }
            })
            .catch(async error => {
                await dispatch({
                    type: "COUNT_COMPRAS_ERROR",
                    count_devoluciones: 0,
                    error
                });
            });
    };
};

export const ultimosPagos = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore
            .collection("cuotas")
            .where("estado", "==", "PAGADA")
            .orderBy('fecha_pago', 'desc')
            .limit(5)
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No hay registros poca existencia.');
                    await dispatch({
                        type: "ULTIMOS_PAGOS",
                        ultimasCuotas: []
                    });
                    return;
                } else {
                    const ultimasCuotas = snapshot.docs.map(item => ({id: item.id, ...item.data()}))
                    await dispatch({
                        type: "ULTIMOS_PAGOS",
                        ultimasCuotas
                    });
                }
            })
            .catch(async error => {
                // console.log(error);
                await dispatch({
                    type: "ULTIMOS_PAGOS_ERROR",
                    error
                });
            });
    };
}

export const chartUsers = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let meses = [];
        let resultados = []

        const usuariosRef = await firestore.collection("usuarios");

        for (let i = 0; i < 6; i++) {
            const fecha = new Date();
            const fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth() - i, 1);
            const fechaFin = new Date(fecha.getFullYear(), fecha.getMonth() + 1 - i, 0);

            await usuariosRef
            .where("fecha_socio",">=", fechaInicio)
            .where("fecha_socio","<=", fechaFin)
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No se encontraron usuarios.');
                    meses.push(fechaInicio.getMonth());
                    resultados.push(0);
                } else {
                    meses.push(fechaInicio.getMonth());
                    resultados.push(snapshot.size);
                }
            })
            .catch(err => {
                console.log('Error al obtener los usuarios', err);
            });
        }

        await dispatch({
            type: "CHART_USERS",
            resultados_users: {
                meses,
                resultados,
            }
        });

    };
}

