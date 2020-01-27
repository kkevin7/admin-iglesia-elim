const initState = {
  count_productos: "",
  count_ventas: "",
  count_compras: "",
  count_proveedores: "",
  bajaExistencias: [],
  topVentas: [],
  error: ""
};

const EstadisticasInventarioReducer = (state = initState, action) => {
  switch (action.type) {
    case "PRODUCTOS_BAJA_EXISTENCIA":
      return {
        ...state,
        bajaExistencias: action.bajaExistencias
      };
    case "PRODUCTOS_BAJA_EXISTENCIA_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "COUNT_PRODUCTOS":
      return {
        ...state,
        count_productos: action.count_productos
      };
    case "COUNT_PRODUCTOS_ERROR":
      return {
        ...state,
        error: action.error
      };
      case "COUNT_VENTAS":
      return {
        ...state,
        count_ventas: action.count_ventas
      };
    case "COUNT_VENTAS_ERROR":
      return {
        ...state,
        error: action.error
      };
      case "COUNT_COMPRAS":
      return {
        ...state,
        count_compras: action.count_compras
      };
    case "COUNT_COMPRAS_ERROR":
      return {
        ...state,
        error: action.error
      };
      case "COUNT_PROVEEDORES":
      return {
        ...state,
        count_proveedores: action.count_proveedores
      };
    case "COUNT_PROVEEDORES_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "TOP_VENTAS":
        return {
          ...state,
          topVentas: action.topVentas
        };
    default:
      return state;
  }
};

export default EstadisticasInventarioReducer;