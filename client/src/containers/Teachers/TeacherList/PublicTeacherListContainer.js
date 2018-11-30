import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchTeachers } from 'actions/TeacherActionCreators';
import Pagination from 'react-js-pagination';
import LoadingMask from 'containers/LoadingMask/LoadingMask';
import TutorList from '../../../components/Tutor/TutorList/TutorList';
import * as WebConstants from '../../../constants/WebConstants';
import PaginationArrowIcon from '../../../components/Core/Icons/PaginationArrowIcon';
import { PAGE_RANGE_DISPLAYED } from '../../../constants/Layout';
import { withRouter } from 'react-router-dom';


class PublicTeacherListContainer extends Component {
  componentDidMount() {
    this.props.fetchTeacherList(this.props);
    this.props.stretchFull();
  }

  componentWillUnmount() {
    this.props.stretchAuto();
  }

  handlePageChange(pageNumber) {
    this.props.searchTeachers(this.props, { page: pageNumber, per_page: this.props.headers.perPage });
  }

  render() {
    const { teachers, isFetching, headers } = this.props;
    return (
      <LoadingMask
        placeholderId="publicTeacherListPlaceholder"
        loaderType="COURSE_ITEM_PLACEHOLDER"
        repeatTime={4}
      >
        <div className="public-teacher-list d-flex flex-column flex-stretch">
          <div className="container mt-15 mb-15">
            <TutorList
              {...this.props}
              isPublic
            />
          </div>
          {
            !isFetching && teachers.length > 0 && headers.total > headers.perPage ? (
              <div className="container d-flex justify-content-center mb-10 mt-10">
                <Pagination
                  hideFirstLastPages
                  prevPageText={<PaginationArrowIcon isLeftArrow />}
                  nextPageText={<PaginationArrowIcon />}
                  innerClass="mt-8 pagination"
                  linkClassPrev="prev-page-icon"
                  linkClassNext="next-page-icon"
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={headers.currentPage}
                  itemsCountPerPage={headers.perPage}
                  totalItemsCount={headers.total}
                  pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
                  activeClass="active"
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            ) : null
          }
        </div>
      </LoadingMask>
    );
  }
}

PublicTeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { isFetching, data, headers, filters } = state.Teachers;

  return {
    isFetching,
    filters,
    teachers: data.filter(tutor => tutor.user !== null),
    headers: {
      currentPage: (headers && parseInt(headers.xPage, 10)) || 0,
      perPage: (headers && parseInt(headers.xPerPage, 10)) || 0,
      total: (headers && parseInt(headers.xTotal, 10)) || 0
    }
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTeacherList: props => dispatch(searchTeachers(props.searchQuery(props.filters, props.location.search))),
  searchTeachers: (props, query) => dispatch(searchTeachers({ ...props.searchQuery(props.filters, props.location.search), ...query })),
  stretchFull: () => dispatch({ type: WebConstants.STETCH_FULL }),
  stretchAuto: () => dispatch({ type: WebConstants.STETCH_AUTO }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PublicTeacherListContainer));
