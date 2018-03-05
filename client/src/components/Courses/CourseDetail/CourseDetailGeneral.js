import React, { Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import { PublicCourseDetailFollowModalContainer } from '../../../containers/index'
import { PublicCourseDetailEnrollContainer } from '../../../containers/index'
import {SERVER_NAME} from "utils/CommonConstant";
import { TT } from "../../../utils/locale"
import DateUtils from "../../../utils/DateUtils"
import ObjectUtils from "../../../utils/ObjectUtils"
import { Link } from 'react-router-dom'

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailGeneral extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { course, course_tutor } = this.props
    return (
      <div className="course-detail-general">
        <div className="col-md-12 text-center">
          <img src={
            course.cover_image ? 
            SERVER_NAME + course.cover_image : 
            'http://placehold.it/1200x400'
          } alt=""/>
        </div>{/* Course thumb */}
        <div className="clearfix"></div>
        
        <br/>
        <div className="col-md-10">
          <h2 className="heading-line course-title">{course.title}</h2>
        </div>{/* Course title */}

        <div className="col-md-2 text-right">
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
                  <td className="text-left">{this.context.t('tuition_fee')}</td>
                  <td className="text-right">{ObjectUtils.currencyFormat(course.tuition_fee, course.currency) }</td>
                </tr>
                <tr>
                  <td className="text-left">{this.context.t('course_category')}</td>
                  <td className="text-right">{
                    course.category != undefined ? course.category.name : null
                  }</td>
                </tr>
                <tr>
                  <td className="text-left">{this.context.t('start_date')}</td>
                  <td className="text-right">{DateUtils.formatDate(course.start_date)}</td>
                </tr>
                <tr>
                  <td className="text-left">{this.context.t('number_of_students')}</td>
                  <td className="text-right">{course.number_of_students}</td>
                </tr>
                <tr>
                  <td className="text-left">{this.context.t('period')}</td>
                  <td className="text-right">{course.period} {course.period_type}</td>
                </tr>
              </tbody>
            </table>
          </div>{/* Course info */}
          <div className="col-md-5">
            {
              course_tutor && course_tutor != undefined ?
              <CourseTutor
                course={course}
                course_tutor={course_tutor}
              ></CourseTutor> : null
            }
          </div>{/* Course tutor */}
        </div>{/* Course info & course tutor */}
        <div className="clearfix"></div>
        
        <div className="col-md-12">
          <h3 className="heading-line">{this.context.t('course_description')}</h3>
          <div dangerouslySetInnerHTML={{ __html: course.description }} />
        </div>{/* Course intro*/}

      </div>
    )
  }
}

const CourseTutor = (props) => {
  const {course, course_tutor} = props;
  return (
    <table className="table table-responsive">
      <thead>
        <tr className={styles.rowPrimary}>
          <td colSpan="4"><b>{TT.t('tutor_info')}</b></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center" colSpan="4">
            <Link to={"/teachers/" + course.user.id}>
              <img src={course.user.avatar ? course.user.avatar : 'http://placehold.it/75x75'} className="img-circle" alt=""/>
            </Link>
          </td>
        </tr>
        <tr>
          <td className="text-center" colSpan="4">
            <Link to={"/teachers/" + course.user.id}>
              <b>{course.user.name ? course.user.name : TT.t('updating')}</b>
            </Link>
          </td>
        </tr>
        <tr><td className="text-center" colSpan="4">
        {course_tutor.description}
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
            <PublicCourseDetailEnrollContainer />
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

CourseDetailGeneral.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailGeneral.propTypes = {
};

export default cssModules(CourseDetailGeneral, styles);
