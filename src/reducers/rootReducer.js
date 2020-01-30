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
import Estadisticas from "./EstadisticasReducer";
import ComprasReducer from "./ComprasReducer";
import ReportesReducer from "./ReportesReducer";
import DevolucionReducer from "./DevolucionReducer";
import AsociacionReducer from "./AsociacionReducer";
import TopSocios from "./TopSociosReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    authCustom: authReducer,
    estadisticas: Estadisticas,
    producto: productoReducer,
    compra: ComprasReducer,
    asociacion: AsociacionReducer,
    realizarPago: realizarPagoReducer,
    contribucion: contribucionReducer,
    topSocios: TopSocios,
    devolucion: DevolucionReducer,
    reportes: ReportesReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
  });
