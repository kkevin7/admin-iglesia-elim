const initState = {
  socio: {},
  noResultados: "",
  error: "",
};

const devolucionReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_DEVOLUCION":
      return state;
    case "CREATE_DEVOLUCION_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "BUSCAR_SOCIO":
      return {
        ...state,
        socio: action.socio,
        noResultados: false,
      };
    case "SOCIO_NOT_FOUND":
      return {
        ...state,
        socio: action.socio,
        noResultados: true,
      }
    case "BUSCAR_SOCIO_ERROR":
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default devolucionReducer;
