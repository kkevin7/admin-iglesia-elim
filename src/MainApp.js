import React from 'react';
import {ConnectedRouter} from 'connected-react-router'
import { Provider, useSelector } from "react-redux";
import {Route, Switch} from 'react-router-dom';

import configureStore, {history} from './store';
import './firebase/firebase';
import {fbConfig} from './firebase/firebase';
import App from './containers/App';

import { ReactReduxFirebaseProvider, isLoaded, isEmpty } from 'react-redux-firebase';
import { createFirestoreInstance,} from 'redux-firestore';
import Spinner from './components/Spinner/Spinner';
import 'moment/locale/es';


export const store = configureStore();

const rrfConfig = {
  userProfile: "usuarios",
  useFirestoreForProfile: true,
  attachAuthIsReady: true
}

const rrfProps = {
  firebase: fbConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <Spinner/>;
  return children
}

function ProfileIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.profile)
  if (!isLoaded(auth)) return <Spinner/>;
  return children
}

const MainApp = () =>
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
    </ReactReduxFirebaseProvider>
  </Provider>;


export default MainApp;