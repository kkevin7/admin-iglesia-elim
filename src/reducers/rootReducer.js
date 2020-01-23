import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import Auth from "./Auth";
import Settings from "./SettingsReducer";
import authReducer from "./authReducer";
import productoReducer from "./productoReducer";
import realizarPagoReducer from "./realizarPagoReducer";
import contribucionReducer from "./contribucionReducer";
import estadisticasInventario from "./EstadisticasInventarioReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    authCustom: authReducer,
    estadisticasInventario: estadisticasInventario,
    producto: productoReducer,
    realizarPago: realizarPagoReducer,
    contribucion: contribucionReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
  });
