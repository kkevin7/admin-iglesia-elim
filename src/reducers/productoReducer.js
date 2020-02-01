const initState = {
  productos: [],
  producto: {},
  error: ""
};

const productoReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PRODUCTO":
      return {
        ...state,
        error: action.error
      };
    case "CREATE_PRODUCTO_ERROR":
      return {
        ...state,
        error: action.error
      };
      case "BUSCAR_PRODUCTO":
      return {
        ...state,
        producto: action.producto
      };
    case "BUSCAR_PRODUCTO_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "PRODUCTO_HAY_EXISTENCIA":
      return state;
    case "PRODUCTO_HAY_EXISTENCIA_ERROR":
      return state;

    default:
      return state;
  }
};

export default productoReducer;
