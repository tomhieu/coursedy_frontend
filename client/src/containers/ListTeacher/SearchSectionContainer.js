import React, {Component} from 'react';
import FormField from '../../components/Core/FormField';
import {RaiseButton} from '../../components/Core/CustomComponents';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as TeacherActions from "../../actions/TeacherCreators";
import {fetchCategories} from 'actions/CourseFilterActionCreator';


class SearchSectionContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  onSubmit(data) {
    this.props.dispatch(TeacherActions.fetchTeachers(data))
  }

  render() {
    let {
      handleSubmit
    } = this.props

    let { categories }  = this.props

    return(
      <div className="container search-teacher-container">
        <div className="row">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="inline-form">
            <div className="search-teacher-container__form col-md-12 col-sm-12">
              <div className="row">
                <div className={"col-md-6 col-sm-6 search-teacher-container__keyword"}>
                  <FormField formGroupId="key_word_filter" showLabel={false}
                             placeholder={this.context.t('search_teachers_keyword')}
                             formControlName="key_word" typeField="custom_input">
                  </FormField>
                </div>

                <div className={"col-md-4 col-sm-4 search-teacher-container__fields"}>
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <FormField formGroupId="categories_id" showLabel={false}
                                 options={categories.map((x) => {
                                   return {text: x.name, id: x.id}
                                 })}
                                 placeholder={this.context.t('category')}
                                 formControlName="category_ids"
                                 typeField="multi_select">
                      </FormField>
                    </div>
                  </div>
                </div>

                <div className="col-md-2 col-sm-2">
                  <div className="d-flex flex-horizontal">
                    <RaiseButton label={this.context.t('filter')}/>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

SearchSectionContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    categories: state.referenceData.courseCategories
  }
}

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'teacherFilterForm',
  fields: ['key_word', 'category_ids']
})(SearchSectionContainer));
