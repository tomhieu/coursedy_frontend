import React, {Component} from "react";
import FormField from "../../Core/FormField";
import styles from "./../Course.module.scss";
import CourseFormItem from "./CourseFormItem";
import SelectionTeachingDay from "./SelectionTeachingDay";
import CourseCategory from "./CourseCategory";
import CourseFeeComponent from "./CourseFeeComponent";
import PrimaryButton from "../../Core/PrimaryButton/PrimaryButton";
import CourseCoverImageContainer from "../../../containers/Courses/CourseForm/CourseCoverImageContainer";

class CourseForm extends Component {

  constructor() {
    super();
    this.state = {
      showPoupChangeCoverImage: false,
      selectedNewCoverImage: false
    }
  }

  showPopupToChangeCoverImage() {
    this.setState({showPoupChangeCoverImage: true});
  }

  hidePopupToChangeCoverImage() {
    this.setState({showPoupChangeCoverImage: false});
  }

  onSelectNewCoverImage() {
    this.setState({selectedNewCoverImage: true});
  }

  onDeselectNewCoverImage() {
    this.setState({selectedNewCoverImage: false});
  }

  render() {
    const {handleSubmit, editMode, onDropCoverImage, cover_image, submitting, pristine,
      valid, courseData, categories, courseSpecializes, selectedDays, isSamePeriod, isFree} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.onSubmit)} multiple={true} className="inline-form">
          <div className={editMode ? "d-flex flex-horizontal flex-auto justify-content-center mb-30" : "d-flex flex-horizontal"}>
            {
              editMode ? (
                <div className={styles.avatarImage}>
                  <CourseCoverImageContainer courseCoverImage={cover_image != null ? cover_image : null}
                                             uploadCourseCoverImage={onDropCoverImage}
                                             openPopupToChangeCoverImage={this.showPopupToChangeCoverImage.bind(this)}
                                             closePopupToChangeCoverImage={this.hidePopupToChangeCoverImage.bind(this)}
                                             showPopupChangeCoverImage={this.state.showPoupChangeCoverImage}
                                             onDeselectNewCoverImage={this.onDeselectNewCoverImage.bind(this)}
                                             onSelectedNewCoverImage={this.onSelectNewCoverImage.bind(this)}
                                             selectedNewCoverImage={this.state.selectedNewCoverImage}>
                  </CourseCoverImageContainer>
                </div>
              ) : null
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
              <div >
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
              <div >
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

          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <div className="d-flex flex-horizontal">
                <CourseFeeComponent isFree={isFree}
                                    editMode={editMode}
                                    courseData={courseData}
                                    {...this.props}>
                </CourseFeeComponent>
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
                  <PrimaryButton isPrimary={true} line={false}
                                 type="submit"
                                 customClasses="mr-10"
                                 disabled={(pristine || submitting) && courseData}
                                 isSmallButton={true}
                                 title={this.context.t("save_course")}>
                  </PrimaryButton>
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
