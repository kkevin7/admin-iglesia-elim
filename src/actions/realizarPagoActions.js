export const buscarSocioCarnet = busqueda => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const usuariosRef = firestore.collection("usuarios");
    await usuariosRef
      .where("carnet", "==", busqueda)
      .get()
      .then(async snapshot => {
        if (!snapshot.empty) {
          const socio = await snapshot.docs.map(item => ({
            id: item.id,
            ...item.data()
          }));
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

export const buscarSocio = busqueda => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const usuariosRef = await firestore.collection("usuarios").doc(busqueda);
    // const consulta = coleccion.where('uid', "==", busqueda).get();
    usuariosRef.get().then(async resultado => {
      if (resultado.exists) {
        await dispatch({
          type: "BUSCAR_SOCIO",
          socio: { ...resultado.data(), id: busqueda }
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

export const realizarPagoCuota = cuota => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const {
      id,
      id_contribucion,
      saldo_anterior,
      saldo_actualizado,
      estado_contribucion
    } = cuota;

    await firestore
      .update(
        {
          collection: "cuotas",
          doc: id
        },
        {
          saldo_anterior: Number(saldo_anterior),
          saldo_actualizado: Number(saldo_actualizado),
          fecha_pago: new Date(),
          estado: "PAGADA"
        }
      );

    await firestore.update(
      {
        collection: "contribuciones",
        doc: id_contribucion
      },
      {
        fecha_ultimo_pago: new Date(),
        estado: estado_contribucion
      }
    );

  }
}