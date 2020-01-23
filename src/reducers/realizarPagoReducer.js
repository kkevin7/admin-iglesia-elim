const initState = {
    socio: [{}],
    noResultados: false
  };

  const realizarPagoReducer = (state = initState, action) => {
    switch (action.type) {
      case "BUSCAR_SOCIO":
        return {
          ...state,
          socio: action.socio,
          noResultados: false
        };
      case "SOCIO_NOT_FOUND":
        return {
          ...state,
          socio: action.socio,
          noResultados: true
        }
      case "BUSCAR_SOCIO_ERROR":
        return {
          ...state,
          noResultados: true
        };
      default:
        return state;
    }
  };
  
  export default realizarPagoReducer;
  