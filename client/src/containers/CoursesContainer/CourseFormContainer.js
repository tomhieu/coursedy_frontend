import React, {Component} from "react";
import {CourseForm} from "../../components/index";
import {addAndModifyLessonCourse, createCourse, loadCourseDetail} from "../../actions/CourseFormActionCreator";
import * as FilterActions from "../../actions/CourseFilterActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../validations/CourseFormValidation";

class CourseFormContainer extends Component {
  constructor(props) {
    super(props);
    // store the image preview url. Retrieve from the DropZone(onDrop) or the redux store
    this.coverImage = this.props.cover_image;
    this.courseId = this.props.match.params.id;
  }

  componentWillMount() {
    this.props.dispatch(FilterActions.fetchCategories())
    if (this.courseId) {
      this.props.dispatch(loadCourseDetail(this.courseId));
    }
  }

  createCourse({title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency}) {
    this.props.dispatch(createCourse(title, description, category_id, course_level_id, start_date, end_date, number_of_students,
        period, period_type, tuition_fee, currency, this.coverImage, this.props.lessonList));
  }

  addLesson() {
    this.props.dispatch(addAndModifyLessonCourse(Object.assign({}, this.props.courseCreationForm, {cover_image: this.coverImage}),
        this.props.lessonList));
    this.context.router.history.push("/dashboard/courses/list-lesson");
  }

  onDropCoverImage(data) {
    this.coverImage = data;
  }

  render() {
    return (
      <CourseForm onSubmit={this.createCourse.bind(this)} addLesson={this.addLesson.bind(this)}
                  onDropCoverImage={this.onDropCoverImage.bind(this)} courseId={this.courseId} {...this.props}/>
    )
  }
}

CourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

CourseFormContainer.propTypes = {

};

const getCourseLevelFromCategory = (categories, selectedCategoryId) => {
    const [selectedCategory = {course_levels: []}] = categories.filter((category) => {
        return selectedCategoryId === category.id;
    });

    return selectedCategory.course_levels.map((level) => {
        return {id: level.id, text: level.name}
    });
}

const mapStateToProps = (state) => {
  const {CourseFormComponent, CourseFilter, form} = state;
  const {courseCreationForm} = form;
  const {lessonCreationForm, courseData} = CourseFormComponent;
  const {lessonList} = lessonCreationForm;
  const {categories} = CourseFilter;
  // retrieve the preview image url from redux store when user navigate back.
  const {cover_image} = courseData;

  return {
    courseCreationForm, lessonList, cover_image,categories,
    initialValues: courseData,
    course_levels: courseCreationForm != undefined ? getCourseLevelFromCategory(categories, Number(courseCreationForm.values.category_id)) : []
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
