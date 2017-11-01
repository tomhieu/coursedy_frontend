import * as React from "react";
import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {hideLessonDetailPopup, saveLessonDetail} from "actions/CourseFormActionCreator";
import {LessonDetailComponent} from "./LessonDetailComponent";

class EditLessonFormComponent extends Component {
    render() {
        const{show, hidePopup, handleSubmit} = this.props;
        return (
            <Modal show={show} onHide={hidePopup}>
                <form onSubmit={handleSubmit(this.props.onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.context.t('lesson_popup_edit_title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LessonDetailComponent {...this.props}/>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="ml-15 mr-15 mt-15 btn-link-dark">{this.context.t("lesson_save_btn")}</button>
                    <Button onClick={hidePopup}>{this.context.t('close')}</Button>
                </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

EditLessonFormComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}
export default EditLessonFormComponent;