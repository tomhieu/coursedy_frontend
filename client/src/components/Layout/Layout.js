import React, {Component} from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import I18n from "redux-i18n"
import {translations} from "../../translations"
import {TT} from '../../utils/locale'
import LoadingMask from "../LoadingMask/LoadingMask";
import SimpleDialogComponent from "../Core/SimpleDialogComponent";
import {joinToClassRoom} from "../../actions/ListTutorCourseActionCreator";
import {UserRole} from "../../constants/UserRole";

class Layout extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasActiveCourseToLearn) {
      this.startPoll(this.props.currentUser);
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
    }, 5000);
  }

  checkUpcommingCourse(currentUser) {
    if (currentUser.roles.indexOf(UserRole.TEACHER)) {
      this.props.fetchUpCommingTeacherCourse();
    }

    if (currentUser.roles.indexOf(UserRole.STUDENT)) {
      this.props.fetchUpCommingStudentCourse();
    }
  }

  render() {
    const {main, session} = this.props;
    const classRoomId = session.teachingCourse ? session.teachingCourse.bigbluebutton_room.slug : '';
    return (
      <I18n translations={translations} initialLang={TT.locale}>
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
          <div className="join-course">
            <SimpleDialogComponent show={session.teachingCourse !== null} title={TT.t('join_active_course_popup_title')} acceptCallback={joinToClassRoom.bind(this, classRoomId)}/>
          </div>
        </div>
      </I18n>
    )
  }
}

Layout.propTypes = {
  main: React.PropTypes.object,
  session: React.PropTypes.object
};

export default Layout;