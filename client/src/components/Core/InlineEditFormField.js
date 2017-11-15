import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {FormGroup} from "react-bootstrap";
import FormField from "./FormField";

class InlineEditFormField extends FormField {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }
    }

    showEditForm() {
        this.setState({
            editMode: true
        })
    }

    closeEditForm() {
        this.setState({
            editMode: false
        })
    }

    render() {
        const {submitting, pristine, showLabel = true} = this.props;
        {
            if (this.state.editMode) {
                return (
                    <div className={this.props.displayStyle + " d-flex flex-vertical"}>
                        {super.render()}
                        <FormGroup className="ml-15 mr-15 mt-10 d-flex justify-content-right">
                            <button type="submit" className="btn btn-primary mr-10" disabled={pristine || submitting}>
                                {this.context.t("save")}
                            </button>
                            <button type='button' onClick={this.closeEditForm.bind(this)}
                                    className="btn btn-default btn-small margin-left-10 cancel-button">
                                {this.context.t("cancel")}
                            </button>
                        </FormGroup>
                    </div>
                )
            } else {
                return (
                    <div className={this.props.displayStyle + ' inline-field d-flex flex-horizontal'}>
                        {showLabel ? (<label className="control-label">{this.props.formLabel}: </label>) : ''}
                        <span className='pre-wrap'>{this.props.content}</span>
                        <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
                    </div>
                )
            }
        }
    }
}

InlineEditFormField.contextTypes = {
    t: React.PropTypes.func.isRequired
}

InlineEditFormField.propTypes = {
    displayStyle: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps
)(InlineEditFormField)