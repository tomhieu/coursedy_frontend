/* eslint-disable global-require */
import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { UserRole } from 'constants/UserRole';
import store from './store/store';
import { globalHistory } from './utils/globalHistory';

import LessonEvaluationContainer from './containers/Courses/Lesson/LessonEvaluationContainer';
import TeacherDetailContainer from './containers/Teachers/TeacherDetail/TeacherDetailContainer';
import TeacherListContainer from './containers/Teachers/TeacherList/TeacherListContainer';
import AboutUsContainer from './containers/Others/AboutUsContainer';
import HelpCenterContainer from './containers/Others/HelpCenterContainer';
import BecomeTeacherContainer from './containers/Others/BecomeTeacherContainer';
import TermsContainer from './containers/Others/TermsContainer';
import PrivacyContainer from './containers/Others/PrivacyContainer';
import * as Pages from './pages';
import App from './components/App';
import requireLogin from './utils/requireLogin';
import TutorDashboardProfile from './pages/TutorDashboard/TutorDashboardProfile';
import TutorDashboardCourseDetail from './pages/TutorDashboard/TutorDashboardCourseDetail';
import TutorDashboardAccount from './pages/TutorDashboard/TutorDashboardAccount';
/* instructor course list */
import TutorDashboardCoursePending from './pages/TutorDashboard/TutorDashboardCoursePending';
import TutorDashboardCourseApproved from './pages/TutorDashboard/TutorDashboardCourseApproved';
import TutorDashboardCourseRejected from './pages/TutorDashboard/TutorDashboardCourseRejected';
import TutorDashboardCourseTeaching from './pages/TutorDashboard/TutorDashboardCourseTeaching';
import TutorDashboardCourseFinished from './pages/TutorDashboard/TutorDashboardCourseFinished';

import TutorDashboardCourseNew from './pages/TutorDashboard/TutorDashboardCourseNew';
import StudentDashboardProfile from './pages/StudentDashboard/StudentDashboardProfile';
import StudentDashboardCourseEnrolled from './pages/StudentDashboard/StudentDashboardCourseEnrolled';
import StudentDashboardCourseEnrolling from './pages/StudentDashboard/StudentDashboardCourseEnrolling';
import StudentDashboardCourseFollow from './pages/StudentDashboard/StudentDashboardCourseFollow';
import { TutorStatus } from './constants/TutorStatus';
import StudentCourseDetailContainer from './containers/Student/Dashboard/Courses/StudentCourseDetailContainer';
import StudentDashboardCourseDetails from './pages/StudentDashboard/StudentDashboardCourseDetails';
import HowCoursedyWorkContainer from './containers/HowCoursedyWorks/HowCoursedyWorkContainer';
import HowCoursedyWorkDetailContainer from './containers/HowCoursedyWorks/HowCoursedyWorkDetailContainer';

