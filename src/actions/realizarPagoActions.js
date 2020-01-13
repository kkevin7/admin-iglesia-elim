export const buscarSocio = busqueda => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const usuariosRef = firestore.collection("usuarios").doc(busqueda);
    // const consulta = coleccion.where('uid', "==", busqueda).get();
    usuariosRef.get().then(resultado => {
        if (resultado.exists) {
          dispatch({
            type: "BUSCAR_SOCIO",
            socio: { ...resultado.data(), id: busqueda }
          });
        } else {
          dispatch({
            type: "SOCIO_NOT_FOUND",
            socio: {}
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "BUSCAR_SOCIO_ERROR",
          err
        });
      });
  };
};
