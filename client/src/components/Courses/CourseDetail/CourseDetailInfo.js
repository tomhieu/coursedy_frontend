import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="course-detail-info">
        <div className="col-md-12">
          <img src="http://placehold.it/1600x400" alt="" className="img-responsive"/>
        </div>{/* Course thumb */}
        <div className="clearfix"></div>

        <div className="col-md-12">
          <div>
            <i className="fa fa-calendar"></i> Thứ 2, Thứ 3, Thứ 4
          </div>{/* Course schedule days */}
          <div>
            <i className="fa fa-clock-o"></i> 7:00AM - 8:30AM
          </div>{/* Course schedule time */}
        </div>{/* Course schedule */}
        <div className="clearfix"></div>
        
        <div className="col-md-12">
          <h2 className="heading-line course-title"></h2>
        </div>{/* Course title */}

        <div className={'col-md-12 ' + styles.noPad}>
          <div className="col-md-7">
            <table className="table">
              <thead>
                <tr className={styles.rowPrimary}>
                  <th colSpan="2"><b>Thông tin khóa học</b></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">Cấp độ</td>
                  <td className="text-right">Cơ bản</td>
                </tr>
                <tr>
                  <td className="text-left">Ngày bắt đầu</td>
                  <td className="text-right">16-07-2017</td>
                </tr>
                <tr>
                  <td className="text-left">Số học sinh</td>
                  <td className="text-right">10</td>
                </tr>
                <tr>
                  <td className="text-left">Số buổi học</td>
                  <td className="text-right">20</td>
                </tr>
              </tbody>
            </table>
          </div>{/* Course info */}
          <div className="col-md-5">
            <table className="table table-responsive">
              <thead>
                <tr className={styles.rowPrimary}>
                  <td colSpan="4"><b>Thông tin giáo viên</b></td>
                </tr>
              </thead>
              <tbody>
                <tr><td className="text-center" colSpan="4">
                  <img src="http://placehold.it/75x75" className="img-circle" alt=""/>
                </td></tr>
                <tr><td className="text-center" colSpan="4">
                  <b>Nguyễn Văn A</b>
                </td></tr>
                <tr><td className="text-center" colSpan="4">
                  Với 5 năm kinh nghiệm giảng dạy môn Tiếng Anh tại trường THPT Ngô Gia Tự. 900 TOIEC
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
                    <button className={'btn btn-primary ' + styles.fullWidth}>Đăng ký</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>{/* Course tutor */}
        </div>{/* Course info & course tutor */}
        <div className="clearfix"></div>
        
        <div className="col-md-12">
          <h3 className="heading-line">Giới thiệu khóa học</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta incidunt voluptatum cum tempore, quo maxime aliquam. Doloremque corrupti ab, consectetur ad, fuga, tenetur maiores accusantium, iste quas optio inventore beatae?</p>
        </div>{/* Course intro*/}
        <div className="clearfix"></div>

        <div className="col-md-12">
          <h3 className="heading-line">Những gì bạn được học</h3>
          <ul>
            <li>Cách học từ vựng nhanh nhất theo nội dung thi IELTS</li>
            <li>Luyện kỹ năng nghe hiểu theo bài thi IELTS</li>
            <li>Luyện khả năng giao tiếp theo các topic của để thi IELTS</li>
            <li>Khoá học sẽ hường dẫn cách viết bà essay đạt điểm cao trong kỳ thi IELTS</li>
            <li>Luyện khả năng đọc hiểu nhanh trong phần Reading</li>
          </ul>
        </div>{/* Course outcome */}

      </div>
    )
  }
}

CourseDetailInfo.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailInfo.propTypes = {
};

export default cssModules(CourseDetailInfo, styles);