// define routes for config
export const routes = [
  {
    path: '/',
    component: Pages.LandingPage,
    exact: true
  },
  {
    path: '/home',
    component: Pages.LandingPage,
    exact: true
  },

  // auth & account router
  {
    path: '/login',
    component: Pages.LoginRegisterPage,
    exact: true
  },
  {
    path: '/register',
    component: Pages.RegisterPage,
    exact: true
  },
  {
    path: '/forgot-password',
    component: Pages.ForgotPasswordPage,
    exact: true
  },
  {
    path: '/passwords/edit',
    component: Pages.EditPasswordPage,
    exact: true
  },
  {
    path: '/confirm_account',
    component: Pages.ConfirmationPage,
    exact: true
  },

  // course router
  {
    path: '/courses',
    component: Pages.PublicCourseListPage,
    exact: true
  },
  {
    path: '/courses/:courseId/evaluate/lesson/:bbbRoom',
    component: LessonEvaluationContainer,
    exact: true
  },
  {
    path: '/courses/:slug',
    component: Pages.PublicCourseDetailPage,
    exact: true
  },

  // teacher router
  {
    path: '/teachers/:slug',
    component: TeacherDetailContainer,
    exact: true
  },
  {
    path: '/teachers',
    component: TeacherListContainer,
    exact: true
  },

  // tutor dashboard
  {
    path: '/dashboard/profile',
    component: requireLogin(TutorDashboardProfile),
    roles: [UserRole.TEACHER]
  },
  {
    path: '/dashboard/courses/pending',
    component: requireLogin(TutorDashboardCoursePending),
    roles: [UserRole.TEACHER],
    status: TutorStatus.VERIFIED
  },
  {
    path: '/dashboard/courses/approved',
    component: requireLogin(TutorDashboardCourseApproved),
    roles: [UserRole.TEACHER],
    status: TutorStatus.VERIFIED
  },
  {
    path: '/dashboard/courses/rejected',
    component: requireLogin(TutorDashboardCourseRejected),
    roles: [UserRole.TEACHER],
    status: TutorStatus.VERIFIED
  },
  {
    path: '/dashboard/courses/teaching',
    component: requireLogin(TutorDashboardCourseTeaching),
    roles: [UserRole.TEACHER],
    status: TutorStatus.VERIFIED
  },
  {
    path: '/dashboard/courses/finished',
    component: requireLogin(TutorDashboardCourseFinished),
    roles: [UserRole.TEACHER],
    status: TutorStatus.VERIFIED
  },
  {
    path: '/dashboard/courses/new',
    component: requireLogin(TutorDashboardCourseNew),
    roles: [UserRole.TEACHER],
    status: TutorStatus.VERIFIED
  },
  {
    path: '/dashboard/courses/detail/:id',
    component: requireLogin(TutorDashboardCourseDetail),
    roles: [UserRole.TEACHER],
    status: TutorStatus.VERIFIED
  },
  {
    path: '/dashboard/account',
    component: requireLogin(TutorDashboardAccount),
    roles: [UserRole.TEACHER]
  },

  // student dashboard
  {
    path: '/student/dashboard/profile',
    component: requireLogin(StudentDashboardProfile),
    roles: [UserRole.STUDENT],
    exact: true
  },
  {
    path: '/student/dashboard/courses/enrolled',
    component: requireLogin(StudentDashboardCourseEnrolled),
    roles: [UserRole.STUDENT],
    exact: true
  },
  {
    path: '/student/dashboard/courses/enrolling',
    component: requireLogin(StudentDashboardCourseEnrolling),
    roles: [UserRole.STUDENT],
    exact: true
  },
  {
    path: '/student/dashboard/courses/follow',
    component: requireLogin(StudentDashboardCourseFollow),
    roles: [UserRole.STUDENT],
    exact: true
  },
  {
    path: '/student/dashboard/courses/:id',
    component: requireLogin(StudentDashboardCourseDetails),
    roles: [UserRole.STUDENT],
    exact: true
  },

  // other router
  {
    path: '/payment',
    component: requireLogin(Pages.PaymentPage),
    roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN],
    exact: true
  },
  {
    path: '/about',
    component: AboutUsContainer,
    exact: true
  },
  {
    path: '/help',
    component: HelpCenterContainer,
    exact: true
  },
  {
    path: '/become-a-teacher',
    component: BecomeTeacherContainer,
    exact: true
  },
  {
    path: '/terms',
    component: TermsContainer,
    exact: true
  },
  {
    path: '/privacy',
    component: PrivacyContainer,
    exact: true
  },
  {
    path: '/how-coursedy-works/',
    component: HowCoursedyWorkContainer,
    exact: true
  },
  {
    path: '/how-coursedy-works/:slug',
    component: HowCoursedyWorkDetailContainer,
    exact: true
  },
  {
    path: '*',
    component: Pages.NotFoundPage,
    exact: true
  }
];

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
            { renderRoutes(routes) }
          </Switch>
        </App>
      </Router>
    </div>
  </Provider>
);

export default router;
