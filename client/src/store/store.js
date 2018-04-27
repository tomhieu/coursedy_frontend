import {applyMiddleware, compose, createStore} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers/index';
import initialState from './initialState';
import {createLogger} from 'redux-logger'
import * as asyncActions from "actions/AsyncActionCreator";
import {globalHistory} from '../utils/globalHistory'
import {TT} from "utils/locale";
import {LOGIN_FAILED} from "../constants/LoginComponent";
import {setCurrentUser} from "../actions/SessionActionCreator";
import * as WebConstant from "../constants/WebConstants";
import {UserRole} from "../constants/UserRole";
import {REMOVE_CURRENT_USER} from "../constants/Session";

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

const drivingResponseHandler = store => next => action => {
  const fulfillIndex = action.type.indexOf(asyncActions.FULFILLED);
  if (fulfillIndex >= 0) {
    if (action.payload.headers) {
      let actionType = action.type.replace(asyncActions.FULFILLED, '')
      store.dispatch({
        type: actionType + asyncActions.HEADERS,
        payload: action.payload.headers
      })
      action.payload.body.then((response) => {
        store.dispatch({
          type: action.type,
          payload: response
        })
      })
      return next(action)
    }
  }
  return next(action)
}

const loadingHandler = store => next => action => {
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
      })
    }, 200);

  }
  return next(action);
}

const authorizeHandler = store => next => action => {
  if (action.type === asyncActions.LOGIN + asyncActions.FULFILLED) {
    store.dispatch(setCurrentUser());
    switch (action.payload.data.role) {
      case UserRole.TEACHER:
      case UserRole.STUDENT:
        globalHistory.push('/dashboard/account');
        break;
      case UserRole.ADMIN:
        globalHistory.push('/dashboard/admin');
        break;
      default:
        throw new Error('Unsupported role ' + action.payload.role + ' in current application');
    }
  } else if (action.type === asyncActions.LOGIN + asyncActions.REJECTED) {
    const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
      errors : [TT.t('email_or_password_incorrect')]

    store.dispatch({
      type: LOGIN_FAILED,
      payload: { errors: error_messages }
    })
  } else if (action.type === asyncActions.SIGN_OUT + asyncActions.FULFILLED) {
    store.dispatch({type: REMOVE_CURRENT_USER})
    localStorage.removeItem('ezyLearningToken')
    localStorage.removeItem('ezyLearningClient')
    localStorage.removeItem('ezyLearningUid')
    globalHistory.replace('/')
  }
  return next(action);
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares, createLogger(), drivingResponseHandler, loadingHandler, authorizeHandler),
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
