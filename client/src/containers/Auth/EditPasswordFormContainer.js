import React, {Component} from 'react'
import { connect } from 'react-redux'
import {editPassword} from "../../actions/SessionActionCreator";
import ChangePasswordContainer from 'containers/Account/ChangePasswordContainer'


class EditPasswordFormContainer extends Component {
  componentWillMount(){
    this.props.autoLogin()
  }

  render() {
    return (
      <div className="sign-block">
        <ChangePasswordContainer updateWithoutPassword={true}/>
      </div>
    );
  }
}

EditPasswordFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: (email) => dispatch(editPassword()),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)( EditPasswordFormContainer)
