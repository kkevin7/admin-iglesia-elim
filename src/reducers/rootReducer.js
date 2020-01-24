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
import EstadisticasInventario from "./EstadisticasInventarioReducer";
import ComprasReducer from "./ComprasReducer";
import ReportesReducer from "./ReportesReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    authCustom: authReducer,
    estadisticasInventario: EstadisticasInventario,
    producto: productoReducer,
    compra: ComprasReducer,
    realizarPago: realizarPagoReducer,
    contribucion: contribucionReducer,
    reportes: ReportesReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
  });
