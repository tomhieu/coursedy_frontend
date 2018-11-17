import React, { Component } from 'react';
import './ReviewContent.scss';
import DateUtils from 'utils/DateUtils';
import UserAvatar from '../Account/UserAvatar';

class ReviewContent extends Component {
  render() {
    const { review } = this.props;
    if (!review) {
      return null;
    }

    return (
      <div className="review-info">
        {
          review.user.avatar ?
            <div className="image">
              <img
                className="img-circle"
                src={review.user.avatar}
              />
            </div> : <UserAvatar username={review.user.name} classNames="image img-circle user-comment" />
        }
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
      <div className="d-flex">
        <strong className="pr-10">{review.user.name}</strong>
        <span className="date">
          {' · '}
          {DateUtils.dateTimeFromNow(review.created_at)}
        </span>
      </div>
    </div>
  );
};

export default ReviewContent;
