import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ObjectUtils from 'utils/ObjectUtils';
import Network from 'utils/network';
import CourseForm from '../../../components/Courses/CourseForm/CourseForm';
import * as CourseActions from '../../../actions/CourseFormActionCreator';
import { DAYS_IN_WEEK } from '../../../actions/CourseFormActionCreator';
import * as AsyncAction from '../../../actions/AsyncActionCreator';
import { validate } from '../../../validations/CourseFormValidation';
import { CREATE_NEW_COURSE } from '../../../actions/AsyncActionCreator';
import { UPDATE_COURSE } from '../../../actions/AsyncActionCreator';

class CourseDetailContainer extends Component {
  constructor(props) {
    super(props);
    // store the image preview url. Retrieve from the DropZone(onDrop) or the redux store
    this.coverImage = this.props.cover_image;
  }

  createCourse(course) {
    const { courseId } = this.props;
    const week_day_schedules_attributes = [];
    course.course_days.forEach((day) => {
      const name_day = day.split('_')[0];
      const id_day = day.split('_')[1];
      week_day_schedules_attributes.push({
        day: Number(id_day),
        start_time: this.getStartTime(course, name_day),
        end_time: this.getEndTime(course, name_day)
      });
    });

    let courseFee = course.tuition_fee;
    if (!Number.isInteger(courseFee)) {
      courseFee = Number(course.tuition_fee.replace(/[^0-9]/g, ''));
    }

    const updatedCourse = {
      title: course.title,
      description: course.description,
      start_date: course.start_date,
      period: course.period,
      number_of_students: course.number_of_students,
      tuition_fee: courseFee,
      currency: course.currency,
      is_free: course.is_free,
      week_day_schedules_attributes,
      is_same_period: course.is_same_period,
      category_id: course.course_specialize_id
    };

    if (courseId) {
      updatedCourse.id = courseId;
      this.props.updateCourse(courseId, updatedCourse);
    } else {
      updatedCourse.cover_image = this.coverImage;
      this.props.createCourse(updatedCourse);
    }
  }

  getStartTime(course, name_day) {
    const start_time = !course.is_same_period ? Object.getOwnPropertyDescriptor(course, `${name_day}_start_time`)
      : Object.getOwnPropertyDescriptor(course, 'start_time');

    if (start_time === undefined) {
      // in case update course, load course time from week_day_schedules
      const [startDay] = course.week_day_schedules.filter(d => d.day === name_day);
      return startDay !== undefined ? startDay.start_time : null;
    }
    // in case create new course
    return start_time.value;
  }

  getEndTime(course, name_day) {
    const end_time = !course.is_same_period ? Object.getOwnPropertyDescriptor(course, `${name_day}_end_time`)
      : Object.getOwnPropertyDescriptor(course, 'end_time');

    if (end_time === undefined) {
      // in case update course, load course time from week_day_schedules
      return course.week_day_schedules.filter(d => d.day === name_day)[0].end_time;
    }
    // in case create new course
    return end_time.value;
  }

  onDropCoverImage(data) {
    this.coverImage = data;
    if (this.props.courseId && this.props.courseId > 0) {
      this.props.updateCourse(this.props.courseId, { cover_image: this.coverImage });
    }
  }

  onEditTechingDay() {
    this.props.reset();
    this.props.doEditTechingDay();
  }

  onEditCategory() {
    this.props.reset();
    this.props.doEditCourseCategory();
  }


  onEditFee() {
    this.props.reset();
    this.props.doEditCourseFee();
  }

  onActivatedField(fieldIds) {
    this.props.activatedEditField(fieldIds);
  }

  onClosedField(fieldIds) {
    this.props.reset();
    this.props.closedEditField(fieldIds);
  }

