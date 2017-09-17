import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import {i18nState} from "redux-i18n"

// Import the various reducers here:
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';

const rootReducer = combineReducers({
  // Apply all of the reducers here.
  i18nState,
  LoginComponent,
  SignUpComponent,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer
});

export default rootReducer;
