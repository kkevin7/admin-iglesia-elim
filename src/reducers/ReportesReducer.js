const initState = {
    productosColocados: [],
    ventas: [],
    error: ""
  };
  
  const productoReducer = (state = initState, action) => {
    switch (action.type) {
      case "REPORTE_PRODUCTOS_COLOCADOS":
        return {
          ...state,
          productosColocados: action.productosColocados,
        };
      case "REPORTE_PRODUCTOS_COLOCADOS_ERROR":
        return {
          ...state,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default productoReducer;
  