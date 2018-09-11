import * as React from 'react';
import {Component} from 'react';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import styles from './StartCourseFormContainer.module.scss';
import FormDialogContainer from '../../Dialog/FormDialogContainer';
import FormField from '../../../components/Core/FormField';
import { validate } from '../../../validations/StartCourseFormValidation';
import DateUtils from '../../../utils/DateUtils';

class StartCourseFormContainer extends Component {
  render() {
    const {
      show, popupTitle, handleSubmit, acceptCallback, popupMessage, cancelCallback, course
    } = this.props;
    const formName = "startCourseForm" + course.id;
    return (
      <FormDialogContainer
        show={show}
        formName={formName}
        title={popupTitle}
        acceptCallback={acceptCallback}
        cancelCallback={cancelCallback}
        {...this.props}
      >
        <form onSubmit={handleSubmit(this.props.onSubmit)} className="inline-form" multiple>
          <FormField
            fieldId="start_date"
            fieldLabel={this.context.t("start_date")}
            isMandatoryField
            formControlName="start_date"
            typeField="datepicker"
            {...this.props}
          />
          <div>{popupMessage}</div>
        </form>
      </FormDialogContainer>
    );
  }
}

StartCourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StartCourseFormContainer.propTypes = {
  show: React.PropTypes.bool.isRequired,
  popupTitle: React.PropTypes.string.isRequired,
  acceptCallback: React.PropTypes.func.isRequired,
  popupMessage: React.PropTypes.string.isRequired,
  cancelCallback: React.PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const {course} = props;
  const startDate = DateUtils.formatDate(course.start_date);
  return {
    form: 'startCourseForm' + course.id,
    initialValues: {start_date: startDate}
  };
};

export default connect(
  mapStateToProps
)(reduxForm({
  fields: ['start_date'],
  validate
})(cssModules(StartCourseFormContainer, styles)));
