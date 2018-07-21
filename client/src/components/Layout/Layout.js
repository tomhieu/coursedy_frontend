import React, {Component} from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import I18n from "redux-i18n"
import {translations} from "translations"
import {TT} from 'utils/locale'
import LoadingMask from "../LoadingMask/LoadingMask";
import ScrollToTop from 'utils/ScrollToTop'
import {joinToClassRoom} from "../../actions/ListTutorCourseActionCreator";
import {UserRole} from "../../constants/UserRole";
import UpcommingCourseNotificationPopup from "./UpcommingCoursePopup/UpcommingCourseNotificationPopup";
import {success} from "react-notification-system-redux";
import NotificationSystemComponent from "./NotificationSystem/NotificationSystemComponent";
import SimpleDialogComponent from "../Core/SimpleDialogComponent";

class Layout extends Component {

  componentWillReceiveProps(nextProps) {
    const {hasActiveCourseToLearn, isJoiningActiveClass, currentUser} = nextProps.session;
    if (hasActiveCourseToLearn && currentUser && !isJoiningActiveClass) {
      this.startPoll(currentUser);
    } else {
      clearTimeout(this.timeout);
    }
  }

  componentDidMount() {
    const {session} = this.props;
    if (!session.hasActiveCourseToLearn) {
      return;
    }

    this.checkUpcommingCourse(session.currentUser);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }


  startPoll(currentUser) {
    this.timeout = setTimeout(() => {
      this.checkUpcommingCourse(currentUser);
    }, 200000);
  }

  checkUpcommingCourse(currentUser) {
    if (currentUser.roles.indexOf(UserRole.TEACHER) >= 0) {
      this.props.fetchUpCommingTeacherCourse();
    } else if (currentUser.roles.indexOf(UserRole.STUDENT) >= 0) {
      this.props.fetchUpCommingStudentCourse();
    }
  }

  acceptJoinToClassRoom(classRoomId) {
    clearTimeout(this.timeout);
    // closed popup
    this.props.closePopupJoinUpcomingClass();
    // join to class
    joinToClassRoom(classRoomId);
    // executed after joining an active class
    this.props.afterJoinUpcomingClass();
  }

  executeConfirmCallback(callback) {
    callback();
    this.props.closeConfirmationPopup();
  }

  render() {
    const {main, session, notifications} = this.props;
    const {showConfirmationPopup, confirmationTitle, confirmationMessage, confirmCallback} = main;
    const teachingCourseTeacherName = session.teachingCourse !== null ? session.teachingCourse.user.name : '';
    const teachingCourseName = session.teachingCourse !== null ? session.teachingCourse.title : '';
    const teachingCourseId = session.teachingCourse !== null ? session.teachingCourse.id : '';
    const classRoomId = session.teachingCourse !== null ? session.teachingCourse.bigbluebutton_room.slug : '';

    // get new started courses
    const {newStartedCourses} = session;

    return (
      <I18n translations={translations} initialLang={TT.locale}>
        <ScrollToTop>
          <div className="main-content">
            <Header session={session} {...this.props} />
            <main className='container'>
              {this.props.children}
            </main>
            {
              main.showFooter ? <Footer/> : null
            }
            <div className="general-placeholder">
              <LoadingMask placeholderId="ezylearningFullLoader" isFullLoading={true}></LoadingMask>
            </div>
            <div className="confirmation-popup">
              <SimpleDialogComponent show={showConfirmationPopup}
                                     title={confirmationTitle}
                                     cancelCallback={this.props.closeConfirmationPopup.bind(this)}
                                     acceptCallback={confirmCallback ? this.executeConfirmCallback.bind(this, confirmCallback) : undefined}>
                <div>{confirmationMessage}</div>
              </SimpleDialogComponent>
            </div>
            <div className="join-course">
              <UpcommingCourseNotificationPopup teacherName={teachingCourseTeacherName}
                                                currentUser={session.currentUser}
                                                courseName={teachingCourseName}
                                                courseId={teachingCourseId} isShowPopup={session.teachingCourse !== null}
                                                classRoomId={classRoomId}
                                                acceptJoinToClassRoom={this.acceptJoinToClassRoom.bind(this)}
                                                closePopupJoinUpcomingClass={this.props.closePopupJoinUpcomingClass.bind(this)}>
              </UpcommingCourseNotificationPopup>
            </div>
            <div className="notification-system-container">
              <NotificationSystemComponent newStartedCourses={newStartedCourses} {...this.props}></NotificationSystemComponent>
            </div>
          </div>
        </ScrollToTop>
      </I18n>
    )
  }
}

Layout.propTypes = {
  main: React.PropTypes.object,
  session: React.PropTypes.object
};

export default Layout;
