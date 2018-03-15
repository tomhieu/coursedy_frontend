import {applyMiddleware, compose, createStore} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers/index';
import initialState from './initialState';
import {createLogger} from 'redux-logger'
import * as asyncActions from "actions/AsyncActionCreator";

/* Commonly used middlewares and enhancers */
/* See: http://redux.js.org/docs/advanced/Middleware.html*/
const middlewares = [thunk, promiseMiddleware()];

/* Everyone should use redux dev tools */
/* https://github.com/gaearon/redux-devtools */
/* https://medium.com/@meagle/understanding-87566abcfb7a */
const enhancers = [];
const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const loadingHandler = store => next => action => {
  const pendingIndex = action.type.indexOf(asyncActions.PENDING);
  const fulfillIndex = action.type.indexOf(asyncActions.FULFILLED);
  const rejectIndex = action.type.indexOf(asyncActions.REJECTED);
  // when a pending action is procession. Should show loading mask
  if (pendingIndex >= 0) {
    store.dispatch({
      type: asyncActions.ADD_ASYNC_ACTION,
      action: action.type.substr(0, pendingIndex)
    });
  } else if (fulfillIndex >= 0 || rejectIndex >= 0) {
    store.dispatch({
      type: asyncActions.REMOVE_ASYNC_ACTION,
      action: action.type.substr(0, pendingIndex)
    });
  }
  return next(action);
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares, createLogger(), loadingHandler),
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
