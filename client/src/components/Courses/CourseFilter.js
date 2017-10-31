import React, { Component} from 'react';
import {Form} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import Select2 from 'react-select2-wrapper'

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
    let {categories} = this.props
    let {locations} = this.props
    let {selectedCategoryIds} = this.props

    return (
      <div className="row row-margin">
        <div className="margin-btm">
          <div className="col-xs-12 col-sm-12">
            <div className={"col-xs-12 col-sm-12 " + styles.courseFilter}>
              <Form action="#" id="filter_form" method="post">
                <div className={"col-md-12 " + styles.basicFilterBlock}>
                  <div className={"col-md-3 " + styles.noPadRight}>
                    <input type="text" className="form-control" placeholder={this.context.t('search_course')} />
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
                        placeholder: "Khu vực"
                      }}
                      multiple
                    />
                  </div>{/* Area*/}
                  <div className="col-md-1">
                    <button className={'btn btn-primary btn-secondary ' + styles.btnSearch} type="button"><i className="fa fa-search"></i></button>
                  </div>

                  <div className="col-md-2">
                    <button 
                      type="button"
                      className={'btn btn-primary ' + styles.btnAdvancedFilter} 
                      onClick={this.toggleFilter.bind(this)}>Lọc</button>
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
                                      <input type="checkbox" value={level.id}/>
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
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Bất kỳ</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Thứ 2</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Thứ 3</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Thứ 4</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Thứ 5</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Thứ 6</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Thứ 7</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_day"/>
                        <label htmlFor=""><span><span></span></span>Chủ nhật</label>
                      </div>
                    </div>{/* Schedule days */}
                    <div className="col-md-3">
                      <h4>Giờ học</h4>
                      <div>
                        <input type="checkbox" name="course_schedule_time"/>
                        <label htmlFor=""><span><span></span></span>Bất kỳ</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_time"/>
                        <label htmlFor=""><span><span></span></span>8:00AM - 9:30AM</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_time"/>
                        <label htmlFor=""><span><span></span></span>6:00PM - 7:30PM</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_time"/>
                        <label htmlFor=""><span><span></span></span>7:30PM - 9:00PM</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_schedule_time" value="custom"/>
                        <label><span><span></span></span>
                          <input type="text" name="course_schedule_time_cl" placeholder="Bắt đầu"/>
                          -
                          <input type="text" name="course_schedule_time_ch" placeholder="Kết thúc"/>
                        </label>
                      </div>
                    </div>{/* Schedule time */}
                    <div className="col-md-3">
                      <h4>Học phí (Cả khóa)</h4>
                      <div>
                        <input type="checkbox" name="course_price"/>
                        <label htmlFor=""><span><span></span></span>Bất kỳ</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_price"/>
                        <label htmlFor=""><span><span></span></span>Dưới 1tr</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_price"/>
                        <label htmlFor=""><span><span></span></span>1tr - 5tr</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_price"/>
                        <label htmlFor=""><span><span></span></span>5tr - 10tr</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_price"/>
                        <label htmlFor=""><span><span></span></span>Trên 10tr</label>
                      </div>
                      <div>
                        <input type="checkbox" name="course_price" value="custom"/>
                        <label><span><span></span></span>
                        <input type="text" name="course_price_cl" placeholder="Mức thấp"/>
                        -
                        <input type="text" name="course_price_ch" placeholder="Mức cao"/>
                        </label>
                      </div>
                    </div>{/* Tuition fee */}
                    <div className="clearfix"></div>
                    
                    <div className="col-md-4">
                      <h4>Giáo viên</h4>
                      <Select2
                        data={[
                          {text: 'Tất cả', id: 'all'},
                          {text: 'Nguyễn Văn A', id: 'nguyen-van-a'},
                          {text: 'Huỳnh Văn B', id: 'huynh-van-b'},
                          {text: 'Vũ Văn C', id: 'vu-van-c'},
                        ]}
                        multiple
                      />
                    </div>{/* Tutor */}


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
  locations: React.PropTypes.object.isRequired,
  selectedCategoryIds: React.PropTypes.array.isRequired
};

export default cssModules(CourseFilter, styles);
