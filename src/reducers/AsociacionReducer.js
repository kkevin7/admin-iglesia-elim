const initState = {
  socio: {},
  contribuciones: [],
  noResultados: "",
  noContribucion: "",
  error: "",
};

const asociacionReducer = (state = initState, action) => {
  switch (action.type) {
    case "BUSCAR_SOCIO":
      return {
        ...state,
        socio: action.socio,
        noResultados: false,
      };
    case "BUSCAR_SOCIO_NOT_FOUND":
      return {
        ...state,
        socio: {},
        noResultados: true,
        contribuciones: [],
        noContribucion: "",
      }
    case "BUSCAR_SOCIO_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "BUSCAR_CONTRIBUCIONES_ACTIVAS":
      return {
        ...state,
        contribuciones: action.contribuciones,
        noContribucion: false,
      };
    case "CONTRIBUCIONES_ACTIVAS_NOT_FOUND":
      return {
        ...state,
        contribuciones: [],
        noContribucion: true,
      }
    case "BUSCAR_CONTRIBUCIONES_ACTIVAS_ERROR":
      return {
        ...state,
        error: action.error,
        noContribucion: "",
      };
    default:
      return state;
  }
};

export default asociacionReducer;
