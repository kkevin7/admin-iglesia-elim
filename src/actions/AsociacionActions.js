export const createContribucion = nuevaContribucion => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const {
      id_usuario,
      carnet,
      valor_cuota,
      cantidad_cuota,
      fecha_inicio,
      fecha_fin,
      fecha_ultimo_pago,
      saldo,
      estado,
      observaciones
    } = nuevaContribucion;

    const contribucion = await firestore
      .add(
        {
          collection: "contribuciones"
        },
        {
          id_usuario: id_usuario,
          carnet: carnet,
          valor_cuota: Number(valor_cuota),
          cantidad_cuota: Number(cantidad_cuota),
          fecha_inicio: new Date(fecha_inicio),
          fecha_fin: new Date(fecha_fin),
          fecha_ultimo_pago: fecha_ultimo_pago
            ? new Date(fecha_ultimo_pago)
            : "",
          saldo: saldo ? Number(saldo) : 0,
          estado: true,
          observaciones: observaciones
        }
      )
      .then(async (contribucion) => {
        await dispatch({
          type: "ASOCIACION_CREATE_CONTRIBUCION"
        });
        return contribucion;
      })
      .catch(async error => {
        await dispatch({
          type: "ASOCIACION_CONTRIBUCION_ERROR",
          error
        });
      });

    if (contribucion.id) {
      let fecha_cuota = fecha_fin;
      fecha_cuota.setMonth(fecha_cuota.getMonth() - cantidad_cuota);

      for (let i = 1; i <= cantidad_cuota; i++) {
        const first_date = new Date(
          fecha_cuota.getFullYear(),
          fecha_cuota.getMonth() + i,
          1
        );
        const last_date = new Date(
          fecha_cuota.getFullYear(),
          fecha_cuota.getMonth() + 1 + i,
          0
        );

        await firestore
          .add(
            {
              collection: "cuotas"
            },
            {
              id_contribucion: contribucion.id,
              rubro: `Cuota Mensual ${i}`,
              valor: Number(valor_cuota),
              fecha_inicio: new Date(first_date),
              fecha_fin: new Date(last_date),
              saldo_anterior: Number(0),
              saldo_actualizado: Number(0),
              fecha_pago: "",
              observaciones: "",
              estado: "VIGENTE"
            }
          )
          .catch(async error => {
            await dispatch({
              type: "ASOCIACION_CUOTAS_ERROR",
              error
            });
          });
      }
    }
  };
};

export const buscarSocioCarnet = busqueda => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const usuariosRef = firestore.collection("usuarios");
    return await usuariosRef
      .where("carnet", "==", busqueda)
      .where("estado", "==", true)
      .get()
      .then(async snapshot => {
        if (!snapshot.empty) {
          const socio = snapshot.docs.map(item => ({
            id: item.id,
            ...item.data()
          }));
          await dispatch({
            type: "BUSCAR_SOCIO",
            socio
          });
          return socio;
        } else {
          await dispatch({
            type: "BUSCAR_SOCIO_NOT_FOUND",
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

export const buscarContribucionActivas = busqueda => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const contribucionesRef = firestore.collection("contribuciones")
    await contribucionesRef
      .where("carnet", "==", busqueda)
      .where("estado", "==", true)
      .get()
      .then(async snapshot => {
        if (!snapshot.empty) {
          const contribuciones = snapshot.docs.map(item => ({
            id: item.id,
            ...item.data()
          }));
          await dispatch({
            type: "BUSCAR_CONTRIBUCIONES_ACTIVAS",
            contribuciones
          });
          return contribuciones;
        } else {
          await dispatch({
            type: "CONTRIBUCIONES_ACTIVAS_NOT_FOUND",
            contribuciones: {}
          });
        }
      })
      .catch(async error => {
        await dispatch({
          type: "BUSCAR_CONTRIBUCIONES_ACTIVAS_ERROR",
          error
        });
      });

  }
}