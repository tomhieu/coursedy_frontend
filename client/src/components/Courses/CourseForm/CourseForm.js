import React, { Component } from 'react';
import styles from '../Course.module.scss';
import CourseFormItem from './CourseFormItem';
import SelectionTeachingDay from './SelectionTeachingDay/SelectionTeachingDay';
import CourseCategory from './CourseCategory/CourseCategory';
import CourseFeeComponent from './CourseFee/CourseFeeComponent';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import CourseCoverImageContainer from '../../../containers/Courses/CourseForm/CourseCoverImageContainer';
import { insertTemplateHandler } from '../../Core/CustomComponents';

class CourseForm extends Component {
  static fields = ['title', 'description', 'start_date', 'period',
    'number_of_students', 'tuition_fee', 'is_free', 'course_days', 'is_same_period', 'start_time', 'end_time',
    'monday_start_time', 'monday_end_time', 'tuesday_start_time', 'tuesday_end_time',
    'wednesday_start_time', 'wednesday_end_time', 'thursday_start_time', 'thursday_end_time',
    'friday_start_time', 'friday_end_time', 'saturday_start_time', 'saturday_end_time', 'sunday_start_time', 'sunday_end_time',
    'cover_image', 'category_id', 'course_specialize'];

  constructor() {
    super();
    this.state = {
      showPoupChangeCoverImage: false,
      selectedNewCoverImage: false,
      newCoverImage: undefined
    };
  }

  showPopupToChangeCoverImage() {
    this.setState({ showPoupChangeCoverImage: true });
  }

  hidePopupToChangeCoverImage() {
    this.setState({ showPoupChangeCoverImage: false });
  }

  onSelectNewCoverImage() {
    this.setState({ selectedNewCoverImage: true });
  }

  onDeselectNewCoverImage() {
    this.setState({ selectedNewCoverImage: false });
  }

  onUploadCoverImage(data) {
    this.hidePopupToChangeCoverImage();
    this.setState({ newCoverImage: data });
    this.props.onDropCoverImage(data);
  }

  render() {
    const {
      handleSubmit, editMode, onDropCoverImage, cover_image, submitting, pristine,
      valid, courseData, categories, courseSpecializes, selectedDays, isSamePeriod,
      isFree, canEditable, lang
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.onSubmit)} multiple className="inline-form">
          <div className={editMode ? 'd-flex flex-horizontal flex-auto justify-content-center mb-30' : 'd-flex flex-horizontal'}>
            {
              editMode ? (
                <div className={styles.avatarImage}>
                  <CourseCoverImageContainer
                    courseCoverImage={cover_image || null}
                    uploadCourseCoverImage={this.onUploadCoverImage.bind(this)}
                    openPopupToChangeCoverImage={this.showPopupToChangeCoverImage.bind(this)}
                    closePopupToChangeCoverImage={this.hidePopupToChangeCoverImage.bind(this)}
                    showPopupChangeCoverImage={this.state.showPoupChangeCoverImage}
                    onDeselectNewCoverImage={this.onDeselectNewCoverImage.bind(this)}
                    onSelectedNewCoverImage={this.onSelectNewCoverImage.bind(this)}
                    selectedNewCoverImage={this.state.selectedNewCoverImage}
                    isEditable={canEditable}
                    lang={lang}
                  />
                </div>
              ) : null
            }
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className={editMode ? `${styles.courseLargeTitle} course-large-title d-flex align-items-center justify-content-center course-title` : 'creation-course-title'}>
                <CourseFormItem
                  editMode={editMode}
                  fieldId="title"
                  fieldLabel={editMode ? '' : this.context.t('course_title')}
                  placeholder={this.context.t('sample_course_title')}
                  isMandatory
                  fieldName="title"
                  typeField="custom_input"
                  content={editMode ? courseData.title : ''}
                  styleCustomField="inline-form-control"
                  canEditable={canEditable}
                  {...this.props}
                />
              </div>
            </div>
          </div>
          <CourseCategory
            editMode={editMode}
            category={courseData != null ? courseData.category : null}
            course_specialize={courseData != null ? courseData.course_specialize : null}
            courseSpecializes={courseSpecializes}
            categories={categories}
            canEditable={canEditable}
            {...this.props}
          />
          {/* Course category and course level */}

          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div>
                <CourseFormItem
                  editMode={editMode}
                  fieldId="start_date"
                  fieldLabel={this.context.t('start_date')}
                  isMandatory
                  fieldName="start_date"
                  typeField="datepicker"
                  content={editMode ? courseData.start_date : ''}
                  canEditable={canEditable}
                  {...this.props}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div>
                <CourseFormItem
                  editMode={editMode}
                  fieldId="period"
                  fieldLabel={this.context.t('number_of_lessons')}
                  isMandatory
                  fieldName="period"
                  typeField="custom_input"
                  content={editMode ? `${courseData.period} ${this.context.t('course_periode_type')}` : ''}
                  canEditable={canEditable}
                  {...this.props}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6">
              <CourseFeeComponent
                isFree={isFree}
                editMode={editMode}
                courseData={courseData}
                canEditable={canEditable}
                {...this.props}
              />
            </div>
            <div className="col-md-6 col-sm-6">
              <CourseFormItem
                editMode={editMode}
                fieldId="number_of_students"
                fieldLabel={this.context.t('number_of_students')}
                isMandatory
                fieldName="number_of_students"
                typeField="custom_input"
                content={editMode ? courseData.number_of_students : ''}
                {...this.props}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <SelectionTeachingDay
                editable={editMode}
                courseData={courseData}
                isSamePeriod={isSamePeriod}
                selectedDays={selectedDays}
                canEditable={canEditable}
                {...this.props}
              />
            </div>
          </div>

          {
            !editMode ? (
              <div>
                <CourseCoverImageContainer
                  courseCoverImage={cover_image != null ? cover_image : this.state.newCoverImage}
                  uploadCourseCoverImage={this.onUploadCoverImage.bind(this)}
                  openPopupToChangeCoverImage={this.showPopupToChangeCoverImage.bind(this)}
                  closePopupToChangeCoverImage={this.hidePopupToChangeCoverImage.bind(this)}
                  showPopupChangeCoverImage={this.state.showPoupChangeCoverImage}
                  onDeselectNewCoverImage={this.onDeselectNewCoverImage.bind(this)}
                  onSelectedNewCoverImage={this.onSelectNewCoverImage.bind(this)}
                  uploadImageLabel={this.context.t('add_cover_image')}
                  selectedNewCoverImage={this.state.selectedNewCoverImage}
                />
              </div>
            ) : (<div />)
          }

          <CourseFormItem
            editMode={editMode}
            fieldId="description"
            fieldLabel={this.context.t('course_description')}
            isMandatory
            fieldName="description"
            typeField="rich_text_editor"
            customClassName="quill-form-control"
            content={editMode ? courseData.description : ''}
            disabled={false}
            isRichTextField
            canEditable={canEditable}
            insertTemplateHandler={insertTemplateHandler}
            {...this.props}
          />
          {
            !editMode ? (
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <PrimaryButton
                    isPrimary
                    line={false}
                    type="submit"
                    customClasses="mr-10"
                    disabled={(pristine || submitting) && courseData}
                    isSmallButton
                    title={this.context.t('create_course')}
                  />
                </div>
              </div>
            ) : ''
          }

        </form>
      </div>
    );
  }
}

CourseForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

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
