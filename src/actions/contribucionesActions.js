export const buscarContribucionAndSocio = busqueda => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore.collection("contribuciones").doc(busqueda).get().then(contribucion => {
            if (contribucion.exists) {
                dispatch({
                    type: "BUSCAR_CONTRIBUCION",
                    contribucion: { ...contribucion.data(), id: busqueda },
                });
            } else {
                dispatch({
                    type: "CONTRIBUCION_NOT_FOUND",
                    contribucion: {},
                });
            }
            return contribucion;
        }).then((contribucion) => {
            return firestore.collection("usuarios").doc(contribucion.data().id_usuario).get().then(usuario => {
                if (usuario.exists) {
                    dispatch({
                        type: "BUSCAR_SOCIO",
                        socio: { ...usuario.data(), id: contribucion.data().id_usuario },
                    });
                } else {
                    dispatch({
                        type: "SOCIO_NOT_FOUND",
                        contribucion: {},
                    });
                }
                return usuario;
            })
        }).catch(error => {
            dispatch({
                type: "BUSCAR_CONTRIBUCION_ERROR",
                error
            });
        });
    };
};

export const activarFinalizarContribucion = (contribucion) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { id, estado } = contribucion;
        return await firestore.update(
            {
                collection: "contribuciones",
                doc: id
            },
            {
                estado: estado
            }).then(async () => {
                dispatch({
                    type: "ACTIVAR_FINALIZAR_CONTRIBUCION",
                    contribucion

                });
            }).catch(error => {
                dispatch({
                    type: "ACTIVAR_FINALIZAR_CONTRIBUCION_ERROR",
                    error
                });
            });
    };
};

export const finalizarContribucion = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        return await firestore.update(
            {
                collection: "contribuciones",
                doc: id
            },
            {
                estado: false
            }).then(async () => {
                dispatch({
                    type: "FINALIZAR_CONTRIBUCION",
                });
            }).catch(error => {
                dispatch({
                    type: "FINALIZAR_CONTRIBUCION_ERROR",
                    error
                });
            });
    };
};