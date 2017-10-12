import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from '../store/store';
import App from '../components/App';
import * as Pages from '../pages/';
import ReduxToastr from 'react-redux-toastr';
import { Router, Switch, Route } from 'react-router-dom'
import {globalHistory} from "utils/globalHistory";

const router = (
  <Provider store={store}>
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop
        position="bottom-right"
      />
      <Router history={globalHistory}>
        <App>
          <Switch>
            <Route exact path="/" component={Pages.LandingPage}/>
            <Route path="/login" component={Pages.LoginRegisterPage} />
            <Route path="/tutor" component={Pages.TutorPage} />
            <Route path="/dashboard" component={Pages.TutorDashboard} />
            <Route path="/account" component={Pages.TutorAccount} />
          </Switch>
        </App>
      </Router>
    </div>
  </Provider>
);

export default router;
