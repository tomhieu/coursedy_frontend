import React, { Component } from 'react';
import { CourseForm } from '../../components/index';
import * as Actions from '../../actions/CourseFormActionCreator'
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {validate} from '../../validations/CourseFormValidation';
import {loadCourseDetail} from "../../actions/CourseFormActionCreator";

class CourseFormContainer extends Component {
  constructor(props) {
    super(props);
    // store the image preview url. Retrieve from the DropZone(onDrop) or the redux store
    this.coverImage = this.props.cover_image;
    this.courseId = this.props.match.params.id;
  }

  componentWillMount() {
    if (this.courseId) {
      this.props.dispatch(loadCourseDetail(this.courseId));
    }
  }

  createCourse({title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency}) {
    this.props.dispatch(Actions.createCourse(title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, this.coverImage, this.props.lessonList));
  }

  addLesson() {
    this.props.dispatch(Actions.addAndModifyLessonCourse(Object.assign({}, this.props.courseCreationForm, {cover_image: this.coverImage}),
        this.props.lessonList));
    this.context.router.history.push("/dashboard/courses/list-lesson");
  }

  onDropCoverImage(data) {
    this.coverImage = data;
  }

  render() {
    return (
      <CourseForm onSubmit={this.createCourse.bind(this)} addLesson={this.addLesson.bind(this)} onDropCoverImage={this.onDropCoverImage.bind(this)} courseId={this.courseId} {...this.props}/>
    )
  }
}

CourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

CourseFormContainer.propTypes = {

};

const mapStateToProps = (state) => {
  const {CourseFormComponent, form} = state;
  const {courseCreationForm} = form;
  const {lessonCreationForm, courseData} = CourseFormComponent;
  const {lessonList} = lessonCreationForm;
  // retrieve the preview image url from redux store when user navigate back.
  const {cover_image} = courseData;

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
