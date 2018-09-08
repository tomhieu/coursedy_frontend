import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import * as asyncActions from 'actions/AsyncActionCreator';
import rootReducer from '../reducers/index';
import initialState from './initialState';

/* Commonly used middlewares and enhancers */
/* See: http://redux.js.org/docs/advanced/Middleware.html */
const middlewares = [thunk, promiseMiddleware()];

/* Everyone should use redux dev tools */
/* https://github.com/gaearon/redux-devtools */
/* https://medium.com/@meagle/understanding-87566abcfb7a */
const enhancers = [];
const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const drivingResponseHandler = store => next => (action) => {
  const fulfillIndex = action.type.indexOf(asyncActions.FULFILLED);
  if (fulfillIndex >= 0) {
    const headers = action.payload.headers;
    if (headers) {
      action.payload = action.payload.body;
      action.headers = headers;
    }
  }
  return next(action);
};

const loadingHandler = store => next => (action) => {
  const pendingIndex = action.type.indexOf(asyncActions.PENDING);
  const fulfillIndex = action.type.indexOf(asyncActions.FULFILLED);
  const rejectIndex = action.type.indexOf(asyncActions.REJECTED);
  // when a pending action is procession. Should show loading mask
  if (pendingIndex >= 0) {
    store.dispatch({
      type: asyncActions.ADD_ASYNC_ACTION,
      action: action.meta
    });
  } else if (fulfillIndex >= 0 || rejectIndex >= 0) {
    setTimeout(() => {
      store.dispatch({
        type: asyncActions.REMOVE_ASYNC_ACTION,
        action: action.meta
      });
    }, 200);
  }
  return next(action);
};

const composedEnhancers = compose(
  applyMiddleware(...middlewares, createLogger(), drivingResponseHandler, loadingHandler),
  ...enhancers
);

/* Hopefully by now you understand what a store is and how redux uses them,
 * But if not, take a look at: https://github.com/reactjs/redux/blob/master/docs/api/createStore.md
 * And https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch
 */
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

/* See: https://github.com/reactjs/react-router-redux/issues/305 */
export const history = syncHistoryWithStore(createBrowserHistory(), store);

/* Hot reloading of reducers.  How futuristic!! */
if (module.hot) {
  module.hot.accept('../reducers/', () => {
    const nextRootReducer = require('../reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
