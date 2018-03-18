import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as TeacherActions from '../../actions/TeacherCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DefaultAvatar from '../../components/Account/DefaultAvatar';


class PublicTeacherListContainer extends Component {
  componentDidMount() {
    this.props.searchTeachers();
  }

  loadMoreTeacher() {
    this.props.searchTeachers({ page: this.props.teachers.nextPage });
  }

  renderTeacherList() {
    let teachersData = this.props.teachers.data;
    let teacherRender = teachersData.map((item) => {
      if (!item.user) {
        return null;
      }
      return (
        <div className="col-md-3 col-sm-3 margin30 teacher-item" key={item.id}>
          <Link to={`/teacher/${item.id}`} className="teacher-item__info">
            <div className="item-img-wrap">
              <DefaultAvatar classNames="avatar__cover" url={item.user.avatar}
                             username={item.user.name}/>
              <div className="item-img-overlay">
                <div className="show-image">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="teacher-item__contact">
              <div className="person-name">{item.user.name}</div>
              <div className="person-filed">{item.title}</div>
              <div className="person-email">{item.user.email}</div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div id="grid" className="row">
            {teacherRender}
          </div>
        </div>
      </div>
    );
  }

  renderLoadMoreBtn() {
    return (
      <div className="row footer-section teacher-list-footer">
        <div className="col-md-12 col-sm-12 footer-section__loadmore">
          {(this.props.teachers.nextPage ?
              <button onClick={this.loadMoreTeacher}
                      className="btn__load-more">{this.context.t('teacher_list_more')}</button> : null
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container teacher-list-container">
        {this.renderTeacherList()}
        {this.renderLoadMoreBtn()}
      </div>
    );
  };
}


PublicTeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    teachers: state.Teachers
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TeacherActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicTeacherListContainer);
