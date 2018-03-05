import React, { Component} from 'react';
import {Form} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './SearchForm.module.scss';
import Select2 from 'react-select2-wrapper'

class SearchForm extends Component {
  render() {
    return (
      <Form action="#" id="search_form" method="post">
        <ul className="home-search">
          <li>
            <Select2
              data={[
                { text: 'Select Location', id: '' },
                { text: 'Los Angeles', id: 'los-angeles' },
                { text: 'San Diego', id: 'san-diego' }
              ]}
            />
          </li>
          <li>
            <Select2
              data={[
                {text: 'Select Course', id: ''},
                {text: 'C++ Programming', id: 'c-programming'},
                {text: 'Java Programming (5)', id: 'java-programming'},
                {text: 'Adobe Photoshop (7)', id: 'adobe-photoshop'}
              ]}
            />
          </li>
          <li>
            <button type="submit" className="btn btn-search _button-search"><i className="fa fa-search"></i>Search Your Teacher</button>
          </li>
        </ul>
      </Form>
    )
  }
}

SearchForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

SearchForm.propTypes = {
  // content: PropTypes.string.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired
};

export default cssModules(SearchForm, styles);