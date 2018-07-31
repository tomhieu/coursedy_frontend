import {Component} from "react";
import * as React from "react";
import StudentItem from "../../../components/Student/StudentItem/StudentItem";
import cssModules from 'react-css-modules';
import styles from './ListEnrolledStudent.module.scss';
import {connect} from "react-redux";
import {FETCH_ENROLLED_STUDENT} from "../../../actions/AsyncActionCreator";
import Network from "utils/network";
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import * as WebConstant from "../../../constants/WebConstants";

class ListEnrolledStudent extends Component {
  componentWillMount() {
    this.props.fetchListEnrolledStudent(this.props.courseId);
  }
  render() {
    const {enrolledStudents, isFetching} = this.props;
    if (!isFetching && enrolledStudents.length === 0) {
      return (
        <div className="d-flex flex-auto no-enrolled-student">
          {this.context.t('no_enrolled_student')}
        </div>
      )
    }
    return (
      <LoadingMask placeholderId="LIST_ENROLLED_STUDENT_PLACEHOLDER">
        <div className="row">
          <div className="col-md-12">
            <div className={"row flex-auto " + styles.headerLine}>
              <div className="col-xl-5 col-sm-12">
                <div className="row">
                  <div className="col-md-9 col-sm-12">
                    <div className={styles.enrolledStudentHeader + ' ' + styles.studentName}>{this.context.t('student_name')}</div>
                  </div>
                  <div className="col-md-3 col-sm-12">

                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-sm-12">
                <div className="row">
                  <div className="col-md-2 col-sm-4">
                    <div className={styles.enrolledStudentHeader}>{this.context.t('enrollment_date')}</div>
                  </div>
                  <div className="col-md-2 col-sm-4">
                    <div className={styles.enrolledStudentHeader}>{this.context.t('student_gender')}</div>
                  </div>
                  <div className="col-md-6 col-sm-4">
                    <div className={styles.enrolledStudentHeader}>{this.context.t('student_email')}</div>
                  </div>
                  <div className="col-md-2 col-sm-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              {
                enrolledStudents.map((student) =>
                  <div className="col-md-12">
                    <StudentItem student={student}></StudentItem>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </LoadingMask>
    )
  }
}

ListEnrolledStudent.contextTypes = {
  t: React.PropTypes.func.isRequired
}

ListEnrolledStudent.propTypes = {
  // the public course will have some additional feature like following
  enrolledStudents: React.PropTypes.object.isRequired,
  courseId: React.PropTypes.number.isRequired,
  isFetching: React.PropTypes.bool
};

const mapStateToProps = (state) => {
  const {EnrolledStudentList} = state;
  const {enrolledStudents, isFetching} = EnrolledStudentList;
  return { enrolledStudents, isFetching };
};

const mapDispatchToProps = (dispatch) => ({
  fetchListEnrolledStudent: (courseId) => dispatch({
    type: FETCH_ENROLLED_STUDENT,
    payload: Network().get(`courses/${courseId}/participants`, {per_page: 100}),
    meta: WebConstant.LIST_ENROLLED_STUDENT_PLACEHOLDER
  })
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(ListEnrolledStudent, styles));