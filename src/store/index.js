import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import reducers from '../reducers/rootReducer';
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import thunk from 'redux-thunk';

// import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
// import {reduxFirestore, firestoreReducer} from 'redux-firestore';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware, thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(initialState) {
  const store = createStore(
    reducers(history), 
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
    );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export {history};
