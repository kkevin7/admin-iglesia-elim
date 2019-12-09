import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './SettingsReducer';
import authReducer from './authReducer';
import productoReducer from './productoReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: authReducer,
  producto: productoReducer
});
