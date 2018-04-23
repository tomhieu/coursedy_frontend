import React, { Component } from 'react'

export default class RatingItem extends Component {
  render() {
    let numFullStars = this.props.num_stars
    let numReviews = this.props.num_reviews

    return (
      <div className="rating-wrapper">
        <div className="rating-item">
          {[1,2,3,4,5].map(v => {
            return (
              <div className="rating-symbol" key={v}>
                <div className="rating-symbol-background fa fa-star-o" style={{'visibility': `${v <= numFullStars ? 'hidden' : 'visible'}`}}></div>
                <div className="rating-symbol-foreground" style={{ 'display': 'inline-block', 'position': 'absolute', 'overflow': 'hidden', 'left': 0, 'right': 0, 'width': `${v <= numFullStars ? 'auto' : ((numFullStars + 1 - v) > 0 ? (numFullStars + 1 - v) : 0 )*100}%` }}><span className="fa fa-star"></span></div>
              </div>
            )
          })}
        </div>
        { numReviews ?
          <span> {this.context.t('total_review', {reviews: numReviews})} </span> : null
        }
      </div>
    )
  }
}

RatingItem.defaultProps = {
  num_stars: 0,
  num_reviews: 0
}

RatingItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RatingItem.propTypes = {
  num_stars: React.PropTypes.number.isRequired,
  num_reviews: React.PropTypes.number.isRequired
}
