const initState = {
  productosColocados: [],
  ventas: [],
  cuotas: [],
  devoluciones: [],
  cantidadCuotas: "",
  totalCuotas: "",
  cantidadDevoluciones: "",
  totalDevoluciones: "",
  error: ""
};

const productoReducer = (state = initState, action) => {
  switch (action.type) {
    case "REPORTE_PRODUCTOS_COLOCADOS":
      return {
        ...state,
        productosColocados: action.productosColocados
      };
    case "REPORTE_PRODUCTOS_COLOCADOS_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "REPORTE_CUOTAS_GENERADAS":
      return {
        ...state,
        cuotas: action.cuotas,
      };
    case "REPORTE_CUOTAS_NOT_FOUND":
      return {
        ...state,
        cuotas: {},
      };
    case "RREPORTE_CUOTAS_GENERADAS_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "REPORTE_DEVOLUCIONES_REALIZADAS":
      return {
        ...state,
        devoluciones: action.devoluciones,
      };
    case "REPORTE_DEVOLUCIONES_NOT_FOUND":
      return {
        ...state,
        devoluciones: {},
      };
    case "RREPORTE_DEVOLUCIONES_REALIZADAS_ERROR":
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};

export default productoReducer;
