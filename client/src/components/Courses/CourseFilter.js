import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import {tuitionFees} from '../../constants/CourseFilter'
import FormField from "../Core/FormField";
import {FieldArray} from "redux-form";
import {EFlatButton, RaiseButton} from "../Core/CustomComponents";
import {
  ActionFavorite,
  ActionViewList,
  ActionViewModule,
  NavigationExpandLess,
  NavigationExpandMore
} from "material-ui/svg-icons/index";
import {red900} from "material-ui/styles/colors";
import {mStyles} from "utils/CustomStylesUtil";
import AutoComplete from "../AutoComplete/AutoComplete";

class CourseFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openAdFilter: false
    }
  }

  toggleFilter() {
    this.setState(
      {openAdFilter: !this.state.openAdFilter}
    )
  }

  renderCourseLevels(selectedCategories) {
    return (
      <div className="checkbox-group">
        {
          selectedCategories.map(cate =>
            <div key={cate.id}>
              <span>{cate.name}</span>
              <FieldArray name="filter_course_levels" component={() =>
                <div className="d-flex flex-horizontal flex-wrap">
                  {cate.course_levels.map((filter_course_level) =>
                    <div key={filter_course_level.id} className="lg-check-box-field">
                      <FormField formGroupId="filter_course_levels" showLabel={false}
                                 formLabel={filter_course_level.name}
                                 formControlName={"filter_course_levels[" + filter_course_level.id + "]"}
                                 typeField="checkbox">
                      </FormField>
                    </div>
                  )}
                </div>
              }/>
            </div>
          )
        }

      </div>
    )
  }

  renderDayOfWeek(weekdays) {
    return (
      <div className="checkbox-group">
        <FieldArray name="course_schedule_days" component={() =>
          <div className="d-flex flex-horizontal flex-wrap">
            {
              Object.keys(weekdays).map((k) =>
                <div key={k} className="md-check-box-field">
                  <FormField formGroupId="course_schedule_day" showLabel={false}
                             formLabel={weekdays[k]}
                             formControlName={"course_schedule_days[" + k + "]"}
                             typeField="checkbox">
                  </FormField>
                </div>
              )
            }
          </div>
        }/>
      </div>
    )
  }

  renderTutorFees(tuitionFees) {
    return (
      <div className="d-flex flex-horizontal">
        <div className="select-course-fee">
          <FormField formGroupId="filter_min_fees" showLabel={false} options={tuitionFees}
                     formControlName={"fees"} typeField="custom_select">
          </FormField>
        </div>
      </div>
    )
  }

  autoCompleteSearchCourse(category, id, key_word) {
    const filter = {category, id, key_word};
    this.props.onSubmit({filter});
  }

  render() {
    let {
      handleSubmit,
      categories,
      locations,
      selectedCategories,
      weekdays,
      totalResult,
      changeViewTypeHdl,
      groupSugestions,
      loadSuggestions
    } = this.props
    const orderList = [{id: 1, text: this.context.t("order_by_time")}, {
      id: 2,
      text: this.context.t("order_by_view")
    }, {id: 3, text: this.context.t("order_by_register")}];
    const displayModes = [{id: 1, text: this.context.t("display_mode_full")}, {
      id: 2,
      text: this.context.t("display_mode_compress")
    }];
    const internalStyles = {
      checkbox: {
        marginRight: 0,
      },
      defaultColorStyle: {
        color: "#e27d7f"
      },
      defaultBackgroundColorStyle: {
        backgroundColor: "#e27d7f"
      }
    };
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
            <div className={styles.filterActionBlock + " col-md-12 col-sm-12"}>
              <div className="row">
                <div className={"col-md-6 col-sm-6"}>
                  <AutoComplete placeholder={this.context.t('search_course')}
                                fieldName="key_word" fieldId="key_word_filter"
                                groupSugestions={groupSugestions} searchHandler={this.autoCompleteSearchCourse.bind(this)}
                                loadSuggestions={loadSuggestions}
                  />
                </div>
                {/* Title search */}
                <div className={"col-md-3 col-sm-3"}>
                  <FormField formGroupId="categories_id" showLabel={false}
                             options={categories.map((x) => {
                               return {text: x.name, id: x.id}
                             })}
                             placeholder={this.context.t('category')}
                             formControlName="filter_category_ids"
                             typeField="multi_select">
                  </FormField>
                </div>
                {/* Field */}
                <div className={"col-md-1 col-sm-1"}>
                  <FormField formGroupId="locations_id" showLabel={false}
                             options={Object.keys(locations).map((x) => {
                               return {text: locations[x], id: x}
                             })}
                             placeholder={this.context.t("location")}
                             formControlName="filter_location_ids"
                             typeField="custom_select">
                  </FormField>
                </div>
                {/* Area*/}
                <div className="col-md-2 col-sm-2">
                  <div className="d-flex flex-horizontal">
                    <RaiseButton label={this.context.t('filter')}/>
                    <EFlatButton label={this.context.t("filter_more")}
                                 onClick={this.toggleFilter.bind(this)}
                                 icon={this.state.openAdFilter ? <NavigationExpandLess style={mStyles.iconFlatBtn}/> :
                                   <NavigationExpandMore style={mStyles.iconFlatBtn}/>}/>
                  </div>
                </div>
              </div>
            </div>
            {/* Basic Filter Block */}
            <br/>

            <div className={styles.filterActionBlock + " col-md-12 col-sm-12"}>
              <div
                className={styles.advancedFilter + " collapse " + (this.state.openAdFilter ? "in" : "")}>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <h4>{this.context.t("day_of_week")}</h4>
                    {this.renderDayOfWeek(weekdays)}
                  </div>
                  {/* Schedule days */}

                  <div className="col-md-6 col-sm-6">
                    <div className="row">
                      {/* Tuition fee */}
                      <div className="col-md-12 col-sm-12">
                        <h4>{this.context.t('tuition_fee_filter')}</h4>
                        {this.renderTutorFees(tuitionFees)}
                      </div>
                      {/* Schedule time */}
                      <div className="col-md-12 col-sm-12">
                        <h4>{this.context.t('time_schedule')}</h4>
                        <div className='row dark-picker dark-picker-bright'>
                          <div className='col-sm-9'>
                            <FormField formGroupId="start_time_id" showLabel={false}
                                       placeholder={this.context.t("start_time")}
                                       formControlName="start_time"
                                       typeField="timePicker">
                            </FormField>
                          </div>
                        </div>
                        <div className='row dark-picker dark-picker-bright margin-top15'>
                          <div className='col-sm-9'>
                            <FormField formGroupId="end_time_id" showLabel={false}
                                       placeholder={this.context.t("end_time")}
                                       formControlName="end_time"
                                       typeField="timePicker">
                            </FormField>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <h4>{this.context.t('level')}</h4>
                    {this.renderCourseLevels(selectedCategories)}
                  </div>
                </div>


              </div>
            </div>
            {/* Result Block */}
            <div className={'col-md-12 ' + styles.filterResultBlock}>
              <div className="d-flex flex-horizontal align-items-center">
                <div className={styles.listResultInfo + " d-flex flex-horizontal justify-content-left"}>
                  <div className={styles.checkAllBtn + " d-flex align-items-center"}>
                    <FormField formGroupId="select_all_id" showLabel={false} formControlName="select_all"
                               typeField="checkbox" iconStyle={mStyles.iconCheckBox}>
                    </FormField>
                  </div>
                  <EFlatButton label={this.context.t("save_favorite")} icon={<ActionFavorite color={red900}/>}/>
                  <span className={styles.textTotalResult}>
                                        {this.context.t("total_result", {total: totalResult != undefined ? totalResult : 0})}
                                    </span>
                </div>
                <div className={styles.orderDisplayResult + " d-flex flex-horizontal justify-content-end"}>
                  <div className={styles.orderBtn}>
                    <FormField formGroupId="order_by_id" showLabel={false} formLabel={this.context.t("order_list")}
                               options={orderList} formControlName="order_by"
                               typeField="custom_select">
                    </FormField>
                  </div>
                  <div className={styles.displayModeBtn}>
                    <div className="d-flex flex-horizontal">
                      <EFlatButton secondary={true}
                                   onClick={changeViewTypeHdl.bind(this, "grid")}
                                   icon={<ActionViewModule style={internalStyles.defaultColorStyle}/>}/>
                      <EFlatButton secondary={true}
                                   onClick={changeViewTypeHdl.bind(this, "list")}
                                   icon={<ActionViewList style={internalStyles.defaultColorStyle}/>}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

CourseFilter.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFilter.propTypes = {
  categories: React.PropTypes.array.isRequired,
  locations: React.PropTypes.object.isRequired,
  weekdays: React.PropTypes.object.isRequired,
};

export default cssModules(CourseFilter, styles);
