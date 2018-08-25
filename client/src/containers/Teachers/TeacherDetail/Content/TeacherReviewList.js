import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import ReviewTeacherForm from './ReviewTeacherForm'
import ReviewContent from '../../../../components/Review/ReviewContentComponent'
import PaginationArrowIcon from "../../../../components/Core/Icons/PaginationArrowIcon";


class TeacherReviewList extends Component {
  render() {
    const { teacher } = this.props
    if (!teacher.reviews || !teacher.reviews.data.length) { return null }

    const headers =  {
      currentPage: parseInt(teacher.reviews.headers.xPage) || 0,
        perPage: parseInt(teacher.reviews.headers.xPerPage) || 0,
        total: parseInt(teacher.reviews.headers.xTotal) || 0
    }

    return (
      <div className="teacher-detail__content__review__content">
        <div className="review-content-list">
          { teacher.reviews.data.map((review, index) => {
            return <ReviewContent review={review} key={index} />
          })}
        </div>

        <div className="review-pager pager-wrappper">
          {teacher.reviews.data.length ?
            <div className="row">
              <div className="col-xs-12 col-sm-12">
                <Pagination
                  hideFirstLastPages
                  prevPageText={<PaginationArrowIcon isLeftArrow={true} />}
                  nextPageText={<PaginationArrowIcon />}
                  linkClassPrev="prev-page-icon"
                  linkClassNext="next-page-icon"
                  activePage={headers.currentPage}
                  itemsCountPerPage={headers.perPage}
                  totalItemsCount={headers.total}
                  pageRangeDisplayed={5}
                  activeClass={'active'}
                  onChange={(pageNumber) => this.props.handlePageChange(pageNumber, headers.perPage)}
                />
              </div>
            </div> : null
          }
        </div>
      </div>
    )
  }
}


TeacherReviewList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TeacherReviewList
