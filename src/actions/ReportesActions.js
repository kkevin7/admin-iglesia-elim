export const reportProductosColocados = fecha => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { fechaInicial, fechaFin } = fecha;
        let productos = [];
        let ventas = [];
        let productosVentas = [];
        let productosColocados = [];

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
                console.log("Productos: ", productos);
            })
            .catch(err => {
                console.log('Error al obtener los productos', err);
            });
        console.log("Productos: ", productos);

        await ventasRef
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

            console.log("ProductosVentas: ", productosVentas);

    };
}

export const reportProductosVentas = fecha => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { fechaInicial, fechaFin } = fecha;
        let ventas = [];
        let productos = [];

        const ventasRef = await firestore.collection("ventas");

        await ventasRef
            .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No se encontraron ventas.');
                    return;
                } else {
                    ventas = await snapshot.docs.map(item => {
                        item.data().pedido.forEach(producto => {
                            productos.push(producto);
                        })
                        return (item.data().pedido)
                    })
                }
            })
            .catch(err => {
                console.log('Error al obtener los ventas', err);
            });
        console.log("Ventas: ", ventas);
        console.log("Ventas: ", productos);

    };
}