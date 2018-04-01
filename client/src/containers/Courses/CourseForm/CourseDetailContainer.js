import * as React from "react";
import {Component} from "react";
import CourseForm from "../../../components/Courses/CourseForm/CourseForm";
import * as CourseActions from "../../../actions/CourseFormActionCreator";
import {DAYS_IN_WEEK} from "../../../actions/CourseFormActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../../validations/CourseFormValidation"
import DateUtils from "utils/DateUtils";
import ObjectUtils from "utils/ObjectUtils";

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
        start_time: this.getStartTime(course, name_day),
        end_time: this.getEndTime(course, name_day)
      })
    })

    if (!courseId) {
      this.props.dispatch(CourseActions.createCourse(course.title, course.description, course.start_date, course.period,
        course.number_of_students, course.tuition_fee, course.currency, course.is_free, week_day_schedules_attributes, course.is_same_period,
        course.course_specialize_id, this.coverImage));
    } else {
      this.props.dispatch(CourseActions.updateCourse(courseId, course.title, course.description, course.start_date, course.period,
        course.number_of_students, course.tuition_fee, course.currency, course.is_free, week_day_schedules_attributes, course.is_same_period,
        course.course_specialize_id, this.coverImage));
    }
  }

  getStartTime(course, name_day) {
    let start_time = !course.is_same_period ? Object.getOwnPropertyDescriptor(course, name_day + '_start_time') :
      Object.getOwnPropertyDescriptor(course, 'start_time_id');

    if (start_time === undefined) {
      // in case update course, load course time from week_day_schedules
      return course.week_day_schedules.filter(d => d.day === name_day)[0].start_time;
    } else {
      // in case create new course
      return DateUtils.getHourFromDate(start_time.value);
    }
  }

  getEndTime(course, name_day) {
    const end_time = !course.is_same_period ? Object.getOwnPropertyDescriptor(course, name_day + '_end_time') :
      Object.getOwnPropertyDescriptor(course, 'end_time_id');

    if (end_time === undefined) {
      // in case update course, load course time from week_day_schedules
      return course.week_day_schedules.filter(d => d.day === name_day)[0].end_time;
    } else {
      // in case create new course
      return DateUtils.getHourFromDate(end_time.value);
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

/**
 * retreived list of course specialize from category.
 * Because, the webservice return the course_category value from the course specialize.
 * So, we need to lookup from category_id and category.children (Course specialize)
 * @type {{children: Array}}
 */
const updateCourseCategoryAndSpecialize = (categories, course) => {
  if (course.course_specialize != undefined && course.course_specialize != null) {
    const [selectedCategory = {children: []}] = categories.filter((category) => {
      return Number(course.course_specialize.id) === category.id
        || category.children.filter((specialize) => specialize.id === category.id);
    });

    return selectedCategory;
  } else {
    return {children: []};
  }
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
  
  if (Array.isArray(courseData.course_days)) {
    courseData.course_days.forEach(d => {
      course_days.push(d.day + '_' + getDayId(d.day))
      Object.defineProperty(course_times, d.day + '_start_time', {value: d.start_time, writable: true});
      Object.defineProperty(course_times, d.day + '_end_time', {value: d.end_time, writable: true});
    });
  }

  return Object.assign({}, courseData, {course_days: course_days});
}

const mapStateToProps = (state) => {
  const {courseDetails, referenceData, form} = state
  const courseFormValues = form.courseCreationForm && form.courseCreationForm.values ? form.courseCreationForm.values : null
  const {editMode} = courseDetails
  const {courseCategories} = referenceData

  const selectedDays = courseFormValues != null ?
    DAYS_IN_WEEK.filter((day) => courseFormValues.course_days.indexOf(day.name + "_" + day.id) >= 0) : []
  const isSamePeriod = courseFormValues != null ? ObjectUtils.isTrue(courseFormValues.is_same_period) : true
  const isFree = courseFormValues != null ? ObjectUtils.isTrue(courseFormValues.is_free) : false

  let course_specializes = [];
  let course_levels = [];
  let courseData = null;

  if (editMode && courseDetails.courseData != null) {
    courseData = courseDetails.courseData;
  } else if (courseFormValues != null) {
    courseData = courseFormValues;
  }

  if (courseData != null) {
    const courseCategory = updateCourseCategoryAndSpecialize(courseCategories, courseData);
    courseData.category = courseCategory
    course_specializes = courseCategory.children;
    course_levels = getCourseLevels(course_specializes, courseData.course_specialize_id);
  }

  const initializedValue = editMode && courseData != null ? initializeCourseDetail(courseData, courseCategories) : {is_same_period: true}
  return {
    courseData, editMode, isSamePeriod, isFree, selectedDays,
    categories: courseCategories,
    cover_image: !courseData ? null : courseData.cover_image,
    courseSpecializes: course_specializes,
    course_levels: course_levels,
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