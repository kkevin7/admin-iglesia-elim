export const buscarConcidencia = busqueda => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    await dispatch({
      type: "BUSCAR_CONCIDENCIA",
      busqueda
    });
  };
};
