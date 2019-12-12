const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login faild");
      return {
        ...state,
        authError: "Login Failf"
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null
      };
    case 'REGISTRAR_USUARIO_SUCCESS':
      console.log('singup sucess')
      return{
        ...state,
        authError: null
      }
    case 'REGISTRAR_USUARIO_ERROR':
      console.log('singup error')
      return {
        ...state,
        authError: action.err.message
      }
    default:
      return state;
  }
};



export default authReducer;
