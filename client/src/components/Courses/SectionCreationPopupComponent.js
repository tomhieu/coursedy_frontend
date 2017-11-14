import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import * as React from "react";
import FormField from "../Core/FormField";
class SectionCreationPopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {show: this.props.show};
    }
    hidePopup() {
        this.setState({show: false});
    }
    render() {
        const{hidePopup, handleSubmit, submitting, pristine, valid} = this.props;
        return (
            <Modal show={this.state.show} onHide={this.hidePopup.bind(this)}>
                <form onSubmit={handleSubmit(this.props.onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.context.t('lesson_popup_edit_title')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <FormField formGroupId="sectionTitleId" formLabel={this.context.t("section_title")} placeholder={this.context.t("section_title")}
                                           isMandatoryField={true} formControlName="title" typeField="custom_input"></FormField>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <FormField formGroupId="sectionNameId" formLabel={this.context.t("section_name")} placeholder={this.context.t("section_name")}
                                           isMandatoryField={true} formControlName="name" typeField="custom_input"></FormField>
                            </div>
                        </div>
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

SectionCreationPopupComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
};

SectionCreationPopupComponent.propTypes = {
    show: React.PropTypes.bool.isRequired,
    hidePopup: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
}

export default SectionCreationPopupComponent;