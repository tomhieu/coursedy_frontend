import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import moment from 'moment';

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className='full-width-input-wrapper'>
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
    <input {...input} placeholder={label} type={type}/>
  </div>
)

export const renderDatePicker = ({input, label, type, meta: {touched, error, warning}}) => {
  return (<div>
    <DatePicker {...input}
                selected={input.value ? moment(input.value, 'MM/DD/YYYY') : null}
                placeholderText='dd/mm/yyyy'
                className="form-control"
                dateFormat="MM/DD/YYYY"
                calendarClassName="wide-calendar"
    />
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>)
}

export const renderSelect = (selectOptions) => {
  return ({input, label, type, meta: {touched, error, warning}}) => (
    <div className="dark-picker dark-picker-bright">
      <Select2 {...input}
               defaultValue={selectOptions[0].id}
               data={selectOptions}
      />
      {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}