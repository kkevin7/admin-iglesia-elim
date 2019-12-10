import {connectRouter} from 'connected-react-router'
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer} from 'react-redux-firebase';
import Settings from './SettingsReducer';
import authReducer from './authReducer';
import productoReducer from './productoReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: authReducer,
  producto: productoReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
