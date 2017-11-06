import * as React from "react";
import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {LessonDetailComponent} from "../../components/Courses/LessonDetailComponent";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addDocumentForLesson, deleteDocumentForLesson} from "../../actions/CourseFormActionCreator";

class EditLessonFormContainer extends Component {
    constructor(props) {
        super(props);
    }

    addDocumentForLesson(document) {
        this.props.dispatch(addDocumentForLesson(this.props.lessonPosId, document));
    }

    onDeleteDocumentLesson(documentId) {
        this.props.dispatch(deleteDocumentForLesson(this.props.lessonPosId, documentId));
    }

    render() {
        const{show, hidePopup, handleSubmit} = this.props;
        return (
            <Modal show={show} onHide={hidePopup}>
                <form onSubmit={handleSubmit(this.props.onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.context.t('lesson_popup_edit_title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LessonDetailComponent addDocumentForLesson={this.addDocumentForLesson.bind(this)} onDeleteDocumentLesson={this.onDeleteDocumentLesson.bind(this)} {...this.props}/>
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

EditLessonFormContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
};

export default connect(state => ({
    initialValues: state.CourseFormComponent.lessonCreationForm != undefined ? state.CourseFormComponent.lessonCreationForm.activeLesson : {}
}))(reduxForm({
    form: 'lessonDetailForm',
    fields: ['lessonName', 'lessonPeriod', 'lessonDocument', 'lessonDesciption'],
    enableReinitialize: true
})(EditLessonFormContainer));