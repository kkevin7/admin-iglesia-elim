const initState = {
    topSocios: [],
    error: "",
  };
  
  const topSociosReducer = (state = initState, action) => {
    switch (action.type) {
      case "TOP_SOCIOS":
        return {
          ...state,
          topSocios: action.topSocios,
        };
      case "TOP_SOCIO_ERROR":
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default topSociosReducer;
  