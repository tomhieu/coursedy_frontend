import React, { Component } from 'react'
import {connect} from "react-redux";
import ObjectUtils from "../../../../utils/ObjectUtils"
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Network from "utils/network";
import DateUtils from "utils/DateUtils"
import {
  FETCH_ADMIN_UNAPPROVED_COURSES
} from "../../../../actions/AsyncActionCreator"
import * as dashboardActions from '../../../../actions/DashboardMenuActionCreator';

class CourseListContainer extends Component {
  componentDidMount() {
    this.props.fetchUnapprovedCourses(this.props)
    this.props.activateTab('admin_courses')
  }

  fetchData(state, instance) {
    this.props.fetchUnapprovedCourses({
      ...this.props, 
      keyWord: state.filtered,
      currentPage: state.page + 1,
      perPage: state.pageSize,
    })
  }

  render() {
    const { courses, totalResult, perPage, isLoading, currentPage } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 mb-15">
          <button className="btn btn-lg btn-primary">{this.context.t('admin_courses_new')}</button>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="panel panel-primary">
            <div className="panel-body">
              <div className="table-responsive">
                <ReactTable
                  data={courses}
                  filterable
                  columns={[
                    {
                      Header: "Tên khóa học",
                      accessor: "title",
                    },
                    {
                      Header: "Giáo viên",
                      id: "teacher_name",
                      accessor: d => d.user.name,
                      filterable: false
                    },
                    {
                      Header: "Ngày bắt đầu",
                      id: "start_date",
                      accessor: d => DateUtils.formatDate(d.start_date),
                      filterable: false
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  pages={Math.ceil(totalResult / perPage)} // Display the total number of pages
                  loading={isLoading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData.bind(this)} // Request new data when things change
                  showPaginationTop
                  showPaginationBottom
                  previousText={this.context.t('react_table_previous_text')}
                  nextText={this.context.t('react_table_next_text')}
                  loadingText={this.context.t('react_table_loading_text')}
                  noDataText={this.context.t('react_table_no_data_text')}
                  pageText={this.context.t('react_table_page_text')}
                  ofText={this.context.t('react_table_of_text')}
                  rowsText={this.context.t('react_table_rows_text')}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CourseListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const buildQuery = (props) => {
  return {
    q: props.keyWord,
    page: props.currentPage,
    per_page: props.perPage
  }
}

const mapStateToProps = (state) => ({
  courses: state.AdminCourseListReducer.unapprovedCourses,
  isLoading: state.AdminCourseListReducer.isLoading,
  totalResult: state.AdminCourseListReducer.totalResult,
  perPage: state.AdminCourseListReducer.perPage,
  currentPage: state.AdminCourseListReducer.currentPage
})

const mapDispatchToProps = (dispatch) => ({
  // fetchUnapprovedCourses: (props) => dispatch({
  //   type: FETCH_ADMIN_UNAPPROVED_COURSES,
  //   payload: Network().get('courses/unapproved', buildQuery(props)),
  // }),
  fetchUnapprovedCourses: (props) => dispatch({
    type: FETCH_ADMIN_UNAPPROVED_COURSES,
    payload: Network().get('courses/search', buildQuery(props)),
  }),
  activateTab: (tabId) => dispatch(dashboardActions.activateTab(tabId)),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(CourseListContainer)