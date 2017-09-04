import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from '../store/store';
import App from '../components/App';
import LoginForm from '../components/Auth/LoginForm'
import * as Pages from '../pages/';
import ReduxToastr from 'react-redux-toastr';
import {LoginRegisterPage} from "../containers/index";

const router = (
  <Provider store={store}>
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop
        position="bottom-right"
      />
      <Router history={history}>
        <App>
          <Route exact path="/" component={LoginForm}/>
          <Route exact path="/login" component={Pages.LoginRegisterPage} />
        </App>
      </Router>
    </div>
  </Provider>
);

export default router;
