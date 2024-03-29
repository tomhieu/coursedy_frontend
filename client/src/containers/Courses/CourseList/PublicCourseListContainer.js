import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { FETCH_COURSES, RESET_COURSE_FILTER } from 'constants/Courses';
import { withRouter } from 'react-router';
import * as WebConstants from 'constants/WebConstants';
import Network from 'utils/network';
import cssModules from 'react-css-modules';
import styles from './PublicCourseList.module.scss';
import LoadingMask from '../../LoadingMask/LoadingMask';
import * as Actions from '../../../actions/CourseFilterActionCreator';
import { CourseList } from '../../../components/index';
import PaginationArrowIcon from '../../../components/Core/Icons/PaginationArrowIcon';
import { PAGE_RANGE_DISPLAYED } from '../../../constants/Layout';
import { getQueryParam } from '../../../utils/network';

class PublicCourseListContainer extends Component {
  componentDidMount() {
    this.props.search(this.props);
    this.props.stretchFull();
  }

  componentWillUnmount() {
    this.props.stretchAuto();
  }


  handlePageChange(currentPage) {
    this.props.search(Object.assign({}, this.props, { currentPage }));
  }

  selectCourseHdl(courseId) {
    if (!this.props.selectedCourses.includes(courseId)) {
      this.props.selectCourse(courseId);
    } else {
      this.props.removeCourse(courseId);
    }
  }

  render() {
    const {
      courses, isFetching, displayMode,
      currentPage, perPage, totalResult
    } = this.props;

    return (
      <LoadingMask
        placeholderId="publicCourseListPlaceholder"
        normalPlaceholder={displayMode === 'grid'}
        facebookPlaceholder={displayMode !== 'grid'}
        loaderType="COURSE_ITEM_PLACEHOLDER"
        repeatTime={4}
      >
        <div className={styles.publicCourseList}>
          <div className="mt-15 mb-15">
            <CourseList
              {...this.props}
              itemClass="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-15 d-flex justify-content-center"
              selectCourseHdl={this.selectCourseHdl.bind(this)}
              isPublic
            />
          </div>
          {
            !isFetching && courses.length > 0 && totalResult > perPage ? (
              <div className="d-flex justify-content-center mb-15">
                <Pagination
                  hideFirstLastPages
                  prevPageText={<PaginationArrowIcon isLeftArrow />}
                  nextPageText={<PaginationArrowIcon />}
                  innerClass="mt-8 pagination"
                  linkClassPrev="prev-page-icon"
                  linkClassNext="next-page-icon"
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={currentPage}
                  itemsCountPerPage={perPage}
                  totalItemsCount={totalResult}
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

PublicCourseListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

PublicCourseListContainer.propTypes = {
  courses: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  keyWord: state.CourseFilter.filters.term,
  startTime: state.CourseFilter.startTime,
  endTime: state.CourseFilter.endTime,
  selectedFees: state.CourseFilter.selectedFees,
  selectedCategoryIds: state.CourseFilter.selectedCategoryIds,
  selectedLocationIds: state.CourseFilter.selectedLocationIds,
  selectedSpecializes: state.CourseFilter.selectedSpecializes,
  selectedWeekdays: state.CourseFilter.selectedWeekdays,
  courses: state.CourseFilter.courses,
  isFetching: state.CourseFilter.isFetching,
  currentPage: state.CourseFilter.currentPage,
  perPage: state.CourseFilter.perPage,
  totalResult: state.CourseFilter.totalResult,
  displayMode: state.CourseFilter.displayMode,
  selectedCourses: state.CourseFilter.selectedCourses,
  sortBy: state.CourseFilter.sortBy,
  orderBy: state.CourseFilter.orderBy,
  sortOrder: state.CourseFilter.sortOrder,

  followedCourses: state.PublicCourseList.followedCourses
});

const buildQuery = (props, term) => {
  return {
    q: term || props.keyWord,
    categories: props.selectedCategoryIds,
    locations: props.selectedLocationIds,
    levels: props.selectedSpecializes,
    week_day: props.selectedWeekdays,
    fees: props.selectedFees,
    start_time: props.startTime,
    end_time: props.endTime,
    page: props.currentPage,
    order_by: props.orderBy,
    sort_by: props.sortBy,
    sort_order: props.sortOrder,
    per_page: props.perPage
  };
};

const mapDispatchToProps = dispatch => ({
  search: (props) => {
    const term = getQueryParam('q', props.location.search) || props.keyWord;
    dispatch(Actions.updateFilter({ term }));
    dispatch({
      type: FETCH_COURSES,
      payload: Network().get('courses/search', buildQuery(props, term)),
      meta: 'publicCourseListPlaceholder'
    });
  },
  resetFilter: () => dispatch({ type: RESET_COURSE_FILTER }),
  selectCourse: courseId => dispatch(Actions.selectCourse(courseId)),
  removeCourse: courseId => dispatch(Actions.removeCourse(courseId)),
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
  stretchFull: () => dispatch({ type: WebConstants.STETCH_FULL }),
  stretchAuto: () => dispatch({ type: WebConstants.STETCH_AUTO }),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(cssModules(PublicCourseListContainer, styles)));
