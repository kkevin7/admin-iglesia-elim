export const buscarContribucionAndSocio = busqueda => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const contribucionesRef = firestore.collection("contribuciones").doc(busqueda);
        contribucionesRef.get().then(contribucion => {
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
        }).then(contribucion => {
            const usuariosRef = firestore.collection("usuarios").doc(contribucion.data().id_usuario);
            usuariosRef.get().then(usuario => {
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
            })
        }).catch(err => {
            dispatch({
                type: "BUSCAR_CONTRIBUCION_ERROR",
                err
            });
        });
    };
};
