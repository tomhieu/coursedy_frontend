import * as React from "react";
import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {LessonDetailComponent} from "../../../components/Courses/LessonDetailComponent";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addDocumentForLesson, deleteDocumentForLesson} from "../../../actions/CourseFormActionCreator";
import {validate} from '../../../validations/LessonFormValidator';

class EditLessonFormContainer extends Component {
    constructor(props) {
        super(props);
        this.documents = [];
    }

    addDocumentForLesson(document) {
        this.documents.push(document);
    }

    onDeleteDocumentLesson(documentId) {
        this.documents.splice(this.documents.findIndex(doc => doc.uid === documentId), 1);
    }

    onSubmitLesson(lesson) {
        this.props.onSaveLesson(Object.assign({}, lesson, {documents: this.documents}));
    }

    render() {
        const{handleSubmit, show, hidePopup, submitting, pristine, valid} = this.props;
        return (
            <Modal show={show} onHide={hidePopup}>
                <form onSubmit={handleSubmit(this.onSubmitLesson.bind(this))}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.context.t('lesson_popup_edit_title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LessonDetailComponent addDocumentForLesson={this.addDocumentForLesson.bind(this)} onDeleteDocumentLesson={this.onDeleteDocumentLesson.bind(this)} {...this.props}/>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" disabled={pristine || submitting || !valid} className="btn ml-15 mr-15 mt-0 btn-primary btn-link-dark">{this.context.t("lesson_save_btn")}</button>
                    <Button onClick={hidePopup} className="btn btn-default">{this.context.t('close')}</Button>
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
    validate,
    enableReinitialize: true
})(EditLessonFormContainer));