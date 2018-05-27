import React, { Component } from 'react'
import {connect} from "react-redux";
import ObjectUtils from "../../../../utils/ObjectUtils"
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Network from "utils/network";
import DateUtils from "utils/DateUtils"
import {
  FETCH_UNAPPROVED_COURSES
} from "../../../../actions/AsyncActionCreator"

class CourseListContainer extends Component {
  componentDidMount() {
    this.props.fetchUnapprovedCourses(this.props)
  }

  fetchData(state, instance) {
    console.log('DEBUG fetchData')
    console.log(state.sorted)
    console.log(state.filtered)

    // this.props.fetchUnapprovedCourses({...this.props, keyWord: state.filtered})
  }

  render() {
    const { courses, totalResult, perPage, isLoading } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <button className="btn btn-lg btn-default">{this.context.t('admin_courses_new')}</button>
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
                    },
                    {
                      Header: "Ngày bắt đầu",
                      id: "start_date",
                      accessor: d => DateUtils.formatDate(d.start_date),
                    },
                  ]}
                  pageSize={10}
                  className="-striped -highlight"
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  pages={2} // Display the total number of pages
                  loading={isLoading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData.bind(this)} // Request new data when things change
                  showPaginationTop
                  showPaginationBottom
                  page={1}
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
  isLoading: state.AdminCourseListReducer.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  // fetchUnapprovedCourses: (props) => dispatch({
  //   type: FETCH_UNAPPROVED_COURSES,
  //   payload: Network().get('courses/unapproved', buildQuery(props)),
  // }),
  fetchUnapprovedCourses: (props) => dispatch({
    type: FETCH_UNAPPROVED_COURSES,
    payload: Network().get('courses/search', buildQuery(props)),
  }),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(CourseListContainer)