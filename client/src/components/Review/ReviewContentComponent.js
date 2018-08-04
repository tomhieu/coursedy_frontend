import React, { Component } from "react";
import "./ReviewContent.scss";
import DateUtils from "utils/DateUtils";

class ReviewContent extends Component {
  render() {
    const { review } = this.props;
    if (!review) {
      return null;
    }

    return (
      <div className="review-info">
        <div className="image">
          <img
            className="img-circle"
            src={review.user.avatar}
          />
        </div>
        <div className="content">
          <ReviewHeader review={review} />
          <div className="review-text">{review.content}</div>
        </div>
      </div>
    );
  }
}

const ReviewHeader = ({ review }) => {
  return (
    <div className="gap-20 mb-0">
      <div>
        <h6>{review.user.name}</h6>
      </div>
      <div className="d-flex justify-content-left">
        <p className="review-date small-date">{DateUtils.dateTimeFromNow(review.created_at)}</p>
      </div>
    </div>
  );
};

export default ReviewContent;
