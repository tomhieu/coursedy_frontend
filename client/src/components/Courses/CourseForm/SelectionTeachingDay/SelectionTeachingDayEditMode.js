import * as React from 'react';
import { Component } from 'react';
import DateUtils from 'utils/DateUtils';
import { TT } from 'utils/locale';
import { HOURS_IN_DAY } from 'actions/CourseFormActionCreator';
import { DAYS_IN_WEEK } from '../../../../actions/CourseFormActionCreator';
import styles from '../../Course.module.scss';
import FormField from '../../../Core/FormField';

class SelectionTeachingDayEditMode extends Component {
  render() {
    const {
      editable, courseData, isSamePeriod, selectedDays,
      lang
    } = this.props;
    return (
      <div className="row">
        <div className="col-sm col-md">
          <FormField
            editMode={editable}
            fieldId="course_days_id"
            fieldLabel={this.context.t('date_in_week_course')}
            placeholder={this.context.t('teaching_period_per_day')}
            isMandatory
            formControlName="course_days"
            typeField="multi_select"
            content={editable ? DateUtils.getDayInWeekOfCourse(courseData.week_day_schedules) : ''}
            options={DAYS_IN_WEEK(lang).map((day) => {
              return { id: `${day.name}_${day.id}`, text: day.text };
            })}
            styleCustomField="inline-form-control"
            {...this.props}
          />
        </div>
        <div className="col-sm-12 col-md-12">
          <FormField
            fieldId="is_same_period"
            showLabel={false}
            fieldLabel={this.context.t('teaching_period_per_day_similar')}
            formControlName="is_same_period"
            typeField="checkbox"
          />
        </div>
        <div className="col-md-12 col-sm-12">
          {
            selectedDays.length ?
              <div className={styles.timeWarning}>
                <span className={styles.note}>{this.context.t('select_hour_note')}: </span>
                <span className={styles.message}>{this.context.t('selected_hour_warning_message')}</span>
              </div> : null
          }
          <div className={`${styles.timePickerContainer} d-flex flex-horizontal flex-wrap`}>
            {
                            !isSamePeriod
                              ? selectedDays.map(day => (
                                <div className={`${styles.timePickerBox} d-flex`} key={`date_${day.id}`}>
                                  <div className="d-flex flex-vertical">
                                    <span>{day.text}</span>
                                    <div>
                                      <FormField
                                        editMode={editable}
                                        fieldId={`${day.name}_start_time`}
                                        fieldLabel={this.context.t('start_time')}
                                        isMandatory
                                        formControlName={`${day.name}_start_time`}
                                        typeField="custom_select"
                                        options={HOURS_IN_DAY}
                                        customClassName="time-picker-field"
                                        {...this.props}
                                      />
                                    </div>
                                    {
                                                editable ? this.context.t('to') : null
                                            }
                                    <div>
                                      <FormField
                                        editMode={editable}
                                        fieldId={`${day.name}_end_time`}
                                        fieldLabel={this.context.t('end_time')}
                                        isMandatory
                                        formControlName={`${day.name}_end_time`}
                                        typeField="custom_select"
                                        customClassName="time-picker-field"
                                        options={HOURS_IN_DAY}
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
                                        <FormField
                                          editMode={editable}
                                          fieldId="start_time"
                                          fieldLabel={this.context.t('start_time')}
                                          isMandatory
                                          formControlName="start_time"
                                          typeField="custom_select"
                                          customClassName="time-picker-field"
                                          options={HOURS_IN_DAY}
                                          {...this.props}
                                        />
                                      </div>
                                      {
                                            editable ? this.context.t('to') : null
                                        }
                                      <div>
                                        <FormField
                                          editMode={editable}
                                          fieldId="end_time"
                                          fieldLabel={this.context.t('end_time')}
                                          isMandatory
                                          formControlName="end_time"
                                          typeField="custom_select"
                                          customClassName="time-picker-field"
                                          options={HOURS_IN_DAY}
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

SelectionTeachingDayEditMode.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SelectionTeachingDayEditMode.propType = {
  editable: React.PropTypes.bool,
  courseData: React.PropTypes.object,
  isSamePeriod: React.PropTypes.bool,
  selectedDays: React.PropTypes.array
};

export default SelectionTeachingDayEditMode;
