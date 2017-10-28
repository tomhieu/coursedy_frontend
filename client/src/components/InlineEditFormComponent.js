import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import Dropzone from 'react-dropzone'
import {Field} from 'redux-form';
import { connect } from 'react-redux';
import {FormGroup} from 'react-bootstrap';
import {TT} from '../utils/locale';

class InlineEditFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      form: {},
      errors: null
    }
  }

  onSubmit(event){
    event.preventDefault()
    if (!this.state.form[this.props.name] || this.state.form[this.props.name].trim() == this.props.content) {
      return false
    }

    let onSuccess = this.closeEditForm.bind(this)
    let onError = this.showError.bind(this)
    this.props.onSubmit(this.state.form, onSuccess, onError)
  }

  showEditForm(){
    let form = {}
    form[this.props.name] = this.props.content

    this.setState({
      editMode: true,
      form
    })
  }

  closeEditForm(){
    let form = {}
    form[this.props.name] = this.props.content

    this.setState({
      editMode: false,
      form
    })
  }

  onChange(event){
    let form = {}
    form[this.props.name] = event.target.value

    this.setState({
      form
    })
  }

  hideError(){
    this.setState({
      errors: null
    })
  }

  showError(errors){
    this.setState({
      errors: errors
    })
  }

  render(){
    let {submitting, pristine} = this.props;
    let errors = this.state.errors

    let inputComponent = <input
      onChange={this.onChange.bind(this)}
      value={this.state.form[this.props.name]}
      name={this.props.name}
      type="text"
      className="form-control"
    />

    if(this.props.editComponent == 'textarea') {
      inputComponent = <textarea
        onChange={this.onChange.bind(this)}
        value={this.state.form[this.props.name]}
        name={this.props.name}
        className="form-control"
        rows={6}
      />
    }

    let form  = <form onSubmit={this.onSubmit.bind(this)} className={`inline-form ${this.state.editMode ? '' : 'hidden'}`}>
      <div className={errors ? '' : 'hidden'}>
        <span className="error">
          <div className="alert alert-danger">
            <a href="#" className="close" onClick={this.hideError.bind(this)}>×</a>
            <p className="error">{errors && errors[0]}</p>
          </div>
        </span>
      </div>

      <FormGroup className='row'>
        <div className='col-sm-12'>
          {inputComponent}
        </div>
      </FormGroup>

      <FormGroup>
        <button type="submit"
                className="btn btn-primary"
                disabled={pristine || submitting}
        >
          {this.context.t("save")}
        </button>
        <button type='button'
                onClick={this.closeEditForm.bind(this)}
                className="btn btn-primary margin-left-10 cancel-button"
        >
          {this.context.t("cancel")}
        </button>
      </FormGroup>
    </form>

    let display = <p className={`${this.props.displayStyle} ${this.state.editMode ? 'hidden' : ''}`}>
      <span>{this.props.content}</span>
      <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
    </p>

    if (this.props.dispplayComponent == 'h1') {
      display = <div>
        <h1 className={`${this.props.displayStyle} ${this.state.editMode ? 'hidden' : ''}`} style={{display: 'inline-block'}}>
          <span>{this.props.content}</span>
        </h1>
        <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
      </div>
    } else if (this.props.dispplayComponent == 'h2') {
      display = <div>
        <h2 className={`${this.props.displayStyle} ${this.state.editMode ? 'hidden' : ''}`} style={{display: 'inline-block'}}>
          <span>{this.props.content}</span>
        </h2>
        <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
      </div>
    } else if (this.props.dispplayComponent == 'h3') {
      display = <div>
        <h3 className={`${this.props.displayStyle} ${this.state.editMode ? 'hidden' : ''}`} style={{display: 'inline-block'}}>
          <span>{this.props.content}</span>
        </h3>
        <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
      </div>
    } else if (this.props.dispplayComponent == 'h4') {
      display = <div>
        <h4 className={`${this.props.displayStyle} ${this.state.editMode ? 'hidden' : ''}`} style={{display: 'inline-block'}}>
          <span>{this.props.content}</span>
        </h4>
        <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
      </div>
    }  else if (this.props.dispplayComponent == 'b') {
      display = <b className={`${this.props.displayStyle} ${this.state.editMode ? 'hidden' : ''}`}>
        <span>{this.props.content}</span>
        <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
      </b>
    } else if (this.props.dispplayComponent == 'span') {
      display = <span className={`${this.props.displayStyle} ${this.state.editMode ? 'hidden' : ''}`}>
        <span>{this.props.content}</span>
        <span className='inline-edit' onClick={this.showEditForm.bind(this)}><i className="fa fa-pencil"></i></span>
      </span>
    }

    {
      if(this.state.editMode) {
        return form
      } else {
        return display
      }
    }
  }
}

InlineEditFormComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
}

InlineEditFormComponent.propTypes = {
  displayStyle: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps
)(InlineEditFormComponent)