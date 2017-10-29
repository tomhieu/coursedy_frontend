import React, {Component} from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import {reduxForm} from 'redux-form';
import {TT} from '../../utils/locale';
import {renderDatePicker, renderSelect, renderField, renderTextAreaField, renderSingleFileInput} from "../CustomComponents";
import {PERIOD_TYPES, CURRENCIES} from '../../constants/Courses'

class CourseForm extends Component {
  hideError(e) {
    e.preventDefault();
  }

  handleChange() {

  }

  onDrop(acceptedFiles){
    console.log(acceptedFiles)
  }

  render() {
    const {handleSubmit, submitting, pristine} = this.props;
    const errors = null;
    return (
      <div className="dashboard-panel">
        <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
          <div className={errors ? '' : 'hidden'}>
            <span className="error">
              <div className="alert alert-danger">
                <a href="#" className="close" onClick={this.hideError.bind(this)}>×</a>
                <strong>{this.context.t("error")} ! </strong>
                <p className="error">{errors && errors[0]}</p>
              </div>
            </span>
          </div>
          <FormGroup className='row'>
            <div className='col-sm-2'>
              <ControlLabel> {this.context.t("course_title")} <font color="red">*</font> </ControlLabel>
            </div>
            <div className='col-sm-10'>
              <Field
                name="title"
                component={renderField}
                type="text"
                placeholder={this.context.t("sample_course_title")}
                className="form-control"
              />
            </div>
          </FormGroup>
          <div className='row'>
            <div className='col-sm-6'>
              <FormGroup className='row'>
                <div className='col-sm-4'>
                  <ControlLabel> {this.context.t("start_date")} </ControlLabel>
                </div>
                <div className='col-sm-8'>
                  <Field
                    name="start_date"
                    type="text"
                    className="form-control"
                    component={renderDatePicker}
                  />
                </div>
              </FormGroup>
            </div>
            <div className='col-sm-6'>
              <FormGroup className='row'>
                <div className='col-sm-4'>
                  <ControlLabel> {this.context.t("end_date")} </ControlLabel>
                </div>
                <div className='col-sm-8'>
                  <Field
                    name="end_date"
                    component={renderDatePicker}
                    type="text"
                    className="form-control"
                  />
                </div>
              </FormGroup>
            </div>
          </div>

          <div className='row form-group'>
            <div className='col-sm-2'>
              <ControlLabel> {this.context.t("period")} </ControlLabel>
            </div>
            <div className='col-sm-3'>
              <Field
                name="period"
                type="text"
                className="form-control"
                component={renderField}
              />
            </div>
            <div className='col-sm-2'>
              <Field
                name="period_type"
                component={renderSelect(PERIOD_TYPES.map((type) => ({text: TT.t(type), id: type})))}
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <FormGroup className='row'>
            <div className='col-sm-2'>
              <ControlLabel> {this.context.t("number_of_students")} </ControlLabel>
            </div>
            <div className='col-sm-3'>
              <Field
                name="number_of_students"
                type="text"
                className="form-control"
                component={renderField}
              />
            </div>
          </FormGroup>

          <FormGroup className='row'>
            <div className='col-sm-2'>
              <ControlLabel> {this.context.t("tuition_fee")} </ControlLabel>
            </div>
            <div className='col-sm-4'>
              <Field
                name="tuition_fee"
                type="text"
                className="form-control"
                component={renderField}
              />
            </div>
            <div className='col-sm-2'>
              <Field
                name="currency"
                component={renderSelect(CURRENCIES.map((type) => ({text: type, id: type})))}
                type="text"
                className="form-control"
              />
            </div>
          </FormGroup>

          <FormGroup className='row'>
            <div className='col-sm-2'>
              <ControlLabel>{this.context.t("cover_image")}</ControlLabel>
            </div>
            <div className='col-sm-5'>
              <Field name="cover_image" component={renderSingleFileInput} style={{paddingTop: '8px'}} onDrop={this.onDrop.bind(this)}/>
            </div>
          </FormGroup>

          <hr/>

          <FormGroup className='row'>
            <div className='col-sm-12'>
              <ControlLabel> {this.context.t("course_description")} </ControlLabel>
              <Field
                rows={10}
                name="description"
                component={renderTextAreaField}
                type="text"
                className="form-control"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <button type="submit"
                    className="btn btn-primary btn-link-dark signin-btn"
                    disabled={pristine || submitting}
            >
              {this.context.t("save_course")}
            </button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

CourseForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseForm.propTypes = {}

export default CourseForm;
