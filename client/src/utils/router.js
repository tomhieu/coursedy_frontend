import React from 'react';
import {Provider} from 'react-redux';
import store from '../store/store';
import App from '../components/App';
import * as Pages from '../pages/';
import ReduxToastr from 'react-redux-toastr';
import {Route, Router, Switch} from 'react-router-dom'
import {globalHistory} from "utils/globalHistory";
import ListTeacherContainer from 'containers/Teachers/TeacherList/ListTeacherContainer';
import TeacherDetailContainer from 'containers/Teachers/TeacherDetail/TeacherDetailContainer';
import PrivateRoute from "containers/PrivateRoute/PrivateRoute";
import {UserRole} from "../constants/UserRole";

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
            <Route path="/courses" component={Pages.PublicCourseListPage} />
            <Route path="/course/:id" component={Pages.PublicCourseDetailPage}/>
            <Route path="/teachers/:id" component={TeacherDetailContainer} />
            <Route path="/teachers" component={ListTeacherContainer} />

            <PrivateRoute path="/dashboard" roles={[UserRole.TEACHER]} component={Pages.TutorDashboard} />
            <PrivateRoute path="/student/dashboard" roles={[UserRole.STUDENT]} component={Pages.StudentDashboardPage} />
            <PrivateRoute path="/admin/dashboard" roles={[UserRole.ADMIN]} component={Pages.AdminDashboardPage} />

            <Route path="/payment" component={Pages.PaymentPage} />
            <Route path="/404" component={Pages.NotFoundPage} />
            <Route path="*" component={Pages.NotFoundPage} />
          </Switch>
        </App>
      </Router>
    </div>
  </Provider>
);

export default router;
