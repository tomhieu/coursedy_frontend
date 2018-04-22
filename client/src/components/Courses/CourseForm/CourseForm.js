import React, {Component} from "react";
import {CURRENCIES} from "../../../constants/Courses";
import FormField from "../../Core/FormField";
import ObjectUtils from "../../../utils/ObjectUtils";
import styles from "./../Course.module.scss";
import {SERVER_NAME} from "../../../utils/CommonConstant";
import CourseFormItem from "./CourseFormItem";
import SelectionTeachingDay from "./SelectionTeachingDay";
import CourseCategory from "./CourseCategory";

class CourseForm extends Component {

  render() {
    const {handleSubmit, editMode, onDropCoverImage, cover_image, submitting, pristine,
      valid, courseData, categories, courseSpecializes, selectedDays, isSamePeriod, isFree} = this.props;
    const concurrency = CURRENCIES.map((type) => {
      return {text: type, id: type};
    });
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form course-details-form' multiple={true}>
          <div className={editMode ? "d-flex flex-horizontal flex-auto justify-content-center mt-30 mb-30" : "d-flex flex-horizontal"}>
            {
              editMode ? (
                <div className={styles.avatarImage}>
                  <FormField fieldId="cover_image_Id"
                             showLabel={false}
                             isMandatoryField={false}
                             previewUrl={cover_image != null ? SERVER_NAME + cover_image : null}
                             internalPreview={true}
                             zoneHeight="300px"
                             formControlName="cover_image"
                             typeField="upload_file"
                             onUpload={onDropCoverImage}>
                  </FormField>
                </div>
              ) : ('')
            }
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className={editMode ? styles.courseLargeTitle + ' course-large-title d-flex align-items-center justify-content-center course-title' : 'creation-course-title'}>
                <CourseFormItem editMode={editMode} fieldId="titleId"
                                fieldLabel={editMode ? "" : this.context.t("course_title")}
                                placeholder={this.context.t("sample_course_title")}
                                isMandatory={true}
                                fieldName="title"
                                typeField="custom_input"
                                content={editMode ? courseData.title : ""}
                                styleCustomField="inline-form-control" {...this.props}>
                </CourseFormItem>
              </div>
            </div>
          </div>
          <CourseCategory editMode={editMode}
                          category={courseData != null ? courseData.category : null}
                          course_specialize={courseData != null ? courseData.course_specialize : null}
                          courseSpecializes={courseSpecializes}
                          categories={categories}
                          {...this.props}>
          </CourseCategory>
          {/* Course category and course level */}

          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <div className="lg-field">
                <CourseFormItem editMode={editMode} fieldId="start_date_Id"
                                fieldLabel={this.context.t("start_date")}
                                isMandatory={true}
                                fieldName="start_date"
                                typeField="datepicker"
                                content={editMode ? courseData.start_date : ""}
                                {...this.props}>
                </CourseFormItem>
              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <div className="lg-field">
                <CourseFormItem editMode={editMode} fieldId="period_Id"
                                fieldLabel={this.context.t("period")}
                                isMandatory={true}
                                fieldName="period"
                                typeField="custom_input"
                                content={editMode ? courseData.period + " " + this.context.t("course_periode_type") : ""}
                                {...this.props}>
                </CourseFormItem>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="lg-field">
                <CourseFormItem editMode={editMode} fieldId="number_of_students_Id"
                                fieldLabel={this.context.t("number_of_students")}
                                isMandatory={true}
                                fieldName="number_of_students"
                                typeField="custom_input"
                                content={editMode ? courseData.number_of_students.toString() : ""}
                                {...this.props}>
                </CourseFormItem>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <div className="d-flex flex-horizontal">
                <div className="d-flex flex-col-1">
                  <div className="lg-field">
                    <CourseFormItem editMode={editMode} fieldId="tuition_fee_Id"
                                    fieldLabel={this.context.t("tuition_fee")}
                                    isMandatory={true}
                                    fieldName="tuition_fee"
                                    typeField="custom_input"
                                    content={editMode ? ObjectUtils.currencyFormat(courseData.tuition_fee, "VND") : ""}
                                    disabled={isFree}
                                    {...this.props}>
                    </CourseFormItem>
                  </div>
                  <div className="ml-10 currency-field sm-field">
                    <CourseFormItem editMode={editMode} fieldId="currency_Id"
                                    fieldLabel={this.context.t("tuition_currency")}
                                    isMandatory={false}
                                    fieldName="currency"
                                    typeField="custom_select"
                                    content={editMode ? courseData.currency : ""}
                                    disabled={isFree}
                                    options={concurrency}
                                    {...this.props}>
                    </CourseFormItem>
                  </div>
                  <div className={editMode ? "ml-20 d-flex flex-auto course-edit-free" : "ml-20 d-flex flex-auto course-free"}>
                    <CourseFormItem editMode={editMode} fieldId="is_free_id"
                                    fieldLabel={this.context.t("course_free")}
                                    isMandatory={false} showLabel={false}
                                    fieldName="is_free"
                                    typeField="checkbox"
                                    content={editMode ? courseData.is_free ? this.context.t("course_free") : this.context.t("course_not_free") : ""}
                                    {...this.props}>
                    </CourseFormItem>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <SelectionTeachingDay editable={editMode} courseData={courseData}
                                    isSamePeriod={isSamePeriod}
                                    selectedDays={selectedDays} {...this.props}>
              </SelectionTeachingDay>
            </div>
          </div>

          {
            !editMode ? (
              <div>
                <FormField fieldId="cover_image_Id"
                           fieldLabel={this.context.t("cover_image")}
                           isMandatoryField={true}
                           previewUrl={cover_image != null ? cover_image.previewUrl : null}
                           zoneHeight="300px"
                           internalPreview={true}
                           formControlName="cover_image"
                           typeField="upload_file"
                           onUpload={onDropCoverImage}>
                </FormField>
              </div>
            ) : (<div></div>)
          }

          <CourseFormItem editMode={editMode} fieldId="description_Id"
                          fieldLabel={this.context.t("course_description")}
                          isMandatory={true}
                          fieldName="description"
                          typeField="custom_textarea"
                          content={editMode ? courseData.description : ""}
                          disabled={false}
                          {...this.props}>
          </CourseFormItem>

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
