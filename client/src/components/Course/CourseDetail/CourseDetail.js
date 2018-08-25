import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseDetail.module.scss';

class CourseDetail extends Component {
  render() {
    return (
      <div className="course-detail">
        <div className="col-xs-12">
          <img src="http://placehold.it/200x100" alt="" className={`${styles.fullWidth} img-responsive center-block`} />
        </div>
        <div className="clearfix" />


        <div className="col-xs-12">
          <h2>LUYỆN IELTS TIẾNG ANH</h2>
        </div>
        <div className="clearfix" />


        <div className="col-xs-12">
          <div className="col-xs-12 col-sm-12 col-md-7">
            <div className="panel panel-primary">
              <div className="panel-heading">Thông Tin Khoá Học</div>
              <div className="panel-body">
                <table className="table table-responsive">
                  <tbody>
                    <tr>
                      <td>Cấp độ:</td>
                      <td>Beginner</td>
                    </tr>
                    <tr>
                      <td>Ngày bắt đầu:</td>
                      <td>16-07-2017</td>
                    </tr>
                    <tr>
                      <td>Thời lượng</td>
                      <td>1 tiếng</td>
                    </tr>
                    <tr>
                      <td>Số học sinh:</td>
                      <td>10 người</td>
                    </tr>
                    <tr>
                      <td>Số tiết học:</td>
                      <td>20 tiết</td>
                    </tr>
                    <tr>
                      <td>Thời gian:</td>
                      <td>19pm - 20pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* End course info */}

          <div className="col-xs-12 col-sm-12 col-md-5">
            <div className="panel panel-primary">
              <div className="panel-heading">Thông Tin Giáo Viên</div>
              <div className="panel-body">
                <div className="col-xs-12">
                  <img src="http://placehold.it/75x75" className="img-responsive img-circle center-block" alt="" />
                </div>
                <div className="col-xs-12 text-center">
                  <h3>Lê Quốc Việt</h3>
                </div>
                <div className="col-xs-12 text-center">
                  <p><i>Với 5 năm kinh nghiệm giảng dạy môn Tiếng Anh tại trường THPT Ngô Gia Tự. 900 TOIEC</i></p>
                </div>
                <div className="col-xs-12 text-center">
                  <ul className="list-unstyled list-inline">
                    <li><i className="fa fa-2x fa-facebook" /></li>
                    <li><i className="fa fa-2x fa-twitter" /></li>
                    <li><i className="fa fa-2x fa-google-plus" /></li>
                    <li><i className="fa fa-2x fa-linkedin" /></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End tutor info */}
        </div>
        {/* Course brief */}
        <div className="clearfix" />


        <div className="col-xs-12">
          <h2>Giới Thiệu Khoá Học</h2>
          <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam atque architecto eius provident, soluta, obcaecati consequuntur excepturi aliquam dolorum doloremque tempora reprehenderit odio distinctio repellendus impedit asperiores quasi, voluptates inventore.</p>
        </div>
        {/* Course introduction */}
        <div className="clearfix" />

        <div className="col-xs-12">
          <h2>Những gì bạn được học</h2>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt mollitia quod, qui aspernatur, perferendis minus eaque hic! Quod optio aliquam reiciendis expedita veniam ullam soluta dignissimos distinctio, dolorem, consectetur nam.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt mollitia quod, qui aspernatur, perferendis minus eaque hic! Quod optio aliquam reiciendis expedita veniam ullam soluta dignissimos distinctio, dolorem, consectetur nam.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt mollitia quod, qui aspernatur, perferendis minus eaque hic! Quod optio aliquam reiciendis expedita veniam ullam soluta dignissimos distinctio, dolorem, consectetur nam.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt mollitia quod, qui aspernatur, perferendis minus eaque hic! Quod optio aliquam reiciendis expedita veniam ullam soluta dignissimos distinctio, dolorem, consectetur nam.</li>
          </ul>
        </div>
        {/* Course outcome */}
        <div className="clearfix" />
        <hr />


        <div className="col-xs-12">
          <h2>Chi Tiết Khoá Học</h2>
          <div className="panel-group">
            {

              [1, 2, 4, 5, 6].map((value, index) => (
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${index}`}>
                  Chương
                        {' '}
                        {index + 1}
                        {' '}
- Introduction to Photoshop CS6 Extremely
                      </a>
                    </h4>
                  </div>
                  <div id={`collapse${index}`} className="panel-collapse collapse in">
                    <div className="panel-body">
                      <table className="table table-responsive">
                        <tbody>
                          <tr>
                            <td>Lorem ipsum dol</td>
                            <td>1 giờ 30 phút</td>
                          </tr>
                          <tr>
                            <td>Lorem ipsum dol</td>
                            <td>1 giờ 30 phút</td>
                          </tr>
                          <tr>
                            <td>Lorem ipsum dol</td>
                            <td>1 giờ 30 phút</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))

            }
          </div>
        </div>
        {/* Course detail */}
        <div className="clearfix" />


        <div className="col-xs-12">
          <button className="btn btn-primary btn-lg pull-left">Xem tất cả khóa học</button>
        </div>
        {/* All course */}
        <div className="clearfix" />

        <div className="col-xs-12">
          <div className={styles.courseComments}>
            {
              [1, 1, 1, 1, 1, 1].map((value, index) => (
                <div className={styles.courseComment} key={index}>
                  <div className="col-xs-12 col-sm-12 col-md-2">
                    <img src="http://placehold.it/75x75" className="img-responsive center-block" alt="" />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-10">
                    <h3 className={styles.commentAuthor}>Nguyễn Văn Tuấn</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt placeat eaque, doloremque voluptatum eum fugiat dignissimos qui, fugit inventore laborum distinctio quidem, recusandae ut quia soluta autem modi voluptatibus omnis.</p>
                    <p>
                      <ul className="list-inline">
                        <li>
                          <i className="fa fa-share" />
                          {' '}
Share:
                        </li>
                        <li><i className="fa fa-facebook" /></li>
                        <li><i className="fa fa-google-plus" /></li>
                      </ul>
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {/* Course comments */}
        <div className="clearfix" />

      </div>
    );
  }
}


CourseDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetail.propTypes = {
};

export default cssModules(CourseDetail, styles);
