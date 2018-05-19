import React, {Component} from 'react';
import {SearchForm} from '../../components/index';
import styles from './SearchFormContainer.module.scss';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';
import * as WebConstants from "../../constants/WebConstants";

class SearchFormContainer extends Component {
  componentWillMount() {
    this.props.showDarkHeader();
  }
  componentWillUnmount() {
    this.props.showWhiteHeader();
  }

  render() {
    return (
      <section className="header-homepage d-flex align-items-center">
        <div className="container">
          <div className="row header-margin">
            <div className="col-sm-12">
              <h1 className="hero-title">{this.context.t('product_title')}</h1>
              <p className="hero-tag">{this.context.t('product_tag')}</p>
            </div>
            <div className="col-sm-12">
              <SearchForm/>
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

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  showDarkHeader: () => dispatch({ type: WebConstants.SHOW_DARK_HEADER }),
  showWhiteHeader: () => dispatch({ type: WebConstants.SHOW_WHITE_HEADER }),
});


const StyledComponent = cssModules(SearchFormContainer, styles);

export default connect(
  mapStateToProps, mapDispatchToProps
)(StyledComponent);
