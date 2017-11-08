import * as React from "react";
import {Component} from "react";
import CourseList from "../../components/Courses/CourseList";
import {connect} from "react-redux";
import {fetchListTutorCourse} from "../../actions/ListTutorCourseActionCreator";
class ListTutorCourseContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchListTutorCourse({}))
    }

    render() {
        return (
            <CourseList {...this.props} />
        )
    }
}

ListTutorCourseContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
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