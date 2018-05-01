import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import ReviewTeacherForm from './ReviewTeacherForm'
import ReviewContent from '../../../../components/Review/ReviewContentComponent'


class TeacherReviewList extends Component {
  handlePageChange(pageNumber) {

  }

  renderReviewButton() {
    return (
      <div className="pull-right pull-left-xs">
        <button
          className="btn btn-primary btn-block btn-toggle btn-hidden btn-small collapsed mt-2 mb-2"
          data-toggle="collapse"
          data-target="#change-search"
          aria-expanded="false">{this.context.t('write_review_teacher')}</button>
      </div>
    )
  }

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
              <div className="col-xs-12 col-sm-8">
                <Pagination
                  activePage={headers.currentPage}
                  itemsCountPerPage={headers.perPage}
                  totalItemsCount={headers.total}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  innerClass="pagination mt-15"
                />
              </div>
              <div className="col-xs-12 col-sm-4">
                {this.renderReviewButton()}
              </div>
            </div> : this.renderReviewButton()
          }
        </div>
        <ReviewTeacherForm />
      </div>
    )
  }
}


TeacherReviewList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TeacherReviewList
