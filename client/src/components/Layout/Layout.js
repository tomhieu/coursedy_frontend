import React, {PropTypes, Component} from 'react';
import Header from './Header'
import Footer from './Footer'

class Layout extends Component {
  render() {
    return (
      <div className="">
        <Header/>
        <div className="" style={{height: "900px"}}>

        </div>
        <Footer/>
      </div>
    )
  }
}

Layout.propTypes = {
  // content: PropTypes.string.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired
};

export default Layout;