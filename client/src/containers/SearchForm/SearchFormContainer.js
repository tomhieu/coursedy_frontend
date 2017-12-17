import React, {Component} from 'react';
import {SearchForm} from '../../components/index';
import styles from './SearchFormContainer.module.scss';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';

class SearchFormContainer extends Component {
  render() {
    return (
      <section className="header-homepage">
        <div className="container">
          <div className="row header-margin">
            <div className="col-sm-12">
              <h1 className="hero-title">Explore - Enrich - Excel</h1>
              <p className="hero-tag">Everything you need in order to find the <strong>Right</strong> Class for you</p>
            </div>
            <div className="col-sm-12">
              <SearchForm/>
            </div>
            <div className="col-sm-12">
              <img src="http://dev.mindsworthy.com/tutorsci/demo/assets/front/images/headericons.png" alt=""
                   className="img-responsive"/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

SearchFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

SearchFormContainer.propTypes = {};

const mapStateToProps = (state) => ({});


const StyledComponent = cssModules(SearchFormContainer, styles);

export default connect(
  mapStateToProps
)(StyledComponent);