  render() {
    const { editMode, courseData, canEditable } = this.props;
    return (
      <CourseForm
        onSubmit={this.createCourse.bind(this)}
        onDropCoverImage={this.onDropCoverImage.bind(this)}
        onEditTechingDay={this.onEditTechingDay.bind(this)}
        onEditCourseCategory={this.onEditCategory.bind(this)}
        onEditCourseFee={this.onEditFee.bind(this)}
        onActivatedField={this.onActivatedField.bind(this)}
        onClosedField={this.onClosedField.bind(this)}
        editMode={editMode}
        courseData={courseData}
        courseId={this.courseId}
        canEditable={canEditable}
        {...this.props}
      />
    );
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
  if (categories.length > 0 && course.course_specialize != undefined && course.course_specialize != null) {
    const [selectedCategory = { children: [] }] = categories.filter((category) => {
      return category.children.filter(specialize => specialize.id === Number(course.course_specialize.id)).length > 0;
    });

    return selectedCategory;
  }
  return { children: [] };
};

const getCourseLevels = (specializes, selectedLevelId) => {
  const [selectedSpecialize = { course_levels: [] }] = specializes.filter((spec) => {
    return Number(selectedLevelId) === spec.id;
  });

  return selectedSpecialize.course_levels.map((level) => {
    return { id: level.id, text: level.name };
  });
};

const getDayId = (dayName, lang = 'vn') => {
  const matchedDays = DAYS_IN_WEEK(lang).filter(d => d.name === dayName);
  return matchedDays.length > 0 ? matchedDays[0].id : 0;
};

const initializeCourseDetail = (courseData, lang = 'vn') => {
  const course_days = [];

  if (Array.isArray(courseData.course_days)) {
    courseData.course_days.forEach((d) => {
      course_days.push(`${d.day}_${getDayId(d.day, lang)}`);
    });
  }
  return Object.assign({}, courseData, { course_days });
};

const mapStateToProps = (state) => {
  const { courseDetails, referenceData, form } = state;
  const courseFormValues = form.courseCreationForm && form.courseCreationForm.values ? form.courseCreationForm.values : null;
  const {
    editMode, editTeachingDay, editCourseCategory, editCourseFee, activatedField
  } = courseDetails;
  const { courseCategories } = referenceData;

  let course_specializes = [];
  let course_levels = [];
  let courseData = null;
  let selectedDays = [];
  const lang = state.i18nState.lang

  if (editMode && courseDetails.courseData != null) {
    courseData = courseDetails.courseData;
  } else if (courseFormValues != null) {
    courseData = courseFormValues;
  }

  selectedDays = DAYS_IN_WEEK(lang).filter((day) => {
    if (courseFormValues != null && courseFormValues.course_days) {
      return courseFormValues.course_days.indexOf(`${day.name}_${day.id}`) >= 0;
    } if (courseDetails.courseData && courseDetails.courseData.course_days) {
      return courseDetails.courseData.course_days.findIndex(d => d.day === day.name) >= 0;
    }
    return false;
  });

  const isSamePeriod = courseFormValues != null ? ObjectUtils.isTrue(courseFormValues.is_same_period)
    : courseData != null ? ObjectUtils.isTrue(courseData.is_same_period) : true;

  const isFree = courseFormValues != null ? ObjectUtils.isTrue(courseFormValues.is_free)
    : courseData != null ? ObjectUtils.isTrue(courseData.is_free) : false;

  if (editMode && courseData != null) {
    const courseCategory = updateCourseCategoryAndSpecialize(courseCategories, courseData);
    courseData.category = courseCategory;
    courseData.category_id = courseCategory.id;
    courseData.course_specialize_id = courseData.course_specialize.id;
    course_specializes = courseCategory.children;
    course_levels = getCourseLevels(course_specializes, courseData.course_specialize_id);
  } else if (!editMode && courseData != null) {
    const [courseCategory] = courseCategories.filter(category => category.id === Number(courseData.category_id));
    course_specializes = courseCategory !== undefined ? courseCategory.children : [];
  }

  if (courseFormValues != null) {
    const [selectedCategory] = courseCategories.filter(category => category.id === Number(courseFormValues.category_id));
    course_specializes = selectedCategory !== undefined ? selectedCategory.children : [];
  }

  const initializedValue = editMode && courseData != null ? initializeCourseDetail(courseData, lang) : { is_same_period: true };
  if (editMode && courseData.is_same_period) {
    initializedValue.start_time = courseData.course_days[0].start_time;
    initializedValue.end_time = courseData.course_days[0].end_time;
  } else if (editMode) {
    courseData.course_days.forEach((d) => {
      Object.defineProperty(initializedValue, `${d.day}_start_time`, { value: d.start_time, writable: true });
      Object.defineProperty(initializedValue, `${d.day}_end_time`, { value: d.end_time, writable: true });
    });
  }

  const hasActiveField = CourseForm.fields.filter(field => activatedField.indexOf(field) >= 0).length > 0;
  return {
    courseData,
    editMode,
    isSamePeriod,
    isFree,
    selectedDays,
    editTeachingDay,
    editCourseCategory,
    editCourseFee,
    categories: courseCategories,
    cover_image: !courseData ? null : courseData.cover_image,
    courseSpecializes: course_specializes,
    course_levels,
    initialValues: hasActiveField ? initializedValue : {},
    lang: lang
  };
};

const mapDispatchToProps = dispatch => ({
  createCourse: course => dispatch({
    type: CREATE_NEW_COURSE,
    payload: Network().post('courses', course),
    meta: 'courseDetailPlaceholder'
  }),
  updateCourse: (courseId, course) => dispatch({
    type: UPDATE_COURSE,
    payload: Network().update(`courses/${courseId}`, course),
    meta: 'courseDetailPlaceholder'
  }),
  doEditTechingDay: () => dispatch({ type: AsyncAction.EDIT_TEACHING_DAY }),
  doEditCourseCategory: () => dispatch({ type: AsyncAction.EDIT_COURSE_CATEGORY }),
  doEditCourseFee: () => dispatch({ type: AsyncAction.EDIT_COURSE_FEE }),
  activatedEditField: fieldIds => dispatch(CourseActions.activatedEditField(fieldIds)),
  closedEditField: fieldIds => dispatch(CourseActions.closedEditField(fieldIds)),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'courseCreationForm',
  fields: CourseForm.fields,
  validate,
  enableReinitialize: true
})(CourseDetailContainer));
