import React, {Component} from "react";
import {TT} from "../../utils/locale";
import {CURRENCIES} from "../../constants/Courses";
import {DAYS_IN_WEEK} from "../../actions/CourseFormActionCreator"
import FormField from "../Core/FormField";
import InlineEditFormField from "../Core/InlineEditFormField";
import ObjectUtils from "../../utils/ObjectUtils";
import styles from "./Course.module.scss";
import {SERVER_NAME} from "../../utils/CommonConstant";

class CourseForm extends Component {
  hideError(e) {
    e.preventDefault();
  }

  renderField(editMode, fieldId, showLabel, fieldLabel, placeholder, isMandatory, fieldName, typeField, disabled,
              content = "", options, displayStyle = "default-field", styleCustomField) {
    return editMode ? (
      <InlineEditFormField activated={this.props.activatedField === fieldId}
                           formGroupId={fieldId}
                           showLabel={showLabel}
                           formLabel={fieldLabel}
                           content={content}
                           displayStyle={displayStyle}
                           options={options}
                           placeholder={placeholder}
                           isMandatoryField={isMandatory}
                           customClassName={styleCustomField}
                           formControlName={fieldName}
                           typeField={typeField}
                           onActivatedField={this.props.onActivatedField}
                           {...this.props}>
      </InlineEditFormField>
    ) : (
      <FormField formGroupId={fieldId}
                 formLabel={fieldLabel}
                 options={options}
                 disabled={disabled}
                 placeholder={placeholder}
                 isMandatoryField={isMandatory}
                 customClassName={styleCustomField}
                 formControlName={fieldName}
                 typeField={typeField}>
      </FormField>
    )
  }

