import * as React from "react";
import {Component} from "react";
import CourseList from "../../../components/Courses/CourseList";
import {connect} from "react-redux";
import {fetchListTutorCourse} from "../../../actions/ListTutorCourseActionCreator";
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import {deleteCourse} from "actions/CourseFormActionCreator";
import {FETCH_TUTOR_COURSES} from "actions/AsyncActionCreator";

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
            <div className="d-flex flex-vertical flex-auto">
                <div className="d-flex flex-auto">
                    <LoadingMask belongingActions={[FETCH_TUTOR_COURSES]}>
                        <CourseList 
                            deleteCourse={this.deleteCourse.bind(this)} 
                            {...this.props} 
                            displayMode="grid" 
                            itemPerRowInGridMode={2}
                            isPublic={false} 
                        />
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
    const {courses, isFetching} = TutorCourseList;
    return {
        courses, isFetching
    }

};

export default connect(
    mapStateToProps
)(ListTutorCourseContainer);