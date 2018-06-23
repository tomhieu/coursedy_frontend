import React, { Component } from 'react'
import {connect} from "react-redux";
import ObjectUtils from "../../../../utils/ObjectUtils"
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Network from "utils/network";
import DateUtils from "utils/DateUtils"
import {
  FETCH_ADMIN_UNAPPROVED_TEACHERS
} from "../../../../actions/AsyncActionCreator"

class TeacherListContainer extends Component {
  componentDidMount() {
    this.props.fetchUnapprovedTeachers(this.props)
  }

  fetchData(state, instance) {
    this.props.fetchUnapprovedTeachers({
      ...this.props, 
      currentPage: state.page + 1,
      perPage: state.pageSize,
    })
  }

  render() {
    const { teachers, totalResult, perPage, isLoading } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 mb-15">
          <button className="btn btn-lg btn-primary">{this.context.t('admin_teachers_new')}</button>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="panel panel-primary">
            <div className="panel-body">
              <div className="table-responsive">
                <ReactTable
                  data={teachers}
                  filterable
                  columns={[
                    {
                      Header: "Họ và tên",
                      id: "teacher_name",
                      accessor: d => d.user.name,
                    },
                    {
                      Header: "Chuyên môn",
                      accessor: "title",
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

TeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const buildQuery = (props) => {
  return {
    page: props.currentPage,
    per_page: props.perPage
  }
}

const mapStateToProps = (state) => ({
  teachers: state.AdminTeacherListReducer.unapprovedTeachers,
  isLoading: state.AdminTeacherListReducer.isLoading,
  totalResult: state.AdminTeacherListReducer.totalResult,
  perPage: state.AdminTeacherListReducer.perPage,
})

const mapDispatchToProps = (dispatch) => ({
  // fetchUnapprovedTeachers: (props) => dispatch({
  //   type: FETCH_ADMIN_UNAPPROVED_TEACHERS,
  //   payload: Network().get('courses/unapproved', buildQuery(props)),
  // }),
  fetchUnapprovedTeachers: (props) => dispatch({
    type: FETCH_ADMIN_UNAPPROVED_TEACHERS,
    payload: Network().get('tutors/search', buildQuery(props)),
  }),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TeacherListContainer)