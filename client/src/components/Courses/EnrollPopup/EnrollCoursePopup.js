import * as React from 'react';
import cssModules from 'react-css-modules';
import { Component } from 'react';
import styles from './EnrollCoursePopup.module.scss';
import SimpleDialogComponent from '../../Core/SimpleDialogComponent';
import CheckCircleIcon from '../../Core/Icons/CheckCircleIcon';

class EnrollCoursePopup extends Component {
  render() {
    const {
      show, course, cancelCallback, acceptCallback
    } = this.props;
    return (
      <SimpleDialogComponent
        show={show}
        title={this.context.t('enroll_course_title')}
        cancelCallback={cancelCallback}
        acceptCallback={acceptCallback}
        acceptLabel={this.context.t('enroll_course_button')}
        customClass="enroll-popup"
      >
        <div className="row padding-15">
          <div className="col-md-12">
            <h5 className="mb-16">{this.context.t('enroll_course_message', { courseTitle: <strong>{course ? course.title : ''}</strong> })}</h5>
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('enroll_course_term_1')}
              subTerm={this.context.t('enroll_course_sub_term_1')}
            />
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('enroll_course_term_2')}
              subTerm={this.context.t('enroll_course_sub_term_2')}
            />
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('enroll_course_term_3', { courseFee: course ? course.tuition_fee : 0 })}
              subTerm={this.context.t('enroll_course_sub_term_3', {
                chargeFee: <span className="highlight-term">{this.context.t('enroll_course_charge_fee')}</span>
              })}
            />
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('enroll_course_term_4')}
              subTerm={this.context.t('enroll_course_sub_term_4')}
            />
          </div>
        </div>
      </SimpleDialogComponent>
    );
  }
}

function CourseTermLine(props) {
  const { term, subTerm } = props;
  return (
    <div className={`${styles.termLineContainer} d-flex flex-row`}>
      <div className={styles.iconCheck}>
        <CheckCircleIcon fillColor="#FF7F45" />
      </div>
      <div className="d-flex flex-column">
        <span className={styles.termContent}>{term}</span>
        <span>{subTerm}</span>
      </div>
    </div>
  );
}

EnrollCoursePopup.contextTypes = {
  t: React.PropTypes.func.isRequired
};

EnrollCoursePopup.propTypes = {
  show: React.PropTypes.bool.isRequired,
  course: React.PropTypes.object.isRequired,
  cancelCallback: React.PropTypes.func.isRequired,
  acceptLabel: React.PropTypes.string,
  cancelLabel: React.PropTypes.string,
  acceptCallback: React.PropTypes.func,
};

export default cssModules(EnrollCoursePopup, styles);
