const initState = {
  authError: null,
  usuarios: [],
  birthdays: []
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
    case "REGISTRAR_USUARIO_SUCCESS":
      console.log("singup sucess");
      return {
        ...state,
        authError: null
      };
    case "REGISTRAR_USUARIO_ERROR":
      console.log("singup error");
      return {
        ...state,
        authError: action.err.message
      };
    case "REGISTRAR_USUARIO_SUCCESS":
      console.log("registro de socio sin correo success");
      return {
        ...state,
        authError: null
      };
    case "REGISTRAR_USUARIO_ERROR":
      console.log("Error registrar usuario sin correo");
      return {
        ...state,
        authError: action.err.message
      };
    case "BIRTHDAYS":
      return {
        ...state,
        birthdays: action.birthdays
      };
    case "BIRTHDAYS_ERROR":
      return {
        ...state,
        authError: action.error.message
      };
      case "UPDATE_USUARIO_ROL_SUCCESS":
        return {
          ...state,
        };
      case "UPDATE_USUARIO_ROL_ERROR":
        return {
          ...state,
          authError: action.error.message
        };
    default:
      return state;
  }
};

export default authReducer;
