import * as React from "react";
import {Component} from "react";
import CourseForm from "../../../components/Courses/CourseForm";
import * as CourseActions from "../../../actions/CourseFormActionCreator";
import {DAYS_IN_WEEK} from "../../../actions/CourseFormActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../../validations/CourseFormValidation"
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
        course.course_specialize_id, this.coverImage));
    } else {
      this.props.dispatch(CourseActions.updateCourse(courseId, course.title, course.description, course.start_date, course.period,
        course.number_of_students, course.tuition_fee, course.currency, course.is_free, week_day_schedules_attributes, course.is_same_period,
        course.cover_image, course.course_specialize_id, this.coverImage));
    }
  }

  onDropCoverImage(data) {
    this.coverImage = data.content;
  }

  render() {
    const {editMode, courseData} = this.props;
    return (
      <CourseForm onSubmit={this.createCourse.bind(this)} onDropCoverImage={this.onDropCoverImage.bind(this)}
                  editMode={editMode} courseData={courseData} courseId={this.courseId} {...this.props}/>
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

const getDayId = (dayName) => {
  const matchedDays = DAYS_IN_WEEK.filter(d => d.name === dayName);
  return matchedDays.length > 0 ? matchedDays[0].id : 0;
}

const initializeCourseDetail = (courseData, categories) => {
  let course_days = [];
  let course_times = {};
  courseData.course_days.forEach(d => {
    course_days.push(d.day + '_' + getDayId(d.day))
    Object.defineProperty(course_times, d.day + '_start_time', {value: d.start_time});
    Object.defineProperty(course_times, d.day + '_end_time', {value: d.end_time});
  });

  // updated the category and course specialize after the list of course category is loaded
  // only update one time
  if (categories.length > 0 && courseData.course_specialize === undefined) {
    const selectSpecialized = courseData.category;
    const selectedCategories = categories.length > 0 ?
      categories.filter((c) => c.children.filter(s => s.id === selectSpecialized.id).length > 0) : [];
    const selectedCategory = selectedCategories.length > 0 ? selectedCategories[0] : {id: 0};

    // update the category and specilize of course
    courseData.course_specialize = selectSpecialized;
    courseData.category = selectedCategory;
    return Object.assign({}, courseData, {course_days: course_days, category_id: selectedCategory.id,
      course_specialize_id: selectSpecialized.id});
  } else {
    return Object.assign({}, courseData, {course_days: course_days});
  }
}

const mapStateToProps = (state) => {
  const {CourseFormComponent, Categories, form} = state
  const {courseCreationForm} = form
  const {editMode, activatedField, createCourseSucess} = CourseFormComponent
  const categories = Categories.data
  const courseData = editMode ? CourseFormComponent.courseData : courseCreationForm != undefined ? courseCreationForm.values : {cover_image: null}

  const course_specializes = !editMode ? getCourseSpecializeFromCategory(categories, courseData.category_id) : courseData.category.children ? courseData.category.children : []

  const course_levels = course_specializes.length > 0 ? getCourseLevels(course_specializes, courseData.course_specialize_id) : []

  const selectedDays = courseCreationForm && courseCreationForm.values.course_days ? DAYS_IN_WEEK.filter((day) => courseCreationForm.values.course_days.indexOf(day.name + "_" + day.id) >= 0) : []
  const isSamePeriod = courseCreationForm && courseCreationForm.values.is_same_period != undefined ? courseCreationForm.values.is_same_period : true
  const isFree = courseCreationForm && courseCreationForm.values.is_free ? courseCreationForm.values.is_free : false

  const initializedValue = editMode ? initializeCourseDetail(courseData, categories) : {is_same_period: true}
  return {
    courseCreationForm, courseData, categories, editMode, createCourseSucess, isSamePeriod, isFree,
    cover_image: !courseData ? null : courseData.cover_image,
    courseSpecializes: course_specializes,
    course_levels: course_levels,
    selectedDays,
    initialValues: initializedValue
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