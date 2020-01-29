export const createDevolucion = devolucion => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { monto, carnet, descripcion } = devolucion;

        await firestore
            .collection("devoluciones")
            .add({
                carnet,
                monto: Number(monto),
                descripcion,
                fecha: new Date(),
                estado: "REALIZADA",
            })
            .then(async () => {
                await dispatch({
                    type: "CREATE_DEVOLUCION",
                });
            })
            .catch(async error => {
                await dispatch({
                    type: "CREATE_DEVOLUCION_ERROR",
                    error
                });
            });
    };
};

export const buscarSocioCarnet = busqueda => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      const usuariosRef = firestore.collection("usuarios");
      await usuariosRef.where('carnet', "==", busqueda).get().then(async snapshot => {
          if (!snapshot.empty) {
            const socio = snapshot.docs.map(item => ({id: item.id, ...item.data()}))
            await dispatch({
              type: "BUSCAR_SOCIO",
              socio
            });
          } else {
            await dispatch({
              type: "SOCIO_NOT_FOUND",
              socio: {}
            });
          }
        })
        .catch(async error => {
          await dispatch({
            type: "BUSCAR_SOCIO_ERROR",
            error
          });
        });
    };
  };
  