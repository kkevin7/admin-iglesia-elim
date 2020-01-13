const initState = {
  contribuciones: [{}],
  contribucion: [{}],
  socio: [{}]
};

const contribucionReducer = (state = initState, action) => {
  switch (action.type) {
    case "BUSCAR_CONTRIBUCION":
      return {
        ...state,
        contribucion: action.contribucion
      };
    case "BUSCAR_SOCIO":
      return {
        ...state,
        socio: action.socio
      };
    case "CONTRIBUCION_NOT_FOUND":
      return {
        ...state,
        contribucion: action.contribucion
      };
    case "SOCIO_NOT_FOUND":
      return {
        ...state,
        socio: action.contribucion
      };
    case "BUSCAR_CONTRIBUCION_ERROR":
      console.log("ERROR AL ENCONTRAR SOCIO", action.err);
      return {
        ...state
      };
    default:
      return state;
  }
};

export default contribucionReducer;
