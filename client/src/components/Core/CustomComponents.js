import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Field } from 'redux-form';
import ReactQuill, { Quill } from 'react-quill';
import ObjectUtils from '../../utils/ObjectUtils';
import { TT } from '../../utils/locale';

export const renderField = ({
  input, label, placeholder, type = 'text', disabled = false, customClassName, meta: { touched, error, warning }
}) => (
  <div className="full-width-input-wrapper">
    {
        touched && error ? (
          <input
            {...input}
            placeholder={placeholder || ''}
            type={type}
            disabled={disabled}
            className={`${customClassName} error`}
          />
        ) : (
          <input
            {...input}
            placeholder={placeholder || ''}
            type={type}
            disabled={disabled}
            className={customClassName}
          />
        )}
    {touched && ((error && <span className="input-errors">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export const renderCurrencyField = ({
  input, label, placeholder, type = 'text', disabled = false, customClassName, meta: { touched, error, warning }
}) => (
  <div className="full-width-input-wrapper">
    {
      touched && error ? (
        <div className="d-flex flex-horizontal currency-field-wrapper error">
          <input
            {...input}
            placeholder={placeholder || ''}
            type={type}
            disabled={disabled}
            className={customClassName}
          />
          <label className="currency-text">VND</label>
        </div>
      ) : (
        <div className="d-flex flex-horizontal currency-field-wrapper">
          <input
            {...input}
            placeholder={placeholder || ''}
            type={type}
            disabled={disabled}
            className={customClassName}
          />
          <label className="currency-text">VND</label>
        </div>
      )
    }
    {touched && ((error && <span className="input-errors">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export const renderRadioFields = ({ options, input, meta: { touched, error, warning } }) => {
  if (input && options) {
    const renderRadioButtons = (key, index) => {
      return (
        <label className="col-md mr-10" key={`${index}`} htmlFor={`${input.name}-${index}`}>
          <Field
            id={`${input.name}-${index}`}
            component="input"
            name={input.name}
            type="radio"
            value={key}
          />
          <span className="pl-10">{options[key]}</span>
        </label>
      );
    };
    return (
      <div className="d-flex flex-vertical">
        <div className="row">
          {options && Object.keys(options).map(renderRadioButtons)}
        </div>
        {touched && ((error && <div className="input-errors">{error}</div>) || (warning && <div>{warning}</div>))}
      </div>
    );
  }
};

export const renderCheckBoxField = ({
  input, label, placeholder, type = 'text', disabled = false, customClassName, meta: { touched, error, warning }
}) => (
  <div className="full-width-input-wrapper">
    <label className="custom-control custom-checkbox">
      <input
        {...input}
        placeholder={placeholder || ''}
        type="checkbox"
        disabled={disabled}
        className={`${customClassName} custom-control-input`}
      />
      <span className="custom-control-indicator" />
      <span className="custom-control-description">{label}</span>
    </label>
    {touched && ((error && <span className="input-errors">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export const renderTextAreaField = ({
  input, label, placeholder, type, disabled = false, meta: { touched, error, warning }
}) => (
  <div className="full-width-input-wrapper">
    {
      touched && error ? (
        <textarea
          {...input}
          placeholder={placeholder || ''}
          type={type}
          disabled={disabled}
          className="form-control error"
          rows={6}
        />
      ) : (
        <textarea
          {...input}
          placeholder={placeholder || ''}
          type={type}
          disabled={disabled}
          className="form-control"
          rows={6}
        />
      )}
    {touched && ((error && <span className="input-errors">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export const renderDatePicker = ({
  input, label, type, disabled = false, meta: { touched, error, warning }
}) => {
  return (
    <div>
      <DatePicker
        name={input.name}
        onChange={input.onChange}
        disabled={disabled}
        selected={input.value ? moment(input.value, 'DD/MM/YYYY') : null}
        placeholderText="dd/mm/yyyy"
        className="form-control"
        dateFormat="DD/MM/YYYY"
        calendarClassName="wide-calendar"
      />
      {touched && ((error && <span className="input-errors">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderSelect = (selectOptions) => {
  return ({
    input, label, placeholder, type, className, disabled = false, meta: { touched, error, warning }
  }) => (
    <div>
      <Select2
        {...input}
        options={{
          placeholder,
        }}
        className={className}
        disabled={disabled}
        data={selectOptions}
      />
      {touched && ((error && <span className="input-errors">{error}</span>) || (warning
        && <span>{warning}</span>))}
    </div>
  );
};

export const renderMultiSelect = (selectOptions) => {
  return ({
    input, label, type, disabled = false, meta: { touched, error, warning }
  }) => (
    <div className="select-picker">
      <Select2
        {...input}
        multiple
        disabled={disabled}
        data={selectOptions}
      />
      {touched && ((error && <span className="input-errors">{error}</span>) || (warning
        && <span>{warning}</span>))}
    </div>
  );
};

export const renderPreviewFile = (file, doDeleteNewUploadFile, saveDocument) => {
  const extension = file.name.split('.')[1];
  let previewClass;
  if (extension === 'docx' || extension === 'doc') {
    previewClass = 'doc-image-preview';
  } else if (extension === 'pptx' || extension === 'ppt') {
    previewClass = 'power-point-icon-preview';
  } else if (extension === 'pdf') {
    previewClass = 'pdf-image-preview';
  }
  return (
    <div className="d-flex flex-horizontal mb-10" key={`document_${file.id}`}>
      {
        previewClass ? <div className={previewClass} /> :
          <a className="image-file-preview"><img src={file.url} alt={file.name}/></a>
      }
      <div className="file-name-wrapper">
        <a className="degree-filename ml-10" href={file.url} title={file.fileName}>{file.fileName}</a>
      </div>
      {
        doDeleteNewUploadFile ?
          <a className="icon-delete ml-10" onClick={() => doDeleteNewUploadFile(file.uid)} title={file.fileName}>
            <svg viewBox="0 0 24 24" className="material-icon secondary" height="18" width="18">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </a> : null
      }

      {
        saveDocument !== undefined
          ? (
            <a className="icon-upload ml-10" onClick={() => saveDocument(file)} title={file.fileName}>
              <svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" className="material-icon">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </a>
          )
          : null
      }
    </div>
  );
};

class renderFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewUrl: this.props.previewUrl
    };
    this.handleUpload = this.props.onUpload;
  }


  onChange(files) {
    const self = this;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      self.setState({ previewUrl: files[0].preview, content: fileReader.result });
      if (self.handleUpload) {
        self.handleUpload({
          uid: ObjectUtils.generateUUID(),
          fileName: files[0].name,
          previewUrl: files[0].preview,
          content: fileReader.result
        });
      }
    };
    fileReader.readAsDataURL(files[0]);
  }

  render() {
    const {
      input: { value, ...input }, label, meta: { touched, error }, zoneHeight, internalPreview, contentType = "image/*"
    } = this.props;
    const borderWidth = internalPreview && this.state.previewUrl != null ? '0' : '1px';
    const previewImageStyle = internalPreview ? {
      border: 'solid 1px rgb(102, 102, 102)',
      width: '100%',
      borderStyle: 'dashed'
    } : {};
    return (
      <div className="d-flex">
        <Dropzone
          name={`_${input.name}`}
          onDrop={this.onChange.bind(this)}
          multiple={false}
          className="d-flex flex-vertical"
          style={{
            width: '100%',
            height: zoneHeight,
            borderWidth,
            borderStyle: 'dashed',
            borderColor: 'rgb(102, 102, 102)',
            borderRadius: '5px',
          }}
          accept={contentType}
        >
          <div className="d-flex flex-auto justify-content-center align-items-center">
            <div className={this.state.previewUrl ? 'd-none' : 'd-flex flex-horizontal align-self-center padd-10'}>
              <a className="icon-upload">
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" className="material-icon">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                </svg>
              </a>
              <a className="ml-10">{TT.changeLocale(this.props.lang).t('drag_and_drop')}</a>
            </div>
          </div>

          <img
            className={internalPreview && this.state.previewUrl != null ? '' : 'd-none'}
            src={this.state.previewUrl}
            height={zoneHeight}
            style={previewImageStyle}
          />
        </Dropzone>
      </div>
    );
  }
}

export const renderSingleFileInput = renderFileInput;


class avatarInput extends renderFileInput {
  constructor(props) {
    super(props);
    this.state = {
      previewUrl: null
    };
    this.handleUpload = this.props.onUpload;
  }


  onChange(files) {
    const self = this;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      self.setState({ previewUrl: files[0].preview });
    };
    fileReader.readAsDataURL(files[0]);
  }

  _crop() {
    if (this.handleUpload) {
      this.handleUpload({ content: this.refs.cropper.getCroppedCanvas().toDataURL() });
    }
  }

  resetFormField() {
    this.setState({ previewUrl: null });
    this.props.onFileRemoved();
  }

  render() {
    const { zoneHeight, scaleWidth = 1, scaleHeight = 1 } = this.props;

    const cropper = (
      <Cropper
        src={this.state.previewUrl || ''}
        ref="cropper"
        style={{ height: zoneHeight || '300px', width: '100%' }}
        aspectRatio={scaleWidth / scaleHeight}
        crop={this._crop.bind(this)}
        checkCrossOrigin={false}
        movable
        zoomable
        center
        responsive
        scalable
      />
    );

    return (
      <div>
        {
          this.state.previewUrl ? cropper : super.render()
        }
        {
          this.state.previewUrl
            ? (
              <a style={{ top: `${parseInt(zoneHeight) / 2}px` }} className="btn btn-primary remove-upload-file" onClick={this.resetFormField.bind(this)}>
                <i className="fa fa-trash" />
              </a>
            )
            : (<span />)
        }

      </div>
    );
  }
}

export const cropImageInput = avatarInput;


const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

class PlainClipboard extends Clipboard {
  onPaste (e) {
    e.preventDefault()
    const range = this.quill.getSelection();
    const text = e.clipboardData.getData('text/plain');
    const delta = new Delta()
    .retain(range.index)
    .delete(range.length)
    .insert(text);
    const index = text.length + range.index;
    const length = 0;
    this.quill.updateContents(delta, 'silent');
    this.quill.setSelection(index, length, 'silent');
    this.quill.scrollIntoView();
  }
}

Quill.register('modules/clipboard', PlainClipboard, true);

export const renderRichTextEditor = ({
  input, label, placeholder, type, disabled = false, className, meta: { touched, error, warning }
}) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' },
        { indent: '-1' }, { indent: '+1' }],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  const formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent'
  ];

  return (
    <div className="full-width-input-wrapper">
      {
        <ReactQuill
          {...input}
          modules={modules}
          formats={formats}
          placeholder={placeholder || ''}
          type={type}
          disabled={disabled}
          className={`${className}${touched && error ? ' error' : ''}`}
          onChange={(newValue, delta, source, quill) => {
            if (source === 'user') {
              input.onChange(newValue);
            }
          }}
          onBlur={(range, source, quill) => {
            input.onBlur(quill.getHTML());
          }}
        />
      }
      {touched && ((error && <span className="input-errors">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};
