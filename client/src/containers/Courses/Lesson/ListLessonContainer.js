import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import styles from './ListLesson.module.scss';
import {
  addLesson, createCourse, deleteLesson, editLessonDetail
} from '../../../actions/CourseFormActionCreator';
import LessonLineComponent from '../../../components/Courses/LessonLineComponent';
import PrimaryButton from '../../../components/Core/PrimaryButton/PrimaryButton';

class ListLessonContainer extends Component {
  constructor(props) {
    super(props);
  }

  editLessonDetail(lessonId) {
    this.props.dispatch(editLessonDetail(lessonId));
  }

  addNewLesson() {
    this.props.dispatch(addLesson());
  }

  deleteNewLesson(lessonId) {
    this.props.dispatch(deleteLesson(lessonId));
  }

  saveCourseWithLesson() {
    this.props.dispatch(createCourse(
      this.props.title,
      this.props.description,
      this.props.start_date,
      this.props.end_date,
      this.props.number_of_students,
      this.props.period,
      this.props.period_type,
      this.props.tuition_fee,
      this.props.currency,
      this.props.cover_image,
      this.props.lessonList
    ));
  }

  render() {
    const { lessonList } = this.props;
    return (
      <div className="d-flex flex-vertical">
        <div className="d-flex flex-auto">
          <PrimaryButton type="button" callback={this.addNewLesson.bind(this)} title={this.context.t('lesson_add_more')} />
        </div>
        <div className="d-flex flex-horizontal flex-wrap mt-20 ">
          <div className="index-lesson-col lesson-col-no-text" />
          <div className="lesson-name-col lesson-col-text">
            <span>{this.context.t('lesson_name')}</span>
          </div>
          <div className="lesson-per-col lesson-col-text">
            <span>{this.context.t(this.context.t('lesson_period'))}</span>
          </div>
          <div className="lesson-del-col lesson-col-no-text" />
          <div className="lesson-add-col lesson-col-no-text" />
        </div>
        {
                    lessonList.map(lesson => (
                      <div key={lesson.posId}>
                        <LessonLineComponent
                          lesson={lesson}
                          showPopupEdit={lesson.showPopupEdit}
                          onDeleteLesson={this.deleteNewLesson.bind(this)}
                          editLessonDetail={this.editLessonDetail.bind(this)}
                          {...this.props}
                        />
                      </div>
                    ))
                }

        <div className="d-flex flex-horizontal">
          <Link to="/dashboard/courses/new" className="btn btn-link-dark signin-btn mr-10">{this.context.t('course_modification')}</Link>
          {lessonList.length > 0
            ? <PrimaryButton type="button" callback={this.saveCourseWithLesson.bind(this)} title={this.context.t('save_course')} /> : null
                    }
        </div>

      </div>
    );
  }
}

ListLessonContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { courseDetails } = state;
  const { lessonCreationForm, courseData } = courseDetails;
  const {
    title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image
  } = courseData;
  const { lessonList, activeLesson } = lessonCreationForm;
  return {
    title,
    description,
    start_date,
    end_date,
    number_of_students,
    period,
    period_type,
    tuition_fee,
    currency,
    cover_image,
    lessonList,
    activeLesson
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'lessonDetailForm',
  fields: ['lessonName', 'lessonPeriod', 'lessonDocument', 'lessonDesciption']
})(cssModules(ListLessonContainer, styles)));
