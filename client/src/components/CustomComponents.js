import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import moment from 'moment';
import {Dropzone} from "react-dropzone";
import {isEmpty} from "lodash/lang";

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className='full-width-input-wrapper'>
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
    <input {...input} placeholder={label} type={type}/>
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


export const renderDropzoneInput = (field) => {
    const files = field.input.value;
    debugger
    return (
        <div>
            <Dropzone name={field.name} onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    { files.map((file, i) => <li key={i}>{file.name}</li>) }
                </ul>
            )}
        </div>
    );
}