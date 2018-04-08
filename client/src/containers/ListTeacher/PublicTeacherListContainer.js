import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as TeacherActions from '../../actions/TeacherCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserAvatar from '../../components/Account/UserAvatar';
import TeacherItem from './TeacherItem';
import { searchTeachers } from '../../actions/TeacherCreators';


class PublicTeacherListContainer extends Component {
  componentDidMount() {
    this.props.searchTeachers();
  }

  render() {
    return (
        <div className="row">
          {
            this.props.teachers.data.map((item) => {
              if (!item.user) {
                return null;
              }
              return <TeacherItem data={item} key={item.id}/>
            })
          }
        </div>
    );
  };
}


PublicTeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { teachers: state.Teachers };
};

export default connect(mapStateToProps, { searchTeachers })(PublicTeacherListContainer);
