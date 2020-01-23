export const createCompra = compra => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { id_producto, cantidad, precio_compra, total } = compra;

        await firestore
            .collection("compras")
            .add({
                id_producto,
                cantidad: Number(cantidad),
                precio_compra: Number(precio_compra),
                total: Number(total),
                fecha: new Date(),
                estado: "REALIZADA",
            })
            .then(async () => {
                await dispatch({
                    type: "CREATE_COMPRA",
                });
            })
            .catch(async error => {
                await dispatch({
                    type: "CREATE_COMPRA_ERROR",
                    error
                });
            });
    };
}