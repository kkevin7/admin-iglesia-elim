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
            // console.log(contribucion)
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
        }).catch(err => {
            dispatch({
                type: "BUSCAR_CONTRIBUCION_ERROR",
                err
            });
        });
    };
};
