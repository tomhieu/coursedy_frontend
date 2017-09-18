import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from '../store/store';
import App from '../components/App';
import * as Pages from '../pages/';
import ReduxToastr from 'react-redux-toastr';
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
            <Route exact path="/" component={Pages.LandingPage}/>
            <Route path="/login" component={Pages.LoginRegisterPage} />
            <Route path="/tutor" component={Pages.TutorPage} />
          </Switch>
        </App>
      </BrowserRouter>
    </div>
  </Provider>
);

export default router;
