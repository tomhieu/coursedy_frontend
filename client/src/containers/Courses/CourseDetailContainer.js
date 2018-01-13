import * as React from "react";
import {Component} from "react";
import CourseForm from "../../components/Courses/CourseForm";
import * as CourseActions from "../../actions/CourseFormActionCreator";
import {DAYS_IN_WEEK} from "../../actions/CourseFormActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../validations/CourseFormValidation"
import LoadingMask from "../../components/LoadingMask/LoadingMask";
import DateUtils from "utils/DateUtils";

class CourseDetailContainer extends Component {
  constructor(props) {
    super(props);
    // store the image preview url. Retrieve from the DropZone(onDrop) or the redux store
    this.coverImage = this.props.cover_image;
  }

  createCourse(course) {
    const {courseId} = this.props;
    const week_day_schedules_attributes = [];
    course.course_days.forEach((day) => {
      const name_day = day.split("_")[0]
      const id_day = day.split("_")[1]
      week_day_schedules_attributes.push({
        day: Number(id_day),
        start_time: !course.is_same_period ? DateUtils.getHourFromDate(Object.getOwnPropertyDescriptor(course, name_day + '_start_time').value) :
          DateUtils.getHourFromDate(Object.getOwnPropertyDescriptor(course, 'start_time').value),
        end_time: !course.is_same_period ? DateUtils.getHourFromDate(Object.getOwnPropertyDescriptor(course, name_day + '_end_time').value) :
          DateUtils.getHourFromDate(Object.getOwnPropertyDescriptor(course, 'end_time').value)
      })
    })

    if (!courseId) {
      this.props.dispatch(CourseActions.createCourse(course.title, course.description, course.start_date, course.period,
        course.number_of_students, course.tuition_fee, course.currency, course.is_free, week_day_schedules_attributes, course.is_same_period,
        course.category_id, course.course_specialize, this.coverImage));
    } else {
      this.props.dispatch(CourseActions.updateCourse(courseId, course.title, course.description, course.start_date, course.period,
        course.number_of_students, course.tuition_fee, course.currency, course.is_free, week_day_schedules_attributes, course.is_same_period,
        course.cover_image, course.category_id, course.course_specialize, this.coverImage));
    }
  }

  onDropCoverImage(data) {
    this.coverImage = data.content;
  }

  render() {
    const {editMode, courseData} = this.props;
    return (
      <LoadingMask>
        <CourseForm onSubmit={this.createCourse.bind(this)} onDropCoverImage={this.onDropCoverImage.bind(this)}
                    editMode={editMode} courseData={courseData} courseId={this.courseId} {...this.props}/>
      </LoadingMask>
    )
  }
}

CourseDetailContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

CourseDetailContainer.propTypes = {};

const getCourseSpecializeFromCategory = (categories, selectedCategoryId) => {
  const [selectedCategory = {children: []}] = categories.filter((category) => {
    return Number(selectedCategoryId) === category.id;
  });

  return selectedCategory.children.map((level) => {
    return {id: level.id, text: level.name}
  });
}

const getCourseLevels = (specializes, selectedLevelId) => {
  const [selectedSpecialize = {course_levels: []}] = specializes.filter((spec) => {
    return Number(selectedLevelId) === spec.id;
  });

  return selectedSpecialize.course_levels.map((level) => {
    return {id: level.id, text: level.name}
  });
}

const mapStateToProps = (state) => {
  const {CourseFormComponent, Categories, form} = state
  const {courseCreationForm} = form
  const {editMode, activatedField, createCourseSucess} = CourseFormComponent
  const categories = Categories.data
  const courseData = editMode ? CourseFormComponent.courseData : courseCreationForm != undefined ? courseCreationForm.values : {cover_image: null}

  const course_specializes = courseData ? getCourseSpecializeFromCategory(categories, courseData.category_id) : []

  const course_levels = course_specializes.length > 0 ? getCourseLevels(course_specializes, courseData.specialize_id) : []

  const selectedDays = courseCreationForm && courseCreationForm.values.course_days ? DAYS_IN_WEEK.filter((day) => courseCreationForm.values.course_days.indexOf(day.name + "_" + day.id) >= 0) : []
  const isSamePeriod = courseCreationForm && courseCreationForm.values.is_same_period != undefined ? courseCreationForm.values.is_same_period : true
  const isFree = courseCreationForm && courseCreationForm.values.is_free ? courseCreationForm.values.is_free : false

  return {
    courseCreationForm, courseData, categories, editMode, createCourseSucess, isSamePeriod, isFree,
    cover_image: !courseData ? null : courseData.cover_image,
    courseSpecializes: course_specializes,
    course_levels: course_levels,
    selectedDays,
    initialValues: editMode ? activatedField != null ? courseData : {} : {is_same_period: true}
  }
}

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'courseCreationForm',
  fields: ['title', 'description', 'start_date', 'period',
    'number_of_students', 'tuition_fee', 'currency', 'is_free', 'course_days', 'is_same_period', 'start_time', 'end_time',
    'monday_start_time', 'monday_end_time', 'tuesday_start_time', 'tuesday_end_time',
    'wednesday_start_time', 'wednesday_end_time', 'thursday_start_time', 'thursday_end_time',
    'friday_start_time', 'friday_end_time', 'saturday_start_time', 'saturday_end_time', 'sunday_start_time', 'sunday_end_time',
    'cover_image', 'category_id', 'course_specialize'],
  validate,
  enableReinitialize: true
})(CourseDetailContainer));