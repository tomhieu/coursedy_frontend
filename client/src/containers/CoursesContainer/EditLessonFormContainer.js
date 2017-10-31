import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import * as React from "react";
import LessonDetailComponent from "../../components/Courses/LessonDetailComponent";
import {hideLessonDetailPopup, saveLessonDetail} from "actions/CourseFormActionCreator";
import cssModules from "react-css-modules";
import styles from "./EditLesson.module.scss";
import {connect} from "react-redux";

class EditLessonFormContainer extends Component {
    constructor(props) {
        super(props);
    }
    saveLesson(lesson) {
        this.props.dispatch(saveLessonDetail(lesson));
    }
    hidePopup() {
        this.props.dispatch(hideLessonDetailPopup())
    }
    render() {
        const{show} = this.props;
        return (
            <Modal show={show} onHide={this.hidePopup.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.context.t('lesson_popup_edit_title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LessonDetailComponent onSubmit={this.saveLesson.bind(this)} {...this.props}/>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="ml-15 mr-15 mt-15 btn-link-dark">{this.context.t("lesson_save_btn")}</button>
                    <Button onClick={this.hidePopup.bind(this)}>{this.context.t('close')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditLessonFormContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { show } = state;
    return {
        show
    }
};

export default connect(mapStateToProps)((cssModules(EditLessonFormContainer, styles)));