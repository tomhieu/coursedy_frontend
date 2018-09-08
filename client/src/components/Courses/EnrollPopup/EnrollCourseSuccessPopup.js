import * as React from 'react';
import cssModules from 'react-css-modules';
import { Component } from 'react';
import styles from './EnrollCourseSuccessPopup.module.scss';
import SimpleDialogComponent from '../../Core/SimpleDialogComponent';

class EnrollCourseSuccessPopup extends Component {
  render() {
    const { show, acceptCallback, course } = this.props;
    return (
      <SimpleDialogComponent
        show={show}
        title={this.context.t('enroll_course_success_title')}
        acceptLabel={this.context.t('enroll_course_success_button')}
        acceptCallback={acceptCallback}
      >
        <div className={`${styles.enrollSuccessContent} row`}>
          <div className="col-md-12">
            <span className={styles.enrollSuccessMessage}>{this.context.t('enroll_course_success_message', { courseTitle: <strong>{course.title}</strong> })}</span>
          </div>
          <div className="col-md-12">
            <span className={styles.enrollSuccessMessage}>{this.context.t('enroll_course_success_message_2')}</span>
          </div>
        </div>
      </SimpleDialogComponent>
    );
  }
}

EnrollCourseSuccessPopup.contextTypes = {
  t: React.PropTypes.func.isRequired
};

EnrollCourseSuccessPopup.propTypes = {
  show: React.PropTypes.bool.isRequired,
  acceptCallback: React.PropTypes.func.isRequired,
  course: React.PropTypes.object
};

export default cssModules(EnrollCourseSuccessPopup, styles);
