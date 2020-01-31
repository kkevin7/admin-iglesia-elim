const initState = {
    busqueda: "",
    error: "",
  };
  
  const BusquedaReducer = (state = initState, action) => {
    switch (action.type) {
      case "BUSCAR_CONCIDENCIA":
        return {
          ...state,
          busqueda: action.busqueda
        };
  
      default:
        return state;
    }
  };
  
  export default BusquedaReducer;