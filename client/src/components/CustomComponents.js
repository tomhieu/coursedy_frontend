import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import moment from 'moment';
import Dropzone from 'react-dropzone'
import {TT} from '../utils/locale'

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
      <div >
        <Select2 {...input}
                 defaultValue={selectOptions[0].id}
                 data={selectOptions}
        />
      </div>
      {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}

class renderFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
      fileSize: null
    };
  }

  onChange(files){
    let { input: { value, ...input }, label, meta: { touched, error }, ...custom } = this.props
    let self = this
    let fileReader = new FileReader
    self.setState({
      fileName: files[0].name,
      previewUrl: files[0].preview
    })
    fileReader.onload = () => {
      input.onChange(fileReader.result)
    }
    fileReader.readAsDataURL(files[0])
  }

  render(){
    let { input: { value, ...input }, label, meta: { touched, error }, ...custom } = this.props
    let borderWidth = this.state.previewUrl ? '0' : '2px'
    let previewImageStyle = this.state.previewUrl ? {borderStyle: 'dashed', borderWidth: '2px', borderRadius: '5px', borderColor: 'rgb(102, 102, 102)'} : {}
    return (
      <div>
        <Dropzone
          name={'_' + input.name}
          onDrop={this.onChange.bind(this)}
          multiple={false}
          style={{
            width: '200px',
            height: '200px',
            borderWidth: borderWidth,
            borderStyle: 'dashed',
            borderRadius: '5px',
            borderColor: 'rgb(102, 102, 102)'
          }}
          accept="image/*">
          <p className={this.state.previewUrl ? 'hidden' : 'block'} style={{padding: '5px 10px'}} >{TT.t('drag_and_drop')}</p>
          <img src={this.state.previewUrl} height='200px' style={previewImageStyle}></img>
          <input className='hidden' {...input}/>
        </Dropzone>
        <p style={{marginTop: '5px'}}>
          {this.state.fileName}
        </p>
      </div>
    )
  }
}

export const renderSingleFileInput = renderFileInput