import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import moment from "moment";
import Dropzone from "react-dropzone";
import {TT} from "../../utils/locale";
import ObjectUtils from "../../utils/ObjectUtils";
import {Checkbox, FlatButton, RaisedButton, TimePicker} from "material-ui";
import {mStyles} from "utils/CustomStylesUtil";
import {ActionSearch} from "material-ui/svg-icons/index";
import {fullWhite} from "material-ui/styles/colors";
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';

export const renderField = ({input, label, placeholder, type = 'text', disabled = false, customClassName, meta: {touched, error, warning}}) => (
  <div className='full-width-input-wrapper'>
    <input {...input} placeholder={placeholder ? placeholder : ''} type={type} disabled={disabled}
           className={customClassName}/>
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
      <Select2 {...input} disabled={disabled} data={selectOptions} />
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

/**
 * A wrapper of Checkbox Material UI
 * @param input
 * @param label
 * @param iconStyle
 */
export const renderCheckbox = ({input, label, disabled = false, iconStyle}) =>
  <Checkbox
    label={label}
    disabled={disabled}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    style={mStyles.checkbox}
    iconStyle={iconStyle}
  />

/**
 * A wrapper of RaiseButton of material UI
 * @param props
 * @constructor
 */
export const RaiseButton = (props) =>
  <RaisedButton
    backgroundColor="#e27d7f"
    labelColor={fullWhite}
    label={props.label}
    disabled={props.disabled ? props.disabled : false}
    type="submit"
    style={mStyles.raiseBtn}
    icon={<ActionSearch color={fullWhite}/>}
  />

/**
 * A wrapper of FlatButton of material UI
 * @param props
 * @constructor
 */
export const EFlatButton = (props) =>
  <FlatButton
    label={props.label}
    type="button"
    secondary={props.secondary}
    onClick={props.onClick}
    disabled={props.disabled ? props.disabled : false}
    style={mStyles.flatBtn}
    icon={props.icon}
  />

export const CustomTimePicker = ({input: {onChange, value}, label, disabled = false, hintText, meta: {touched, error, warning}}) =>
  <div className="d-flex flex-vertical">
    <TimePicker
      textFieldStyle={mStyles.timePicker}
      hintText={hintText}
      cancelLabel={TT.t('cancel')}
      okLabel={TT.t('select')}
      disabled={disabled}
      onChange={(oldValue, newValue) => onChange(newValue)}
    />
    {((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>

export const renderPreviewFile = (file, doDeleteNewUploadFile, saveDocument) => {
  let previewClass = "pdf-image-preview";
  if (file.extension === "docx") {
    previewClass = "doc-image-preview";
  }
  return (
    <div className="d-flex flex-horizontal mt-10" key={file.uid}>
      <div className={previewClass}></div>
      <div className="file-name-wrapper">
        <span className="degree-filename ml-10" title={file.fileName}>{file.fileName}</span>
      </div>
      <a className="icon-delete ml-10" onClick={() => doDeleteNewUploadFile(file.uid)} title={file.fileName}></a>
      {
        saveDocument !== undefined ?
          <a className="icon-upload ml-10" onClick={() => saveDocument(file)} title={file.fileName}></a>
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
      if (self.handleUpload){
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
            <div className={internalPreview ? 'd-none' : 'd-flex flex-horizontal align-self-center padd-10'}>
              <a className="icon-upload"></a>
              <a className="ml-10">{TT.t('drag_and_drop')}</a>
            </div>
          </div>

          <img className={internalPreview && this.state.previewUrl != null ? '' : 'd-none'}
               src={this.state.previewUrl} height={zoneHeight} style={previewImageStyle}></img>
          {/*<input className='d-none' {...input} value={this.state.content}/>*/}
        </Dropzone>
      </div>
    )
  }
}

export const renderSingleFileInput = renderFileInput


class avatarInput extends Component {
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
      self.setState({previewUrl: files[0].preview, content: fileReader.result});
      if (self.handleUpload){
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

  _crop(){
    let self = this
    if (self.handleUpload){
      self.handleUpload({content: this.refs.cropper.getCroppedCanvas().toDataURL()})
    }
  }

  render() {
    let {input: {value, ...input}, label, meta: {touched, error}, zoneHeight, internalPreview, ...custom} = this.props
    let borderWidth = internalPreview && this.state.previewUrl != null ? '0' : '1px'
    let previewImageStyle = internalPreview ? {
      border: 'solid 1px rgb(102, 102, 102)',
      width: '100%',
      borderStyle: 'dashed'
    } : {}

    let zone = <Dropzone
      name={'_' + input.name}
      onDrop={this.onChange.bind(this)}
      multiple={false}
      className="d-flex flex-vertical"
      style={{
        width: '100%',
        height: '150px',
        borderWidth: borderWidth,
        borderStyle: 'dashed',
        borderColor: 'rgb(102, 102, 102)',
        borderRadius: '5px',
      }}
      accept="image/*">
      <div className="d-flex flex-auto justify-content-center align-items-center">
        <div className={'d-flex flex-horizontal align-self-center padd-10'}>
          <a className="icon-upload"></a>
          <a className="ml-10">{TT.t('drag_and_drop')}</a>
        </div>
      </div>
    </Dropzone>

    let cropper = <Cropper
      src={this.state.previewUrl || ''}
      ref='cropper'
      style={{height: '200px', width: '100%'}}
      aspectRatio={1 / 1}
      crop={this._crop.bind(this)}
      checkCrossOrigin={false}
      movable={true}
      zoomable={true}
      center={true}
      responsive={true}
      scalable={true}
      zoomable={true}
      responsive={true}
    />

    return (
      <div className="">
        {
          this.state.previewUrl ? cropper : zone
        }
      </div>
    )
  }
}

export const cropImageInput = avatarInput