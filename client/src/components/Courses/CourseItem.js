import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { LinkContainer } from 'react-router-bootstrap'



/**
  * @Course group item template 2
  * @Use for CoursePage
  */
class CourseItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-xs-12">
        <div className="col-xs-12">
          <div className="course-thumb">
            <LinkContainer to={ '/course/' + this.props.item.id } className={styles.fullWidth + ' img-responsive'}>
              <img src={this.props.item.cover_image} alt="" />
            </LinkContainer>
          </div>
        </div>{/* End course thumb */}

        <div className="clearfix"></div>
        <div className="col-xs-12">
          <ul className={styles.courseRating + ' list-unstyled'}>
            <li><div className="" data-score="4"></div></li>
            <li><div className={styles.text}>{this.props.item.no_comments} nhận xét</div></li>
          </ul>
        </div>{/* End course rating */}

        <div className="clearfix"></div>
        <div className="col-xs-12">
          <div className="col-xs-12 col-sm-12 col-md-8 course-info no-pad">
            <h3 className={styles.courseTitle}>
              <LinkContainer to={ '/course/' + this.props.item.id }><span>{this.props.item.title}</span></LinkContainer>
            </h3>
            <div className={styles.text + " col-xs-12 col-sm-12 col-md-5 no-pad"}>Thời lượng: {this.props.item.period} {this.props.item.period_type}</div>
            <div className={styles.text + " col-xs-12 col-sm-12 col-md-7 no-pad"}>Thời gian: {this.props.item.schedule}</div>
            <div className="col-xs-12 col-sm-12 col-md-12 no-pad">
              <br/>
              <button className="btn btn-primary">Xem chi tiết</button>
            </div>
          </div>{/* End course info */}
          <div className="col-xs-12 col-sm-12 col-md-4 course-tutor-info">
            <div className={styles.courseTutorAvatar}>
              <LinkContainer to={ '/tutor/' + this.props.item.user.id }>
                <img src={this.props.item.user.avatar} alt="" className={styles.courseTutorAvatar + ' img-responsive img-circle'} />
              </LinkContainer>
            </div>
            <br/>
            <p className={styles.courseTutorName}>
              <a href="#"> {this.props.item.user.first_name} {this.props.item.user.last_name}</a>
            </p>
          </div>{/* End tutor avatar */}
        </div>
      </div>

    )
  }
}

CourseItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseItem.propTypes = {
};

export default cssModules(CourseItem, styles);
