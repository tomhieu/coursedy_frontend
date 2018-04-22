import React, { Component } from 'react'

export default class RatingItem extends Component {
  render() {
    const { num_stars } = this.props
    let numFullStars = parseInt(this.props.num_stars)
    let numReviews = parseInt(this.props.num_reviews)

    return (
      <div className="rating-wrapper">
        <div className="rating-item">
          {[1,2,3,4,5].map(v => {
            return (
              <div className="rating-symbol" key={v}>
                <div className="rating-symbol-background fa fa-star-o" style={{'visibility': `${v <= numFullStars ? 'hidden' : 'visible'}`}}></div>
                <div className="rating-symbol-foreground" style={{ 'display': 'inline-block', 'position': 'absolute', 'overflow': 'hidden', 'left': 0, 'right': 0, 'width': `${v <= numFullStars ? 'auto' : (numFullStars++ < num_stars ? '50%' : '0')}` }}><span className="fa fa-star"></span></div>
              </div>
            )
          })}
        </div>
        { numReviews ?
          <span> {`(${numReviews} ${numReviews > 1 ? 'reviews' : 'review'})`}</span> : null
        }
      </div>
    )
  }
}

RatingItem.defaultProps = {
  num_stars: 0,
  num_reviews: 0
}

RatingItem.propTypes = {
  num_stars: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  num_reviews: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ])
}
