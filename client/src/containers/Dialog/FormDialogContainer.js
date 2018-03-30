import {Component} from "react";
import {submit} from 'redux-form';
import * as React from "react";
import {Dialog, FlatButton} from "material-ui";
import {connect} from "react-redux";
import { mStyles } from 'utils/CustomStylesUtil';

class FormDialogContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      formName, show, title, cancelCallback,
      cancelLabel = this.context.t('close'),
      okLabel = this.context.t('ok')
    } = this.props;

    const actions = [
      <FlatButton
        label={cancelLabel}
        primary={true}
        onClick={cancelCallback}
      />,
      <FlatButton
        label={okLabel}
        primary={true}
        keyboardFocused={true}
        onClick={() => this.props.dispatch(submit(formName))}
      />,
    ];

    return (
      <Dialog open={show} title={title}
              style={mStyles.dialogStyle}
              titleStyle={mStyles.titleDialogStyle}
              bodyStyle={mStyles.bodyDialogStyle}
              autoScrollBodyContent={true}
              onRequestClose={cancelCallback}
              actions={actions}>
        {this.props.children}
      </Dialog>
    )
  }
}

FormDialogContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

FormDialogContainer.propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
  cancelCallback: React.PropTypes.func.isRequired
}

export default connect()(FormDialogContainer);