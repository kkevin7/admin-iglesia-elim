const initState = {
  productos: [],
  // bajaExistencias: [],
  //errores;
  error: ""
};

const productoReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PRODUCTO":
      console.log("Producto action: ", action.producto);
      return state;
    case "CREATE_PRODUCTO_ERROR":
      console.log("ERROR AL CREAR EL PRODUCTO", action.error);
      return {
        ...state,
        error: action.error
      };
    case "PRODUCTO_HAY_EXISTENCIA":
      console.log("Producto action: ", action.producto);
      return state;
    case "PRODUCTO_HAY_EXISTENCIA_ERROR":
      console.log("ERROR AL CREAR EL PRODUCTO", action.error);
      return state;
    // case "PRODUCTOS_BAJA_EXISTENCIA":
    //   console.log("redux ", action.bajaExistencias);
    //   return {
    //     ...state,
    //     bajaExistencias: action.bajaExistencias
    //   };
    // case "PRODUCTOS_BAJA_EXISTENCIA_ERROR":
    //   return {
    //     ...state,
    //     error: action.error
    //   };
    default:
      return state;
  }
};

export default productoReducer;
