import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import {tuitionFees} from '../../constants/CourseFilter'
import FormField from "../Core/FormField";
import {FieldArray} from "redux-form";
import {Checkbox, FlatButton, RaisedButton} from "material-ui";
import {
    ActionFavorite, ActionSearch, ActionViewList, ActionViewModule, NavigationExpandLess,
    NavigationExpandMore
} from "material-ui/svg-icons/index";
import {fullWhite, red900} from "material-ui/styles/colors";
//Custom for sort by
import {Field} from "redux-form";
import { renderSelect } from "../Core/CustomComponents";

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
                        <div>
                            <span>{cate.name}</span>
                            <FieldArray name="filter_course_levels" component={() =>
                                <div className="d-flex flex-horizontal flex-wrap">
                                    {cate.course_levels.map((filter_course_level) =>
                                        <div key={filter_course_level.id} className="lg-check-box-field">
                                            <FormField formGroupId="filter_course_levels" showLabel={false}
                                                       formLabel={filter_course_level.name}
                                                       formControlName={"filter_course_levels[" + filter_course_level.id + "]"} typeField="checkbox"></FormField>
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
                                               typeField="checkbox"></FormField>
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
                               formControlName={"fees"} typeField="custom_select"></FormField>
                </div>
            </div>
        )
    }


    render() {
        let {
            handleSubmit, 
            categories, 
            courses,
            selectedCourses,
            locations, 
            selectedCategories, 
            weekdays, 
            totalResult,
            changeDisplayModeHdl,
            changeCurrentPageHdl,
            selectAllCoursesHdl
        } = this.props
        const orderList = [{id: 'created_at', text: this.context.t("sort_by_time")}, {
            id: 'view',
            text: this.context.t("sort_by_view")
        }, {id: 'enroll', text: this.context.t("sort_by_enroll")}];
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
        const submitter = this.props.handleSubmit(this.props.onSubmit)
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true} ref="form">
                        <div className={styles.filterActionBlock + " col-md-12 col-sm-12"}>
                            <div className="row">
                                <div className={"col-md-6 col-sm-6"}>
                                    <FormField formGroupId="key_word_filter" showLabel={false}
                                               placeholder={this.context.t('search_course')}
                                               formControlName="key_word" typeField="custom_input"></FormField>
                                </div>
                                {/* Title search */}
                                <div className={"col-md-3 col-sm-3"}>
                                    <FormField formGroupId="categories_id" showLabel={false}
                                               options={categories.map((x) => {
                                                   return {text: x.name, id: x.id}
                                               })}
                                               placeholder={this.context.t('category')}
                                               formControlName="filter_category_ids"
                                               typeField="multi_select"></FormField>
                                </div>
                                {/* Field */}
                                <div className={"col-md-1 col-sm-1"}>
                                    <FormField formGroupId="locations_id" showLabel={false}
                                               options={Object.keys(locations).map((x) => {
                                                   return {text: locations[x], id: x}
                                               })}
                                               placeholder={this.context.t("location")}
                                               formControlName="filter_location_ids"
                                               typeField="custom_select"></FormField>
                                </div>
                                {/* Area*/}
                                <div className="col-md-2 col-sm-2">
                                    <div className="d-flex flex-horizontal">
                                        <RaisedButton backgroundColor="#e27d7f" labelColor={fullWhite} label={this.context.t('filter')} type="submit" icon={<ActionSearch color={fullWhite} />}/>
                                        <FlatButton label={this.context.t("filter_more")}  type="button" onClick={this.toggleFilter.bind(this)} style={internalStyles.defaultColorStyle}
                                                    icon={this.state.openAdFilter ? <NavigationExpandLess /> : <NavigationExpandMore />}/>
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
                                                                   typeField="timePicker"></FormField>
                                                    </div>
                                                </div>
                                                <div className='row dark-picker dark-picker-bright margin-top15'>
                                                    <div className='col-sm-9'>
                                                        <FormField formGroupId="end_time_id" showLabel={false}
                                                                   placeholder={this.context.t("end_time")}
                                                                   formControlName="end_time"
                                                                   typeField="timePicker"></FormField>
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
                                        <Checkbox style={internalStyles.checkbox}
                                            checked={courses.length == selectedCourses.length}
                                            onCheck={selectAllCoursesHdl.bind(this, courses.length == selectedCourses.length)}
                                        />
                                    </div>
                                    <FlatButton label={this.context.t("save_favorite")} style={internalStyles.defaultColorStyle} icon={<ActionFavorite color={red900} />}/>
                                    <span className={styles.textTotalResult}>
                                        {this.context.t("total_result", {total: totalResult != undefined ? totalResult : 0})}
                                    </span>
                                </div>
                                <div className={styles.orderDisplayResult + " d-flex flex-horizontal justify-content-end"}>
                                    <div className={styles.orderBtn}>
                                        <Field name={"sort_by"} 
                                            component={renderSelect(orderList)} 
                                            className={"form-control"} 
                                            onChange={(e) => {submitter()}} />
                                    </div>
                                    <div className={styles.displayModeBtn}>
                                        <div className="d-flex flex-horizontal">
                                            <FlatButton secondary={true} 
                                                icon={<ActionViewModule style={internalStyles.defaultColorStyle} />}
                                                onClick={changeDisplayModeHdl.bind(this, "grid")}
                                            />
                                            <FlatButton secondary={true} 
                                                icon={<ActionViewList style={internalStyles.defaultColorStyle} />}
                                                onClick={changeDisplayModeHdl.bind(this, "list")}
                                            />
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
