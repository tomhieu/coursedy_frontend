import React, {Component} from 'react';
import {CourseForm} from '../../components/index';
import {addAndModifyLessonCourse, createCourse, loadCourseDetail} from '../../actions/CourseFormActionCreator'
import * as FilterActions from '../../actions/CourseFilterActionCreator'
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {validate} from '../../validations/CourseFormValidation';

class CourseFormContainer extends Component {
  constructor(props) {
    super(props);
    // store the image preview url. Retrieve from the DropZone(onDrop) or the redux store
    this.coverImage = this.props.cover_image;
  }

  componentWillMount() {
    this.props.dispatch(FilterActions.fetchCategories())
    if (this.props.match.params.id) {
      this.props.dispatch(loadCourseDetail(this.props.match.params.id));
    }
  }

  createCourse({title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency}) {
    this.props.dispatch(createCourse(title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, this.coverImage, this.props.lessonList));
  }

  addLesson() {
    this.props.dispatch(addAndModifyLessonCourse(Object.assign({}, this.props.courseCreationForm, {cover_image: this.coverImage}),
        this.props.lessonList));
    this.context.router.history.push("/dashboard/courses/list-lesson");
  }

  onCategoryChange(e) {
    this.props.dispatch(FilterActions.reloadCourseLevels(this.getSelect2Value(e)))
  }

  getSelect2Value(e){
    let options = e.target.options
    let optionArray = []

    for(var i = 0; i < options.length; i++){
      optionArray[i] = options[i]
    }

    let selectedValues = optionArray.filter((option) => {
      return option.selected
    }).map((option) => {
      return parseInt(option.value)
    })

    return selectedValues
  }

  onDropCoverImage(data) {
    this.coverImage = data;
  }

  render() {
    return (
      <CourseForm
        onSubmit={this.createCourse.bind(this)}
        addLesson={this.addLesson.bind(this)}
        onDropCoverImage={this.onDropCoverImage.bind(this)} {...this.props}
        onCategoryChange={this.onCategoryChange.bind(this)}
      />
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
    initialValues: courseData,
    categories: state.CourseFilter.categories,
    selectedCategoryIds: state.CourseFilter.selectedCategoryIds
  };
};

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'courseCreationForm',
  fields: ['title', 'description', 'start_date', 'end_date', 'number_of_students', 'period', 'period_type', 'tuition_fee', 'currency', 'cover_image', 'category_id', 'course_level_id'],
  validate,
  enableReinitialize: true
})(CourseFormContainer));
