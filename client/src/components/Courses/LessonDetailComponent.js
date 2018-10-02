import * as React from 'react';
import {Component} from 'react';
import FormField from '../Core/FormField';

export class LessonDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { documents: [] };
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="inline-form padding-15">
        <div className="d-flex flex-vertical">
          <div>
            <FormField
              fieldId="lesson_title_Id"
              fieldLabel={this.context.t('lesson_name')}
              isMandatoryField
              formControlName="title"
              typeField="custom_input"
            />
          </div>
          <div>
            <FormField
              fieldId="lessonPeriodId"
              fieldLabel={this.context.t(this.context.t('lesson_period'), { lessonPeriod: 45 })}
              isMandatoryField
              formControlName="period"
              typeField="custom_input"
            />
          </div>
          <div>
            <FormField
              fieldId="lessonDesciptionId"
              fieldLabel={this.context.t('lesson_desc')}
              isMandatoryField
              formControlName="description"
              typeField="rich_text_editor"
              customClassName="quill-form-control"
            />
          </div>
        </div>
      </form>
    );
  }
}

LessonDetailComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
};
