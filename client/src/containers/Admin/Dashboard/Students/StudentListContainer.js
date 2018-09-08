import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Network from 'utils/network';
import DateUtils from 'utils/DateUtils';
import ObjectUtils from '../../../../utils/ObjectUtils';
import {
  FETCH_ADMIN_STUDENTS
} from '../../../../actions/AsyncActionCreator';
import * as dashboardActions from '../../../../actions/DashboardMenuActionCreator';

class StudentListContainer extends Component {
  componentDidMount() {
    this.props.fetchStudents(this.props);
    this.props.activateTab('admin_students');
  }

  fetchData(state, instance) {
    this.props.fetchStudents({
      ...this.props,
      currentPage: state.page + 1,
      perPage: state.pageSize,
    });
  }

  render() {
    const {
      students, totalResult, perPage, isLoading
    } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 mb-15">
          <button className="btn btn-lg btn-primary">{this.context.t('admin_students_new')}</button>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="panel panel-primary">
            <div className="panel-body">
              <div className="table-responsive">
                <ReactTable
                  data={students}
                  filterable
                  columns={[
                    {
                      Header: 'Họ và tên',
                      id: 'student_name',
                      accessor: d => d.user.name,
                    },
                    {
                      Header: 'Chuyên môn',
                      accessor: 'title',
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
    );
  }
}

StudentListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

const buildQuery = (props) => {
  return {
    page: props.currentPage,
    per_page: props.perPage
  };
};

const mapStateToProps = state => ({
  teachers: state.AdminStudentListReducer.unapprovedTeachers,
  isLoading: state.AdminStudentListReducer.isLoading,
  totalResult: state.AdminStudentListReducer.totalResult,
  perPage: state.AdminStudentListReducer.perPage,
});

const mapDispatchToProps = dispatch => ({
  // fetchStudents: (props) => dispatch({
  //   type: FETCH_ADMIN_STUDENTS,
  //   payload: Network().get('courses/unapproved', buildQuery(props)),
  // }),
  fetchStudents: props => dispatch({
    type: FETCH_ADMIN_STUDENTS,
    payload: Network().get('tutors/search', buildQuery(props)),
  }),
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),

});

export default connect(
  mapStateToProps, mapDispatchToProps
)(StudentListContainer);
