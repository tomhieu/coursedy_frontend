import * as React from "react";
import {Component} from "react";
import FormField from "../../../components/Core/FormField";
import styles from "./TutorForm.module.scss";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import {TutorAccountActions} from '../../../actions/index'
import {validate} from '../../../validations/TutorFormValidation'

class TutorForm extends Component {
  constructor(props) {
    super(props);
    this.updateEducation.bind(this);
  }


  updateEducation(data) {
    this.props.dispatch(TutorAccountActions.updateTutorEducation(this.props.tutor.id, data));
  }

  render() {
    const {handleSubmit, listLevel, degrees, skills, certificates, uploadFiles, skillSet, certificateSet} = this.props;
    return (
      <div className='row'>
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account_tutor_edu_title")}</span>
          </div>
          <form onSubmit={handleSubmit(this.updateEducation.bind(this))}>
            <div>
              <FormField fieldId="titleId" fieldLabel={this.context.t("account.tutot.edu.ocupation")}
                         isMandatoryField={true} formControlName="title" typeField="custom_input"/>
            </div>
            <div>
              <FormField fieldId="descriptionId" fieldLabel={this.context.t("account.tutor.edu.description")}
                         isMandatoryField={true} formControlName="description" typeField="custom_textarea"/>
            </div>

            <div>
              <FormField fieldId="skillsId" fieldLabel={this.context.t("account_tutor_skill_title")}
                         options={skillSet} formControlName="categories" typeField="multi_select"/>
            </div>

            <div className='form-group'>
              <button type="submit" className="btn btn-primary mr-10">{this.context.t("save")}</button>
              <button type="button" className="btn btn-default btn-small margin-left-10 cancel-button"
                      onClick={this.props.cancel}>
                {this.context.t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

TutorForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {EducationData, addNewDocumentFile} = state;
  const {degrees, skillSet} = EducationData;
  const {uploadFiles} = addNewDocumentFile;
  const tutor = state.TutorAccountReducer.tutor
  const skills = tutor.categories.map((t) => {
    return t.id
  })

  return {
    degrees,
    uploadFiles,
    skillSet,
    tutor,
    initialValues: {...tutor, categories: skills }
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'tutorEducation',
  fields: ['title', 'description', 'categories'],
  enableReinitialize: true,
  onSubmit: TutorAccountActions.updateTutorEducation(),
  validate
})(cssModules(TutorForm, styles)));

