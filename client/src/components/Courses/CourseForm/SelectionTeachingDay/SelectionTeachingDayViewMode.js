import { Component } from 'react';
import * as React from 'react';
import DateUtils from 'utils/DateUtils';
import { DAYS_IN_WEEK, HOURS_IN_DAY } from '../../../../actions/CourseFormActionCreator';
import styles from '../../Course.module.scss';
import CourseFormItem from '../CourseFormItem';
import FormField from '../../../Core/FormField';
import CoursedyWarning from '../../../Core/CoursedyWarning/CoursedyWarning';

class SelectionTeachingDayViewMode extends Component {
  render() {
    const {
      editable, courseData, isSamePeriod, selectedDays, canEditable
    } = this.props;
    console.log(`number of selected days: ${selectedDays.length}`);
    return (
      <div className="row">
        <div className="col-sm col-md">
          <CourseFormItem
            editMode={editable}
            fieldId="course_days"
            fieldLabel={this.context.t('date_in_week_course')}
            placeholder={this.context.t('teaching_period_per_day')}
            isMandatory
            fieldName="course_days"
            typeField="multi_select"
            content={editable ? DateUtils.getDayInWeekOfCourse(courseData.week_day_schedules) : ''}
            options={DAYS_IN_WEEK(this.props.lang).map((day) => {
              return { id: `${day.name}_${day.id}`, text: day.text };
            })}
            styleCustomField="inline-form-control"
            {...this.props}
          />
        </div>
        {
          !editable
            ? (
              <div className="col-sm-12 col-md-12">
                <FormField
                  fieldId="is_same_period"
                  showLabel={false}
                  fieldLabel={this.context.t('teaching_period_per_day_similar')}
                  formControlName="is_same_period"
                  typeField="checkbox"
                />
              </div>
            ) : null
        }
        <div className="col-md-12 col-sm-12">
          {
            selectedDays.length && this.props.lang === 'en' ?
              <CoursedyWarning message={this.context.t('selected_hour_warning_message')} /> : null
          }
          <div className={`${styles.timePickerContainer} d-flex flex-horizontal flex-wrap`}>
            {
              !isSamePeriod
                ? selectedDays.map(day => (
                  <div className={`${styles.timePickerBox} d-flex`} key={`date_${day.id}`}>
                    <div className="d-flex flex-vertical">
                      <span>{day.text}</span>
                      <div>
                        <CourseFormItem
                          editMode={editable}
                          fieldId={`${day.name}_start_time`}
                          fieldLabel={this.context.t('start_time')}
                          isMandatory
                          fieldName={`${day.name}_start_time`}
                          typeField="custom_select"
                          options={HOURS_IN_DAY}
                          content={editable ? DateUtils.retrieveStartTimeOfDay(courseData.course_days, day.name) : ''}
                          canEditable={canEditable}
                          {...this.props}
                        />
                      </div>
                      {
                        editable ? this.context.t('to') : null
                      }
                      <div>
                        <CourseFormItem
                          editMode={editable}
                          fieldId={`${day.name}_end_time`}
                          fieldLabel={this.context.t('end_time')}
                          isMandatory
                          fieldName={`${day.name}_end_time`}
                          typeField="custom_select"
                          options={HOURS_IN_DAY}
                          content={editable ? DateUtils.retrieveEndTimeOfDay(courseData.course_days, day.name) : ''}
                          canEditable={canEditable}
                          {...this.props}
                        />
                      </div>
                    </div>
                  </div>
                )) : selectedDays.length > 0
                  ? (
                    <div className={`${styles.timePickerBox} d-flex`}>
                      <div className="d-flex flex-vertical">
                        <div>
                          <CourseFormItem
                            editMode={editable}
                            fieldId="start_time"
                            fieldLabel={this.context.t('start_time')}
                            isMandatory
                            fieldName="start_time"
                            typeField="custom_select"
                            options={HOURS_IN_DAY}
                            content={editable ? DateUtils.retrieveStartTimeOfDay(courseData.course_days, null) : ''}
                            canEditable={canEditable}
                            {...this.props}
                          />
                        </div>
                        {
                      editable ? this.context.t('to') : null
                    }
                        <div>
                          <CourseFormItem
                            editMode={editable}
                            fieldId="end_time"
                            fieldLabel={this.context.t('end_time')}
                            isMandatory
                            fieldName="end_time"
                            typeField="custom_select"
                            options={HOURS_IN_DAY}
                            content={editable ? DateUtils.retrieveEndTimeOfDay(courseData.course_days, null) : ''}
                            canEditable={canEditable}
                            {...this.props}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

SelectionTeachingDayViewMode.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SelectionTeachingDayViewMode.propType = {
  editable: React.PropTypes.bool,
  courseData: React.PropTypes.object,
  isSamePeriod: React.PropTypes.bool,
  selectedDays: React.PropTypes.array,
  canEditable: React.PropTypes.bool
};

export default SelectionTeachingDayViewMode;
