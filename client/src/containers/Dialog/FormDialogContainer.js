import {Component} from "react";
import { submit } from 'redux-form';
import * as React from "react";
import {Dialog, FlatButton} from "material-ui";
import {connect} from "react-redux";

class FormDialogContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {formName, show, title, cancelCallback} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={cancelCallback}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.props.dispatch(submit(formName))}
      />,
    ];

    const dialogStyle = {
      display: 'block'
    }

    const titleDialogStyle = {
      backgroundColor: '#534051',
      color: '#FFFFFF'
    }

    const bodyDialogStyle = {
      padding: '0'
    }

    return (
      <Dialog open={show} title={title}
              style={dialogStyle}
              titleStyle={titleDialogStyle}
              bodyStyle={bodyDialogStyle}
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