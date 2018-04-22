import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RatingItem from 'components/Rating'


class TeacherItem extends Component {
  render() {
    const num_reviews = this.props.data.num_reviews || 0
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="teacher-item-grid">
          <UserAction/>

          <Link to={`/teachers/${this.props.data.id}`}
                className="teacher-wrap-content">
            <div className="image"><img
              src={`${this.props.data.user.avatar ? this.props.data.user.avatar : 'http://placehold.it/150x150'}`}
              alt="Image"/></div>
            <div className="content">
              <RatingItem num_stars={this.props.data.num_stars || 0}
                          num_reviews={num_reviews}/>
              <h3>{this.props.data.user.name}</h3>
              <TeacherCategory categories={this.props.data.categories}/>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}


TeacherItem.propTypes = {
  data: React.PropTypes.object.isRequired
}

export default TeacherItem


/* SubComponents parts
*  TeacherCategory, UserAction, RatingItem
* */

class TeacherCategory extends Component {
  render() {
    if (this.props.categories.length === 0) {
      return null
    }

    const categories = this.props.categories.slice(0, 3).map(category => category.name).join(' · ')
    return (
      <p className="labeling">
        {this.props.categories.length > 3 ? categories + '...' : categories}
      </p>
    )
  }
}


class UserAction extends Component {
  render() {
    return (
      <ul className="user-action">
        <li>
          <a href="#" data-toggle="tooltip" data-placement="right" title=""
             data-original-title={this.context.t('user_action_save')}>
            <i className="fa fa-heart"></i>
          </a>
        </li>
        <li>
          <a href="#" data-toggle="tooltip" data-placement="right" title=""
             data-original-title={this.context.t('user_action_follow')}>
            <i className="fa fa-user-plus"></i>
          </a>
        </li>
      </ul>
    )
  }
}


UserAction.contextTypes = {
  t: React.PropTypes.func.isRequired
}

