import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorCourseItem.module.scss';
import PrimaryButton from "../../Core/PrimaryButton/PrimaryButton";
import TrashIcon from "../../Core/Icons/TrashIcon";
import SettingIcon from "../../Core/Icons/SettingIcon";
import DetailsIcon from "../../Core/Icons/DetailsIcon";
import ListEnrolledStudent from "../../../containers/Courses/TutorCourse/ListEnrolledStudent";
import {TT} from "utils/locale";
import ObjectUtils from "utils/ObjectUtils";
import {CourseStatus} from "../../../constants/CourseStatus";
import SimpleDialogComponent from "../../Core/SimpleDialogComponent";
import CheckIcon from "../../Core/Icons/CheckIcon";

class TutorCourseItem extends Component {
  constructor() {
    super();
    this.state = {
      showStudentList: false,
      showPopup: false,
      popupTitle: '',
      popupMessage: '',
      acceptCallback: null
    }
  }

  showEnrolledStudentList() {
    const showStudentList = this.state.showStudentList;
    this.setState({showStudentList: !showStudentList});
  }

  openCourseDetails(courseId) {
    this.props.openCourseDetails(courseId);
  }

  showDeleteWarning(course) {
    this.setState({
      showPopup: true,
      popupTitle: this.context.t('alert_popup'),
      popupMessage: this.context.t('delete_course_warning_message', {courseName: course.title}),
      acceptCallback: () => {
        this.props.deleteCourse(course.id);
      }
    })
  }

  showStartCourseWarning(course) {
    this.setState({
      showPopup: true,
      popupTitle: this.context.t('alert_popup'),
      popupMessage: this.context.t('start_course_warning_message', {courseName: course.title}),
      acceptCallback: () => {
        this.props.startCourse(course.id);
      }
    })
  }

  closePopup() {
    this.setState({showPopup: false});
  }

  render() {
    const {course, startCourse, deleteCourse, openCourseDetails} = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className={"row flex-auto align-items-center " + styles.courseTutorContainer}>
            <div className="col-xl-5 col-sm-12">
              <div className="row">
                <div className="col-md-9 col-sm-12">
                  <div className="d-flex flex-row align-items-center">
                    <a onClick={this.showEnrolledStudentList.bind(this)}>
                      {
                        this.state.showStudentList ? <CheckIcon isActive={true} width={18} height={11}/> : <DetailsIcon/>
                      }
                    </a>
                    <a className={styles.courseAvatarImage}><img src={course.cover_image} /></a>
                    <div className="d-flex flex-column">
                      <div className={styles.courseTitle}>{course.title}</div>
                      <div className={styles.courseSubTitle}>{course.category.name}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 d-flex align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine}></div>
                    <div className={styles.courseNumberData + ' ' + styles.fee}>
                      {ObjectUtils.currencyFormat(course.tuition_fee, course.currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-sm-12">
              <div className="row align-items-center">
                <div className="col-md-2 col-sm-4">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine}></div>
                    <div className={styles.courseNumberData}>{course.student_count}</div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-4">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine}></div>
                    <div className={styles.courseNumberData}>{course.number_of_students}</div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-4">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine}></div>
                    <div className={styles.courseNumberData}>{course.lesson_count}</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine}></div>
                    {
                      course.status === CourseStatus.NOT_STARTED ?
                        <div className={styles.courseStatus + ' ' + styles.notStart}>{TT.t(course.status)}</div> :
                        course.status === CourseStatus.STARTED ?
                          <div className={styles.courseStatus + ' ' + styles.started}>{TT.t(course.status)}</div> :
                          <div className={styles.courseStatus + ' ' + styles.finished}>{TT.t(course.status)}</div>
                    }
                  </div>
                </div>
                <div className="col-md-3 col-sm-4">
                  <div className="d-flex flex-row align-items-center justify-content-right">
                    <div className={styles.leftSeperateLine}></div>
                    <PrimaryButton isSmallButton={true} round={true} line={false} customClasses="start-course-btn"
                                   callback={this.showStartCourseWarning.bind(this, course)}
                                   title={TT.t('start_course')}>
                    </PrimaryButton>
                    <a className={styles.courseActionButton} onClick={this.showDeleteWarning.bind(this, course)}>
                      <TrashIcon width={11} height={21}></TrashIcon>
                    </a>
                    <a className={styles.courseActionButton} onClick={this.openCourseDetails.bind(this, course.id)}>
                      <SettingIcon width={14} height={14}></SettingIcon>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {
            this.state.showStudentList ? <ListEnrolledStudent courseId={course.id}></ListEnrolledStudent> : null
          }
        </div>
        <SimpleDialogComponent show={this.state.showPopup}
                               title={this.state.popupTitle}
                               acceptCallback={this.state.acceptCallback}
                               cancelCallback={this.closePopup.bind(this)}>
          <div>{this.state.popupMessage}</div>
        </SimpleDialogComponent>
      </div>
    )
  }
}

TutorCourseItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorCourseItem.propTypes = {
  // the public course will have some additional feature like following
  course: React.PropTypes.object.isRequired,
  startCourse: React.PropTypes.func,
  deleteCourse: React.PropTypes.func,
  openCourseDetails: React.PropTypes.func
};

export default cssModules(TutorCourseItem, styles);