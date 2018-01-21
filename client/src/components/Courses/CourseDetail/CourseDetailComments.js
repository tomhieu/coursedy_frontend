import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import {SERVER_NAME} from "utils/CommonConstant";

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailComments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="course-detail-comments">
        <div className="col-md-12">
          <ul className="tree">
          {
            this.props.course_comments.map(item => (
            <li key={'course-comment-' + item.id}>
              <div className="media comments-list">
                <div className="media-left">
                  <img src={item.user.avatar ? 
                      SERVER_NAME + item.user.avatar : 
                      'http://placehold.it/75x75'} 
                    alt="" 
                    className="comment-profile img-circle" />
                </div>
                <div className="media-body">
                  <h4>
                    <strong>{item.user.first_name} {item.user.last_name}</strong> {item.created_at}
                    <span className="avg_rating"></span>
                  </h4>
                  <div>{item.content}</div>
                </div>
              </div>
            </li>  
            ))
          }
          </ul>
        </div>
      </div>
    )
  }
}

CourseDetailComments.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailComments.propTypes = {
};

export default cssModules(CourseDetailComments, styles);
