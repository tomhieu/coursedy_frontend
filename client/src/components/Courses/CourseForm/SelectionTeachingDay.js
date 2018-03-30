import {Component} from "react";

class SelectionTeachingDay extends Component {
  render() {
    const {editable} = this.props;
    return (
      <div className="row">
        <div className='col-sm col-md'>
          {this.renderField(editMode, "course_days_id", true, this.context.t("date_in_week_course"), this.context.t("teaching_period_per_day"),
            true, "course_days", "multi_select", false, editMode ? this.getDayInWeekOfCourse(courseData) : "", DAYS_IN_WEEK.map((day) => {
              return {id: day.name + "_" + day.id, text: day.text}
            }))}
        </div>
        {
          !editMode ?
            <div className="col-sm-12 col-md-12">
              <FormField fieldId="is_same_period_id"
                         showLabel={false}
                         fieldLabel={this.context.t("teaching_period_per_day_similar")}
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
    )
  }
}