import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as TeacherActions from "../../actions/TeacherCreators";
import {connect} from 'react-redux';


class PublicTeacherListContainer extends Component {
  componentDidMount() {
    this.props.dispatch(TeacherActions.fetchTeachers())
  }

  loadMoreTeacher() {
    // let url = this.props.teachers.next
    // this.props.dispatch(TeacherActions.fetchMoreTeachers())
  }

  renderTeacherList() {
    let teacherListData = [
      {id: 1, name: "Nguyễn Văn Sĩ", field: "Giáo viên tiếng anh", email: "sivan@gmail.com", cover_image: "http://lorempixel.com/425/299/nature"},
      {id: 2, name: "Hồ Thị Ánh Nguyệt", field: "Giáo viên tiếng toán", email: "tuyetho@gmail.com", cover_image: "http://lorempixel.com/425/299/nature"},
      {id: 3, name: "Nguyễn Văn Sĩ", field: "Giáo viên tiếng CNPM", email: "sivan@gmail.com", cover_image: "http://lorempixel.com/425/299/nature"},
      {id: 4, name: "Hồ Thị Ánh Nguyệt", field: "Giáo viên tiếng anh", email: "tuyetho@gmail.com", cover_image: "http://lorempixel.com/425/299/nature"},
      {id: 5, name: "Nguyễn Trung Thành", field: "Giáo viên tiếng anh", email: "trungthanh@gmail.com", cover_image: "http://lorempixel.com/425/299/nature"},
      {id: 6, name: "Nguyễn Thành Trung", field: "Giáo viên tiếng anh", email: "trungthanh@gmail.com", cover_image: "http://lorempixel.com/425/299/nature"},
      {id: 7, name: "Hồ Phát Đạt", field: "Giáo viên tiếng anh", email: "datho@gmail.com", cover_image: "http://lorempixel.com/425/299/nature"},
    ];

    let teacherRender = teacherListData.map((item) => {
      return (
        <div className="col-md-3 col-sm-3 margin30 teacher-item" key={item.id}>
          <Link to={`#`} className="teacher-item__info">
            <div className="item-img-wrap">
              <img src={item.cover_image} className="img-responsive" alt=""/>
              <div className="item-img-overlay">
                <div className="show-image">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="teacher-item__contact">
              <div className="person-name">{item.name}</div>
              <div className="person-filed">{item.field}</div>
              <div className="person-email">{item.email}</div>
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
          <button onClick={this.loadMoreTeacher} className="btn__load-more">{this.context.t('teacher_list_more')}</button>
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
  };
}

PublicTeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    teachers: state.TeachersFilter.teachers
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(PublicTeacherListContainer);
