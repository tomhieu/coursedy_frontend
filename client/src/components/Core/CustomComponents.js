import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import moment from "moment";
import Dropzone from "react-dropzone";
import {TT} from "../../utils/locale";
import ObjectUtils from "../../utils/ObjectUtils";
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';
import FormField from "components/Core/FormField";

export const renderField = ({input, label, placeholder, type = 'text', disabled = false, customClassName, meta: {touched, error, warning}}) => (
  <div className='full-width-input-wrapper'>
    <input {...input} placeholder={placeholder ? placeholder : ''} type={type} disabled={disabled}
           className={customClassName}/>
    {
      type === 'checkbox' ? <span className="custom-control-description">{label}</span> : null
    }
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

export const renderCheckBoxField = ({input, label, placeholder, type = 'text', disabled = false, customClassName, meta: {touched, error, warning}}) => (
  <div className='full-width-input-wrapper'>
    <label className="custom-control custom-checkbox">
      <input {...input} placeholder={placeholder ? placeholder : ''} type='checkbox' disabled={disabled}
             className={customClassName + ' custom-control-input'}/>
      <span className="custom-control-indicator"></span>
      <span className="custom-control-description">{label}</span>
    </label>
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

export const renderTextAreaField = ({input, label, placeholder, type, disabled = false, meta: {touched, error, warning}}) => (
  <div className='full-width-input-wrapper'>
    <textarea {...input} placeholder={placeholder ? placeholder : ''} type={type} disabled={disabled}
              className='form-control' rows={6}/>
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

export const renderDatePicker = ({input, label, type, disabled = false, meta: {touched, error, warning}}) => {
  return (<div>
    <DatePicker {...input} disabled={disabled}
                selected={input.value ? moment(input.value, 'DD/MM/YYYY') : null}
                placeholderText='dd/mm/yyyy'
                className="form-control"
                dateFormat="DD/MM/YYYY"
                calendarClassName="wide-calendar"
    />
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>)
}

export const renderSelect = (selectOptions) => {
  return ({input, label, type, disabled = false, meta: {touched, error, warning}}) => (
    <div>
      <Select2 {...input} disabled={disabled} data={selectOptions}/>
      {touched && ((error && <span className='input-errors'>{error}</span>) || (warning &&
        <span>{warning}</span>))}
    </div>
  )
}

export const renderMultiSelect = (selectOptions) => {
  return ({input, label, type, disabled = false, meta: {touched, error, warning}}) => (
    <div className="select-picker">
      <Select2 {...input} multiple disabled={disabled}
               data={selectOptions}
      />
      {touched && ((error && <span className='input-errors'>{error}</span>) || (warning &&
        <span>{warning}</span>))}
    </div>
  )
}

export const renderPreviewFile = (file, doDeleteNewUploadFile, saveDocument) => {
  let previewClass = "pdf-image-preview";
  if (file.extension === "docx") {
    previewClass = "doc-image-preview";
  }
  return (
    <div className="d-flex flex-horizontal mt-10 mb-10" key={"document_" + file.id}>
      <div className={previewClass}></div>
      <div className="file-name-wrapper">
        <span className="degree-filename ml-10" title={file.fileName}>{file.fileName}</span>
      </div>
      <a className="icon-delete ml-10" onClick={() => doDeleteNewUploadFile(file.uid)} title={file.fileName}>
        <svg viewBox="0 0 24 24" className="material-icon secondary" height="24" width="24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
        </svg>
      </a>
      {
        saveDocument !== undefined ?
          <a className="icon-upload ml-10" onClick={() => saveDocument(file)} title={file.fileName}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </a>
          : null
      }
    </div>
  )
}

class renderFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewUrl: this.props.previewUrl
    };
    this.handleUpload = this.props.onUpload;
  }


  onChange(files) {
    let self = this
    let fileReader = new FileReader
    fileReader.onload = () => {
      self.setState({previewUrl: files[0].preview, content: fileReader.result});
      if (self.handleUpload) {
        self.handleUpload({
          uid: ObjectUtils.generateUUID(),
          fileName: files[0].name,
          previewUrl: files[0].preview,
          content: fileReader.result
        });
      }
    }
    fileReader.readAsDataURL(files[0])
  }

  render() {
    let {input: {value, ...input}, label, meta: {touched, error}, zoneHeight, internalPreview, ...custom} = this.props
    let borderWidth = internalPreview && this.state.previewUrl != null ? '0' : '1px'
    let previewImageStyle = internalPreview ? {
      border: 'solid 1px rgb(102, 102, 102)',
      width: '100%',
      borderStyle: 'dashed'
    } : {}
    return (
      <div className="d-flex">
        <Dropzone
          name={'_' + input.name}
          onDrop={this.onChange.bind(this)}
          multiple={false}
          className="d-flex flex-vertical"
          style={{
            width: '100%',
            height: zoneHeight,
            borderWidth: borderWidth,
            borderStyle: 'dashed',
            borderColor: 'rgb(102, 102, 102)',
            borderRadius: '5px',
          }}
          accept="image/*">
          <div className="d-flex flex-auto justify-content-center align-items-center">
            <div className={this.state.previewUrl ? 'd-none' : 'd-flex flex-horizontal align-self-center padd-10'}>
              <a className="icon-upload">
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                </svg>
              </a>
              <a className="ml-10">{TT.t('drag_and_drop')}</a>
            </div>
          </div>

          <img className={internalPreview && this.state.previewUrl != null ? '' : 'd-none'}
               src={this.state.previewUrl} height={zoneHeight} style={previewImageStyle}></img>
        </Dropzone>
      </div>
    )
  }
}

export const renderSingleFileInput = renderFileInput


class avatarInput extends renderFileInput {
  constructor(props) {
    super(props);
    this.state = {
      previewUrl: null
    };
    this.handleUpload = this.props.onUpload;
  }


  onChange(files) {
    let self = this
    let fileReader = new FileReader
    fileReader.onload = () => {
      self.setState({previewUrl: files[0].preview});
    }
    fileReader.readAsDataURL(files[0])
  }

  _crop() {
    if (this.handleUpload) {
      this.handleUpload({content: this.refs.cropper.getCroppedCanvas().toDataURL()})
    }
  }

  resetFormField() {
    this.setState({previewUrl: null})
    this.props.onFileRemoved()
  }

  render() {
    let {zoneHeight} = this.props

    let cropper = <Cropper
      src={this.state.previewUrl || ''}
      ref='cropper'
      style={{height: zoneHeight || '300px', width: '100%'}}
      aspectRatio={1 / 1}
      crop={this._crop.bind(this)}
      checkCrossOrigin={false}
      movable={true}
      zoomable={true}
      center={true}
      responsive={true}
      scalable={true}
    />

    return (
      <div>
        {
          this.state.previewUrl ? cropper : super.render()
        }
        {
          this.state.previewUrl ?
            (<a style={{top: `${parseInt(zoneHeight)/2}px`}} className='btn btn-primary remove-upload-file' onClick={this.resetFormField.bind(this)}>
              <i className='fa fa-trash'></i>
            </a>) :
            (<span></span>)
        }

      </div>
    )
  }
}

export const cropImageInput = avatarInput