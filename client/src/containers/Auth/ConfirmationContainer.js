import React, {Component} from 'react';
import {connect} from 'react-redux';
import {confirmUser} from "actions/SessionActionCreator";


class ConfirmationContainer extends Component {
  componentWillMount() {
    this.props.confirm()
  }

  render() {
    return (
      <div className="row">
        <div className='col-sm-12'>
          {this.context.t('confirming')}
        </div>
      </div>
    );
  }
}

ConfirmationContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  confirm: () => dispatch(confirmUser())
})


export default connect(
  mapStateToProps, mapDispatchToProps
)( ConfirmationContainer);
