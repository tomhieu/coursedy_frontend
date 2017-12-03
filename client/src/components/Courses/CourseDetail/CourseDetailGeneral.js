import React, { Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import { PublicCourseDetailFollowModalContainer } from '../../../containers/index'

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailGeneral extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let courseTutor = null
    if (this.props.course_tutor && this.props.course_tutor != undefined) {
      courseTutor = <table className="table table-responsive">
        <thead>
          <tr className={styles.rowPrimary}>
            <td colSpan="4"><b>{this.context.t('tutor_info')}</b></td>
          </tr>
        </thead>
        <tbody>
          <tr><td className="text-center" colSpan="4">
            <img src={this.props.course.user.avatar ? this.props.course.user.avatar : 'http://placehold.it/75x75'} className="img-circle" alt=""/>
          </td></tr>
          <tr><td className="text-center" colSpan="4">
            <b>{this.props.course.user.name ? 
            this.props.course.user.name :
            this.context.t('updating')}</b>
          </td></tr>
          <tr><td className="text-center" colSpan="4">
          {this.props.course_tutor.description}
          </td></tr>
          <tr>
            <td className="text-center"><i className="fa fa-facebook"></i></td>
            <td className="text-center"><i className="fa fa-twitter"></i></td>
            <td className="text-center"><i className="fa fa-google-plus"></i></td>
            <td className="text-center"><i className="fa fa-linkedin"></i></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className={'text-center'}>
              <button className={'btn btn-primary ' + styles.fullWidth}>{this.context.t('course_subscribe')}</button>
            </td>
          </tr>
        </tfoot>
      </table>
    } 
    return (
      <div className="course-detail-general">
        <div className="col-md-12 text-center">
          <img src={
            this.props.course.cover_image ? 
            this.props.course.cover_image : 
            'http://placehold.it/1200x400'
          } alt="" className="img-responsive"/>
        </div>{/* Course thumb */}
        <div className="clearfix"></div>
        
        <br/>
        <div className="col-md-11">
          <h2 className="heading-line course-title">{this.props.course.title}</h2>
        </div>{/* Course title */}
        <div className="col-md-1">
          <PublicCourseDetailFollowModalContainer />
        </div>{/* Course follow */}
        <div className="clearfix"></div>

        <div className={'col-md-12 ' + styles.noPad}>
          <div className="col-md-7">
            <table className="table">
              <thead>
                <tr className={styles.rowPrimary}>
                  <th colSpan="2"><b>{this.context.t('course_info')}</b></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">{this.context.t('level')}</td>
                  <td className="text-right">{
                    this.props.course_level ? this.props.course_level.name : ""
                  }</td>
                </tr>
                <tr>
                  <td className="text-left">{this.context.t('start_date')}</td>
                  <td className="text-right">{this.props.course.start_date}</td>
                </tr>
                <tr>
                  <td className="text-left">{this.context.t('number_of_students')}</td>
                  <td className="text-right">{this.props.course.number_of_students}</td>
                </tr>
                <tr>
                  <td className="text-left">{this.context.t('period')}</td>
                  <td className="text-right">{this.props.course.period} {this.props.course.period_type}</td>
                </tr>
              </tbody>
            </table>
          </div>{/* Course info */}
          <div className="col-md-5">
            {courseTutor}
          </div>{/* Course tutor */}
        </div>{/* Course info & course tutor */}
        <div className="clearfix"></div>
        
        <div className="col-md-12">
          <h3 className="heading-line">{this.context.t('course_description')}</h3>
          <div dangerouslySetInnerHTML={{ __html: this.props.course.description }} />
        </div>{/* Course intro*/}

      </div>
    )
  }
}

CourseDetailGeneral.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailGeneral.propTypes = {
};

export default cssModules(CourseDetailGeneral, styles);
