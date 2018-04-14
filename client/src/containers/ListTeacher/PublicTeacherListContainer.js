import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeacherItem from './TeacherItem';
import { searchTeachers } from '../../actions/TeacherCreators';
import Pagination from 'react-js-pagination';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import { FETCH_TEACHERS } from '../../constants/Teachers';
import EmptyResultWarning from '../../components/Core/EmptyResultWarning';


class PublicTeacherListContainer extends Component {
  componentDidMount() {
    this.props.searchTeachers();
  }

  handlePageChange(pageNumber) {
    this.props.searchTeachers({page: pageNumber, per_page: this.props.headers.perPage});
  }

  render() {
    return (
      <LoadingMask belongingActions={[FETCH_TEACHERS]}>
        <div className="teacher-list">
          { !this.props.teachers.isFetching  && this.props.teachers.data.length ?
            <SearchingNotification numMatchs={this.props.teachers.data.length} /> : null
          }

          { this.props.teachers.isFetching ? null :
            this.props.teachers.data.length ?
              <TeacherList data={this.props.teachers.data}/>:
            <EmptyResultWarning styles={"teacher-list_not-found"} searchType="search_teacher"/>
          }

          {
            !this.props.teachers.isFetching && this.props.teachers.data.length ?
              <div className="row">
                <div className="col-sm-12">
                  <Pagination
                    activePage={this.props.headers.currentPage}
                    itemsCountPerPage={this.props.headers.perPage}
                    totalItemsCount={this.props.headers.total}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                  />
                </div>
              </div>
              :null
          }
        </div>
      </LoadingMask>
    );
  };
}

const SearchingNotification = (props) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        We found {props.numMatchs} teachers.
      </div>
    </div>
  )
}

const TeacherList = ({data}) => {
  return (
    <div className="row">
      {
       data.map((item) => {
          if (!item.user) {
            return null;
          }
          return <TeacherItem data={item} key={item.id}/>
        })
      }
    </div>
  )
}


PublicTeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const headers = state.Teachers.headers

  return {
    teachers: state.Teachers,
    headers: {
      currentPage: headers && parseInt(headers.xPage) || 0,
      perPage: headers && parseInt(headers.xPerPage) || 0,
      total: headers && parseInt(headers.xTotal) || 0
    }
  };
};

export default connect(mapStateToProps, { searchTeachers })(PublicTeacherListContainer);
