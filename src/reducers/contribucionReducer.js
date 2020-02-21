const initState = {
  contribuciones: [{}],
  contribucion: {},
  socio: {},
  error: ""
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
      console.log("ERROR AL ENCONTRAR SOCIO", action.error);
      return {
        ...state,
        error: action.error
      };
    case "ACTIVAR_FINALIZAR_CONTRIBUCION":
      return {
        ...state,
        contribucion: action.contribucion,
      }
    case "ACTIVAR_FINALIZAR_CONTRIBUCION_ERROR":
      console.log("ERROR ACTIVAR_FINALIZAR_CONTRIBUCION", action.error);
      return {
        ...state,
        error: action.error
      };
      case "FINALIZAR_CONTRIBUCION":
        return {
          ...state,
        }
      case "FINALIZAR_CONTRIBUCION_ERROR":
        console.log("ERROR FINALIZAR_CONTRIBUCION", action.error);
        return {
          ...state,
          error: action.error
        };
    default:
      return state;
  }
};

export default contribucionReducer;
