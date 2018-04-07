import {Component} from "react";
import * as React from "react";
import {ControlLabel, FormGroup} from "react-bootstrap";
import {Field} from "redux-form";
import {renderSingleFileInput} from "../../Core/CustomComponents";
import FormField from "../../Core/FormField";

export class TutorEducationForm extends Component {
    onDrop(acceptedFiles){
        console.log(acceptedFiles)
    }
    render() {
        const {onSubmit, listLevel, degrees} =  this.props;
        return (
            <form onSubmit={e => onSubmit(e.target.value)}>
                <div className="col-md-12 col-sm-12">
                    <FormField fieldId="levelId" fieldLabel={this.context.t("account.tutot.edu.level.title")} options={listLevel} isMandatoryField={true} formControlName="level" typeField="custom_select" />
                </div>
                <div className="col-md-12 col-sm-12">
                    <FormGroup className='row'>
                        <div className='col-sm-2'>
                            <ControlLabel>{this.context.t("cover_image")}</ControlLabel>
                        </div>
                        <div className='col-sm-5'>
                            <Field name="cover_image" component={renderSingleFileInput} style={{paddingTop: '8px'}} onDrop={this.onDrop.bind(this)}/>
                        </div>
                    </FormGroup>
                </div>
            </form>
        )
    }
}

TutorEducationForm.contextTypes = {
    t: React.PropTypes.func.isRequired
}

TutorEducationForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}