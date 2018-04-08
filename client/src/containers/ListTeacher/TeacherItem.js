import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {SERVER_NAME} from "utils/CommonConstant";

class TeacherItem extends Component {
  render() {
    const num_reviews = this.props.data.num_reviews || 0;
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="teacher-item-grid">
          <UserAction />

          <Link to={`/teacher/${this.props.data.id}`} className="teacher-wrap-content">
            <div className="image"><img src={`${this.props.data.user.avatar ? SERVER_NAME + this.props.data.user.avatar : 'http://placehold.it/150x150'}`} alt="Image"/></div>
            <div className="content">
              <div className="rating-wrapper">
                <RatingItem num_stars={this.props.data.num_stars || 0}/>
                <span> {`(${num_reviews} ${num_reviews > 1 ? 'reviews' : 'review'})`}</span>
              </div>

              <h3>{this.props.data.user.name}</h3>
              <TeacherCategory categories={this.props.data.categories}/>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}


TeacherItem.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default TeacherItem;


/* SubComponents parts
*  TeacherCategory, UserAction, RatingItem
* */

class TeacherCategory extends Component {
  render() {
    if (this.props.categories.length === 0) {
      return null;
    }

    const categories = this.props.categories.slice(0, 3).map(category => category.name).join(' · ');
    return (
      <p className="labeling">
        { this.props.categories.length > 3 ? categories+'...' : categories}
      </p>
    );
  }
}

class UserAction extends Component {
  render() {
    return (
      <ul className="user-action">
        <li>
          <a href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title={this.context.t('user_action_save')}>
            <i className="fa fa-heart"></i>
          </a>
        </li>
        <li>
          <a href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title={this.context.t('user_action_follow')}>
            <i className="fa fa-user-plus"></i>
          </a>
        </li>
      </ul>
    );
  }
}

UserAction.contextTypes = {
  t: React.PropTypes.func.isRequired
};


class RatingItem extends Component {
  render() {
    const { num_stars } = this.props;
    let numFullStars = parseInt(num_stars);

    return (
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
    )
  }
}
