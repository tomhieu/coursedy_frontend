import React, { Component } from 'react'
import './ReviewContent.scss'

class ReviewContent extends Component {

  contentHeader(review) {
    return (
      <div className="row gap-20 mb-0">
        <div className="col-sm-9">
          <h6>{review.user.name}</h6>
        </div>
        <div className="col-sm-3">
          <p className="review-date">{review.created}</p>
        </div>
      </div>
    )
  }

  render() {
    const { review } = this.props
    if (!review) { return null }

    return (
      <div className="review-info">
        <div className="image">
          <img className="img-circle" src={review.user.avatar} alt={review.user.gender === 'M' ? 'Man' : 'Woman'} />
        </div>
        <div className="content">
          { this.contentHeader(review) }
          <div className="review-text">
            {review.text}
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewContent