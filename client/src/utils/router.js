import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from '../store/store';
import App from '../components/App';
import * as Pages from '../pages/';
import ReduxToastr from 'react-redux-toastr';
import {LoginRegisterPage, SearchFormContainer} from "../containers/index";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const router = (
  <Provider store={store}>
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop
        position="bottom-right"
      />
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path="/" component={SearchFormContainer}/>
            <Route path="/login" component={Pages.LoginRegisterPage} />
          </Switch>
        </App>
      </BrowserRouter>
    </div>
  </Provider>
);

export default router;
