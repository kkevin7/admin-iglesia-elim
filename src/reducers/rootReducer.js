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

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    authCustom: authReducer,
    auth: Auth,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    producto: productoReducer,
    realizarPago: realizarPagoReducer,
    contribucion: contribucionReducer,
  });
