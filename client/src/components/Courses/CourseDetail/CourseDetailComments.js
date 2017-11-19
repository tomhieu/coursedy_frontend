import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';

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
          <h3 className="heading-line">{this.context.t('course_comments')}</h3>
          <ul className="tree">
          {
            [1,2,3].map(item => (
            <li key={item}>
              <div className="media comments-list">
                <div className="media-left">
                  <img src="http://tutors.projectmenorah.com/assets/uploads/profiles/thumbs/3.jpg" alt="" className="comment-profile img-circle" />
                </div>
                <div className="media-body">
                  <h4>
                    <strong>Azalya Abia</strong> 11/11/2017
                    <span className="avg_rating"></span>
                  </h4>
                  <p>Thank you! dedicated time to me and was not distracted or impatient. Very good knowledgeable. </p>
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
