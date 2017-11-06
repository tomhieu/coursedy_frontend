import React, { Component } from 'react';
import { CourseForm } from '../../components/index';
import * as Actions from '../../actions/CourseFormActionCreator'
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {validate} from '../../validations/CourseFormValidation'

class CourseFormContainer extends Component {
  constructor(props) {
    super(props);
    this.coverImage = null;
  }
  createCourse({title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image}) {
    this.props.dispatch(Actions.createCourse(title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image));
  }

  addLesson() {
    debugger
    this.props.dispatch(Actions.addAndModifyLessonCourse(Object.assign({}, this.props.courseCreationForm, {cover_image: this.coverImage}),
        this.props.lessonList));
  }

  onDropCoverImage(data) {
    this.coverImage = data;
  }

  render() {
    return (
      <CourseForm onSubmit={this.createCourse.bind(this)} addLesson={this.addLesson.bind(this)} onDropCoverImage={this.onDropCoverImage.bind(this)} {...this.props}/>
    );
  }
}

CourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFormContainer.propTypes = {

};

const mapStateToProps = (state) => {
  const {CourseFormComponent, form} = state;
  const {courseCreationForm} = form;
  const {lessonCreationForm, courseData} = CourseFormComponent;
  const {lessonList} = lessonCreationForm;
  const {cover_image} = courseData;
    debugger
  return {
    courseCreationForm, lessonList, cover_image,
    initialValues: courseData
  };
};

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'courseCreationForm',
  fields: ['title', 'description', 'start_date', 'end_date', 'number_of_students', 'period', 'period_type', 'tuition_fee', 'currency', 'cover_image'],
  validate,
  enableReinitialize: true
})(CourseFormContainer));
