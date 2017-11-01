import React, { Component} from 'react';
import {Form} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import Select2 from 'react-select2-wrapper'
import {timeSlots, tuitionFees} from '../../constants/CourseFilter'

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

  render() {
    let {categories, locations, selectedCategoryIds, selectedLocationIds, weekdays} = this.props

    return (
      <div className="row row-margin">
        <div className="margin-btm">
          <div className="col-xs-12 col-sm-12">
            <div className={"col-xs-12 col-sm-12 " + styles.courseFilter}>
              <Form action="#" id="filter_form" method="post">
                <div className={"col-md-12 " + styles.basicFilterBlock}>
                  <div className={"col-md-3 " + styles.noPadRight}>
                    <input type="text" className="form-control"
                           placeholder={this.context.t('search_course')}
                           onChange={this.props.onKeyWordChange}
                           value={this.props.keyWord}
                    />
                  </div>{/* Title search */}
                  <div className={"col-md-3 " + styles.noPadRight}>
                    <Select2
                      data={categories.map((x) => {return {text: x.name, id: x.id}})}
                      options={{
                        placeholder: this.context.t('category')
                      }}
                      value={selectedCategoryIds}
                      onChange={this.props.onCategoryChange}
                      multiple
                    />
                  </div>{/* Field */}
                  <div className={"col-md-3 " + styles.noPadRight}>
                    <Select2
                      data={Object.keys(locations).map((x) => {return {text: locations[x], id: x}})}
                      options={{
                        placeholder: this.context.t("location")
                      }}
                      onChange={this.props.onLocationChange}
                      value={selectedLocationIds}
                      multiple
                    />
                  </div>{/* Area*/}
                  <div className="col-md-1">
                    <button className={'btn btn-primary btn-secondary ' + styles.btnSearch} type="button" onClick={this.props.searchCourse}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>

                  <div className="col-md-2">
                    <button 
                      type="button"
                      className={'btn btn-primary ' + styles.btnAdvancedFilter} 
                      onClick={this.toggleFilter.bind(this)}>{this.context.t("filter")}</button>
                  </div>
                </div>{/* Basic Filter Block */}
                <br/>
                <div className="clearfix"></div>

                <div className="col-md-12">
                  <div className={styles.advancedFilter + " collapse " + (this.state.openAdFilter ? "in" : "")}>
                    <div className="col-md-3">
                      <h4>{this.context.t('level')}</h4>
                      {
                        categories.filter((category) => {
                          return this.props.selectedCategoryIds.indexOf(category.id) >= 0
                        }).map((category) => {
                          return (
                            <div key={category.id}>
                              <h5>{category.name}</h5>
                              {
                                category.course_levels.map((level) => {
                                  return (
                                    <div key={level.id}>
                                      <input type="checkbox" value={level.id} onChange={this.props.onSelectCourseLevel} checked={this.props.selectedLevels.indexOf(level.id) >= 0}/>
                                      <label htmlFor=""><span><span></span></span>{level.name}</label>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </div>

                    <div className="col-md-3">
                      <h4>Ngày học</h4>
                      {
                        Object.keys(weekdays).map((k) => {
                          return (
                            <div key={k}>
                              <input type="checkbox" value={k} name="course_schedule_day" onChange={this.props.onSelectWeekDay} selected={this.props.selectedWeekdays.indexOf(k.id) >= 0}/>
                              <label htmlFor=""><span><span></span></span>{weekdays[k]}</label>
                            </div>
                          )
                        })
                      }
                    </div>{/* Schedule days */}

                    <div className="col-md-3">
                      <h4>{this.context.t('tuition_fee_filter')}</h4>
                      {
                        tuitionFees.map((fee) => {
                          return (
                            <div key={fee[0]}>
                              <input type="checkbox" name="fee" value={fee[0]} onChange={this.props.onFeeChange}/>
                              <label htmlFor=""><span><span></span></span>{fee[1]}</label>
                            </div>
                          )
                        })
                      }
                    </div>{/* Tuition fee */}

                    <div className="col-md-3">
                      <h4>{this.context.t('time_schedule')}</h4>
                      <div className='row dark-picker dark-picker-bright'>
                        <div className='col-sm-9'>
                          <Select2
                            data={timeSlots.map((ts) => {return {id: ts[0], text: ts[1]}})}
                            options={{
                              placeholder: this.context.t("start_time")
                            }}
                            onChange={this.props.onStartTimeChange}
                            value={this.props.startTime}
                          />
                          <span className={`input-errors ${this.props.startTimeError ? '':'hidden'}`}>{this.context.t('start_time_error')}</span>
                        </div>
                      </div>
                      <div className='row dark-picker dark-picker-bright margin-top15'>
                        <div className='col-sm-9'>
                          <Select2
                            data={timeSlots.map((ts) => {
                              return {id: ts[0], text: ts[1]}
                            })}
                            options={{
                              placeholder: this.context.t("end_time")
                            }}
                            onChange={this.props.onEndTimeChange}
                            value={this.props.endTime}
                          />
                          <span className={`input-errors ${this.props.endTimeError ? '':'hidden'}`}>{this.context.t('end_time_error')}</span>
                        </div>
                      </div>
                    </div>{/* Schedule time */}

                    <div className="clearfix"></div>
                    
                    {/*<div className="col-md-4">*/}
                      {/*<h4>Giáo viên</h4>*/}
                      {/*<Select2*/}
                        {/*data={[*/}
                          {/*{text: 'Tất cả', id: 'all'},*/}
                          {/*{text: 'Nguyễn Văn A', id: 'nguyen-van-a'},*/}
                          {/*{text: 'Huỳnh Văn B', id: 'huynh-van-b'},*/}
                          {/*{text: 'Vũ Văn C', id: 'vu-van-c'},*/}
                        {/*]}*/}
                        {/*multiple*/}
                      {/*/>*/}
                    {/*</div>/!* Tutor *!/*/}


                  </div>
                </div>{/* Advanced Filter Block */}
                <div className="clearfix"></div>
                <hr/>

                <div className={'col-md-12 ' + styles.filterResultBlock}>
                  <div className="col-md-6">
                    <i className="fa fa-list"></i> 5,000 khóa học
                  </div>
                  <div className="col-md-3 text-right">
                    Sắp xếp: 
                    <select>
                      <option value="">Mới nhất</option>
                      <option value="">Xem nhiều nhất</option>
                      <option value="">Đăng ký nhiều nhất</option>
                    </select>
                  </div>
                  <div className="col-md-3 text-right">
                    Hiển thị: 
                    <select>
                      <option value="">Đầy đủ</option>
                      <option value="">Dạng nén</option>
                    </select>
                  </div>
                </div>{/* Result Block */}
              </Form>
            </div>
          </div>
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
  onCategoryChange: React.PropTypes.func.isRequired,
  onLocationChange: React.PropTypes.func.isRequired,
  onFeeChange: React.PropTypes.func.isRequired,
  onKeyWordChange: React.PropTypes.func.isRequired,
  onSelectCourseLevel: React.PropTypes.func.isRequired,
  onSelectWeekDay: React.PropTypes.func.isRequired,
  searchCourse: React.PropTypes.func.isRequired,
  locations: React.PropTypes.object.isRequired,
  weekdays: React.PropTypes.object.isRequired,
  selectedCategoryIds: React.PropTypes.array.isRequired,
  selectedLocationIds: React.PropTypes.array.isRequired,
  selectedWeekdays: React.PropTypes.array.isRequired,
  selectedFees: React.PropTypes.array.isRequired,
  onStartTimeChange: React.PropTypes.func.isRequired,
  onEndTimeChange: React.PropTypes.func.isRequired
};

export default cssModules(CourseFilter, styles);
