import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class PublicTeacherListContainer extends Component {
  renderTeacherList() {
    let teacherListData = [
      {id: 1, name: "Nguyễn Văn Sĩ", field: "Giáo viên tiếng anh", phone_number: "0168.499.8274", cover_image: "http://66.175.219.194/uploads/course/cover_image/28/cover_image.jpeg"},
      {id: 2, name: "Hồ Thị Ánh Nguyệt", field: "Giáo viên tiếng toán", phone_number: "0168.499.8274", cover_image: "http://66.175.219.194/uploads/course/cover_image/25/cover_image.jpeg"},
      {id: 3, name: "Nguyễn Văn Sĩ", field: "Giáo viên tiếng CNPM", phone_number: "0168.499.8274", cover_image: "http://66.175.219.194/uploads/course/cover_image/28/cover_image.jpeg"},
      {id: 4, name: "Hồ Thị Ánh Nguyệt", field: "Giáo viên tiếng anh", phone_number: "0168.499.8274", cover_image: "http://66.175.219.194/uploads/course/cover_image/25/cover_image.jpeg"},
      {id: 5, name: "Nguyễn Trung Thành", field: "Giáo viên tiếng anh", phone_number: "0168.499.8274", cover_image: "http://66.175.219.194/uploads/course/cover_image/28/cover_image.jpeg"},
      {id: 6, name: "Nguyễn Thành Trung", field: "Giáo viên tiếng anh", phone_number: "0168.499.8274", cover_image: "http://66.175.219.194/uploads/course/cover_image/28/cover_image.jpeg"},
      {id: 7, name: "Hồ Phát Đạt", field: "Giáo viên tiếng anh", phone_number: "0168.499.8274", cover_image: "http://66.175.219.194/uploads/course/cover_image/28/cover_image.jpeg"},
    ];

    let teacherRender = teacherListData.map((item) => {
      return (
        <div className="col-md-3 col-sm-3 margin30 teacher-item">
          <Link to={`#`} className="teacher-item__info">
            <div className="item-img-wrap">
              <img src={item.cover_image} className="img-responsive" alt=""/>
              <div className="item-img-overlay">
                <a href="#" className="show-image">
                  <span></span>
                </a>
              </div>
            </div>
            <div className="teacher-item__contact">
              <div className="person-name">{item.name}</div>
              <div className="person-filed">{item.field}</div>
              <div className="person-phone-number">{item.phone_number}</div>
            </div>
          </Link>
        </div>
      )
    });

    return(
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div id="grid" className="row">
            { teacherRender }
          </div>
        </div>
      </div>
    );
  }

  renderLoadMoreBtn() {
    return (
      <div className="row footer-section teacher-list-footer">
        <div className="col-md-12 col-sm-12 footer-section__loadmore">
          <button className="btn__load-more">{this.context.t('teacher_list_more')}</button>
        </div>
      </div>
    )
  }

  render() {
   return(
     <div className="container teacher-list-container">
       { this.renderTeacherList() }
       { this.renderLoadMoreBtn() }
     </div>
   )
  }
}

PublicTeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default PublicTeacherListContainer;
