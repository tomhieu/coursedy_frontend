import * as React from "react";
import {Component} from "react";
import CourseList from "../../components/Courses/CourseList";
import {connect} from "react-redux";
import {fetchListTutorCourse} from "../../actions/ListTutorCourseActionCreator";
import LoadingMask from "../../components/LoadingMask/LoadingMask";
import {deleteCourse} from "actions/CourseFormActionCreator";
class ListTutorCourseContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchListTutorCourse())
    }

    addNewCourses() {
        this.context.router.history.push("/dashboard/courses/new");
    }

    deleteCourse(course_id) {
        this.props.dispatch(deleteCourse(course_id));
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2 col-sm-2 mb-20 ml-15">
                    <button className="btn btn-primary" onClick={this.addNewCourses.bind(this)}>{this.context.t('course_add_btn')}</button>
                </div>
                <div className="col-md-12 col-sm-12">
                    <LoadingMask>
                        <CourseList deleteCourse={this.deleteCourse.bind(this)} {...this.props} />
                    </LoadingMask>
                </div>
            </div>
        )
    }
}

ListTutorCourseContainer.contextTypes = {
    t: React.PropTypes.func.isRequired,
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    const {TutorCourseList} = state;
    const {courses} = TutorCourseList;
    return {
        courses
    }

};

export default connect(
    mapStateToProps
)(ListTutorCourseContainer);