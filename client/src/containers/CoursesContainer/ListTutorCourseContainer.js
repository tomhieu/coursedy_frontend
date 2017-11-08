import * as React from "react";
import {Component} from "react";
import CourseList from "../../components/Courses/CourseList";
import {connect} from "react-redux";
import {fetchListTutorCourse} from "../../actions/ListTutorCourseActionCreator";
class ListTutorCourseContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchListTutorCourse({}))
    }

    addNewCourses() {
        this.props.router.history.push("/dashboard/courses/new");
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2 col-sm-2">
                    <button onClick={this.addNewCourses.bind(this)}></button>
                </div>
                <CourseList {...this.props} />
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