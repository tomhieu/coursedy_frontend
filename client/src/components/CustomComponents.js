import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import moment from 'moment';
import Dropzone, {Dropzone} from "react-dropzone";
import {isEmpty} from "lodash/lang";

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

export const renderSingleFileInput = ({ input: { value, ...input }, label, meta: { touched, error }, ...custom }) => {
  const onChange = (files) => {
    let fileReader = new FileReader
    fileReader.onload = () => {
      input.onChange(fileReader.result)
    }
    fileReader.readAsDataURL(files[0])
  }

  return (
    <Dropzone
      name={'_' + input.name}
      onDrop={onChange}
      multiple={false}
      accept="image/*">
      <input className='hidden' {...input}/>
    </Dropzone>
  )
}