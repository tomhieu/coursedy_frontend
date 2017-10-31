import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import moment from "moment";
import {isEmpty} from "lodash/lang";
import Dropzone from "react-dropzone";
import {TT} from "../utils/locale";
import * as ObjectUtil from "../utils/ObjectUtils";

export const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div className='full-width-input-wrapper'>
    <input {...input} placeholder={label} type={type} className='form-control'/>
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

export const renderTextAreaField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div className='full-width-input-wrapper'>
    <textarea {...input} placeholder={label} type={type} className='form-control' rows={6}/>
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)


export const renderDatePicker = ({input, label, type, meta: {touched, error, warning}}) => {
  return (<div>
    <DatePicker {...input}
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
  return ({input, label, type, meta: {touched, error, warning}}) => (
    <div className="dark-picker dark-picker-bright">
      <Select2 {...input}
               defaultValue={!isEmpty(selectOptions) && selectOptions.length > 0 ? selectOptions[0].id : 0}
               data={selectOptions}
      />
      {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}

export const renderMultiSelect = (selectOptions, selectedValues) => {
    const defaultValues = Array.isArray(selectedValues) ? selectedValues.map(val => val.id) : []
    return ({input, label, type, meta: {touched, error, warning}}) => (
        <div className="select-picker">
            <Select2 {...input} multiple
                     defaultValue={defaultValues}
                     data={selectOptions}
            />
            {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    )
}

class renderFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
          previewUrl: null
    };
    this.handleUpload = this.props.onUpload;
  }



  onChange(files) {
    let fileReader = new FileReader
    fileReader.onload = () => {
       this.setState({previewUrl: files[0].preview});
       this.handleUpload({
         uid: ObjectUtil.generateUUID(),
         fileName: files[0].name,
         previewUrl: files[0].preview,
         content: fileReader.result
      });
    }
    fileReader.readAsDataURL(files[0])
  }

  render() {
    let { input: { value, ...input }, label, meta: { touched, error }, zoneHeight, internalPreview, ...custom } = this.props
    let borderWidth = internalPreview && this.state.previewUrl != null ? '0' : '2px'
    let previewImageStyle = internalPreview ? {borderStyle: 'dashed', borderRadius: '5px', borderColor: 'rgb(102, 102, 102)'} : {}
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
              borderRadius: '5px',
              borderColor: 'rgb(102, 102, 102)'
          }}
          accept="image/*">
            <div className="d-flex flex-auto justify-content-center">
                <div className={internalPreview ? 'hidden' : 'd-flex flex-horizontal align-self-center'}>
                    <a className="icon-upload"></a>
                    <p className="ml-10">{TT.t('drag_and_drop')}</p>
                </div>
            </div>

            <img className={internalPreview && this.state.previewUrl != null ? '' : 'hidden'} src={this.state.previewUrl} height="200px" style={previewImageStyle}></img>
            <input className='hidden' {...input}/>
        </Dropzone>
      </div>
    )
  }
}

export const renderSingleFileInput = renderFileInput