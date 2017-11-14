import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import Dropzone from 'react-dropzone'
import {Field} from 'redux-form';
import {connect} from 'react-redux';
import {FormGroup} from 'react-bootstrap';
import {TT} from '../utils/locale';
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
        const {submitting, pristine} = this.props;
        {
            if (this.state.editMode) {
                return (
                    <div className="d-flex flex-vertical">
                        {super.render()}
                        <FormGroup>
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
                    <div className={this.props.displayStyle}>
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
    content: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps
)(InlineEditFormField)