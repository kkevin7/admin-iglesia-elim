const initState = {
  count_productos: "",
  count_ventas: "",
  count_compras: "",
  count_proveedores: "",
  count_socios: "",
  count_contribuciones: "",
  count_cuotas: "",
  count_devoluciones: "",
  ultimasCuotas: [],
  bajaExistencias: [],
  topVentas: [],
  resultados_users: [],
  error: ""
};

const EstadisticasReducer = (state = initState, action) => {
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


    case "COUNT_SOCIOS":
      return {
        ...state,
        count_socios: action.count_socios
      };
    case "COUNT_SOCIOS_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "COUNT_CONTRIBUCIONES":
      return {
        ...state,
        count_contribuciones: action.count_contribuciones
      };
    case "COUNT_CONTRIBUCIONES_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "COUNT_CUOTAS":
      return {
        ...state,
        count_cuotas: action.count_cuotas
      };
    case "COUNT_CUOTAS_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "COUNT_DEVOLUCIONES":
      return {
        ...state,
        count_devoluciones: action.count_devoluciones
      };
    case "COUNT_DEVOLUCIONES_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "ULTIMOS_PAGOS":
      return {
        ...state,
        ultimasCuotas: action.ultimasCuotas
      };
    case "ULTIMOS_PAGOS_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "CHART_USERS":
      return {
        ...state,
        meses: action.meses,
        resultados_users: action.resultados_users,
      };

    default:
      return state;
  }
};

export default EstadisticasReducer;