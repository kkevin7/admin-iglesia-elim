const initState = {
    compras: [],
    error: ""
  };
  
  const ComprasReducer = (state = initState, action) => {
    switch (action.type) {
      case "CREATE_COMPRA":
        return state;
      case "CREATE_COMPRA_ERROR":
        return {
          ...state,
          error: action.error
        };
  
      default:
        return state;
    }
  };
  
  export default ComprasReducer;