  render() {
    const {handleSubmit, editMode, onDropCoverImage, cover_image, submitting, pristine,
      valid, courseData, categories, courseSpecializes, selectedDays, isSamePeriod, isFree} = this.props;
    const concurrency = CURRENCIES.map((type) => {
      return {text: type, id: type};
    });
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
          <div
            className={editMode ? "d-flex flex-horizontal justify-content-center mt-30 mb-30" : "d-flex flex-horizontal"}>
            {
              editMode ? (
                <div className={styles.avatarImage}>
                  <FormField formGroupId="cover_image_Id"
                             formLabel={null}
                             showLabel={false}
                             isMandatoryField={false}
                             previewUrl={cover_image != null ? SERVER_NAME + cover_image : null}
                             zoneHeight="150px"
                             internalPreview={true}
                             formControlName="cover_image"
                             typeField="upload_file"
                             onUpload={onDropCoverImage}>
                  </FormField>
                </div>
              ) : ('')
            }
            <div className={editMode ? styles.courseTitle + ' d-flex align-items-center' : 'creation-course-title'}>
              {this.renderField(editMode, "titleId", false, editMode ? null : this.context.t("course_title"), this.context.t("sample_course_title"), true, "title", "custom_input",
                false, editMode ? courseData.title : "", null, "", "inline-form-control")}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              {this.renderField(editMode, "category_id", true, this.context.t("course_category"), this.context.t("course_category"),
                true, "category_id", "custom_select", false, editMode ? courseData.category.name : "", categories.map((category) => {
                  return {id: category.id, text: category.name}
                }))}
            </div>
            {
              courseSpecializes.length > 0 ?
                <div className='col-sm-6'>
                  {this.renderField(editMode, "course_specialize_id", true, this.context.t("course_specialize"), this.context.t("course_specialize"),
                    true, "course_specialize_id", "custom_select", false, editMode ? courseData.course_specialize.name : "", courseSpecializes)}
                </div>
                : null
            }
          </div>
          {/* Course category and course level */}

          <div className='row'>
            <div className='col-sm-6'>
              <div className={!editMode ? "datepicker-box" : ""}>
                {this.renderField(editMode, "start_date_Id", true, this.context.t("start_date"), this.context.t("start_date"), true,
                  "start_date", "datepicker", false, editMode ? courseData.start_date : "")}
              </div>
            </div>
            <div className='col-md-6 col-sm-6'>
              <div className="d-flex flex-horizontal">
                <div>
                  {this.renderField(editMode, "period_Id", true, this.context.t("period"), this.context.t("period"), true,
                    "period", "custom_input", false, editMode ? courseData.period + " " + this.context.t("course_periode_type") : "")}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              {this.renderField(editMode, "number_of_students_Id", true, this.context.t("number_of_students"), this.context.t("number_of_students"),
                true, "number_of_students", "custom_input", false, editMode ? courseData.number_of_students.toString() : "")}
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <div className="d-flex flex-horizontal">
                <div className="d-flex flex-col-1">
                  <div className="d-flex flex-col-3">
                    {this.renderField(editMode, "tuition_fee_Id", true, this.context.t("tuition_fee"), this.context.t("tuition_fee"),
                      true, "tuition_fee", "custom_input", isFree, editMode ? ObjectUtils.currencyFormat(courseData.tuition_fee, "VND") : "")}
                  </div>
                  <div className="ml-10 d-flex flex-col-1 currency-field">
                    {this.renderField(editMode, "currency_Id", false, this.context.t("tuition_currency"), this.context.t("tuition_currency"),
                      false, "currency", "custom_select", isFree, "", concurrency)}
                  </div>
                </div>
                <div className="ml-20 d-flex flex-col-1 course-free">
                  <FormField formGroupId="is_free_id"
                             showLabel={false}
                             formLabel={this.context.t("course_free")}
                             formControlName={"is_free"}
                             typeField="checkbox">
                  </FormField>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className='col-sm-8 col-md-8'>
              {this.renderField(editMode, "course_days_id", true, this.context.t("date_in_week_course"), this.context.t("teaching_period_per_day"),
                true, "course_days", "multi_select", false, editMode ? courseData.category.name : "", DAYS_IN_WEEK.map((day) => {
                  return {id: day.name + "_" + day.id, text: day.text}
                }))}
            </div>
            {
              !editMode ?
                <div className="col-sm-12 col-md-12">
                  <FormField formGroupId="is_same_period_id"
                             showLabel={false}
                             formLabel={this.context.t("teaching_period_per_day_similar")}
                             formControlName={"is_same_period"}
                             typeField="checkbox">
                  </FormField>
                </div> : null
            }
            <div className="col-md-12 col-sm-12">
              <div className={styles.timePickerContainer + " d-flex flex-horizontal flex-wrap"}>
                {
                  !isSamePeriod ?
                    selectedDays.map((day) =>
                      <div className={styles.timePickerBox + " d-flex"} key={"date_" + day.id}>
                        <div className="d-flex flex-vertical">
                          <span>{day.text}</span>
                          <div>
                            {this.renderField(editMode, day.name + "_start_time_id", false, this.context.t("start_time"), this.context.t("start_time"),
                              true, day.name + "_start_time", "timePicker", false, editMode ? retrieveStartTimeOfDay(courseData.course_days, day.name) : "")}
                          </div>
                          {
                            editMode ? TT.t('to') : null
                          }
                          <div>
                            {this.renderField(editMode, day.name + "_end_time_id", false, this.context.t("end_time"), this.context.t("end_time"),
                              true, day.name + "_end_time", "timePicker", false, editMode ? retrieveEndTimeOfDay(courseData.course_days, day.name) : "")}
                          </div>
                        </div>
                      </div>
                    ) :
                    <div className={styles.timePickerBox + " d-flex"}>
                      <div className="d-flex flex-vertical">
                        <div>
                          {this.renderField(editMode, "start_time_id", false, this.context.t("start_time"), this.context.t("start_time"),
                            true, "start_time_id", "timePicker", false, editMode ? retrieveStartTimeOfDay(courseData.course_days, null) : "")}
                        </div>
                        {
                          editMode ? TT.t('to') : null
                        }
                        <div>
                          {this.renderField(editMode, "end_time_id", false, this.context.t("end_time"), this.context.t("end_time"),
                            true, "end_time_id", "timePicker", false, editMode ? retrieveEndTimeOfDay(courseData.course_days, null) : "")}
                        </div>
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
          {
            !editMode ? (
              <div className="avatar-image">
                <FormField formGroupId="cover_image_Id"
                           formLabel={this.context.t("cover_image")}
                           isMandatoryField={true}
                           previewUrl={cover_image != null ? cover_image.previewUrl : null}
                           zoneHeight="200px"
                           internalPreview={true}
                           formControlName="cover_image"
                           typeField="upload_file"
                           onUpload={onDropCoverImage}>
                </FormField>
              </div>
            ) : (<div></div>)
          }


          {this.renderField(editMode, "description_Id", true, this.context.t("course_description"), this.context.t("course_description"),
            true, "description", "custom_textarea", false, editMode ? courseData.description : "")}

          {
            !editMode ? (
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <button type="submit" className="btn btn-primary btn-link-dark signin-btn mr-10 ml-15"
                          disabled={((pristine || submitting) && courseData) || !valid}>
                    {this.context.t("save_course")}
                  </button>
                </div>
              </div>
            ) : ''
          }
        </form>
      </div>
    )
  }
}

const retrieveStartTimeOfDay = (courseDays, day) => {
  if (day == null) {
    return courseDays[0].start_time;
  }
  const [selectedDay] = courseDays.filter((d) => d.day === day);
  return selectedDay.start_time;
}

const retrieveEndTimeOfDay = (courseDays, day) => {
  if (day == null) {
    return courseDays[0].end_time;
  }
  const [selectedDay] = courseDays.filter((d) => d.day === day);
  return selectedDay.end_time;
}

CourseForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool.isRequired,
  onDropCoverImage: React.PropTypes.func.isRequired,
  categories: React.PropTypes.array.isRequired,
  courseSpecializes: React.PropTypes.array.isRequired,
  isSamePeriod: React.PropTypes.bool.isRequired,
  isFree: React.PropTypes.bool.isRequired
};

export default CourseForm;
