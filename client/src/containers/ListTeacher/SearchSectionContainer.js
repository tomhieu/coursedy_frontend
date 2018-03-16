import React, {Component} from 'react';
import FormField from '../../components/Core/FormField';
import {RaiseButton} from '../../components/Core/CustomComponents';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as TeacherActions from "../../actions/TeacherCreators";
import {mStyles} from "utils/CustomStylesUtil";
import AutoComplete from "components/AutoComplete/AutoComplete";
import {Chip} from "material-ui";
import {
  fetchCourseCategories, fetchLocations
} from 'actions/ReferenceActions/ReferenceDataActionCreator'
import cssModules from 'react-css-modules';
import styles from './ListTeacher.module.scss';
import { FilterOption } from '../../components/FilterOption/FilterOption'


class SearchSectionContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCourseCategories())
    this.props.dispatch(fetchLocations())
  }

  onSubmit(data) {
    this.props.dispatch(TeacherActions.fetchTeachers(data))
  }

  render() {
    let {
      handleSubmit
    } = this.props

    let { categories, locations }  = this.props
    locations = [{id: 1, name: 'Ha Noi'}, {id: 2, name: 'HCM'}]
    return(
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <form onSubmit={handleSubmit(()=>{})} className='inline-form' multiple={true}>
            <div className={styles.filterActionBlock + " col-md-12 col-sm-12"}>
              <div className="row full-height">
                {/* Left auto complete search part */}
                <div className="col-md-9 col-sm-9 full-height">
                  <div className={styles.filterInputBox + " d-flex flex-vertical justify-content-center full-height"}>
                    <div className="d-flex flex-horizontal">
                      {
                        [].map((sc) =>
                          <Chip key={"filter_categories_" + sc.id}
                                onRequestDelete={() => onRemoveFilter(sc.id, 'selectedCategories')}
                                style={mStyles.chip}
                                labelStyle={mStyles.chipLabelStyle}
                                deleteIconStyle={mStyles.chipIconDelete}
                          >{sc.name}</Chip>
                        )
                      }
                      {
                        [].map((f) =>
                          <Chip key={"filter_locs_" + f.id}
                                onRequestDelete={() => {}}
                                style={mStyles.chip}
                                labelStyle={mStyles.chipLabelStyle}
                                deleteIconStyle={mStyles.chipIconDelete}
                          >{f.name}</Chip>
                        )
                      }
                    </div>
                    <AutoComplete placeholder={this.context.t('search_teachers_keyword')}
                                  fieldName="key_word" fieldId="key_word_filter"
                                  dataSource={[]}
                                  handleAddCriteria={()=>{}}
                                  loadSuggestions={()=>{}}
                                  filters={[]}
                                  show={[]}
                                  isLoading={[]}
                    />
                  </div>
                </div>
                {/* Right filter part */}
                <div className="col-md-3 col-sm-3 full-height st-border-left">
                  <div className="d-flex flex-horizontal align-items-center flex-nowrap ml-15 mt-20">
                    <div className={styles.filterOptionContainer}>
                      <FilterOption label={this.context.t('course_category_title')}
                                    options={categories.map((x) => {
                                      return {name: x.name, id: x.id}
                                    })}
                                    selectedOptions={[]}
                                    onSelectFilter={()=>{}}
                                    type="multi-select"
                                    name="selectedCategories">
                      </FilterOption>
                    </div>
                    <div className={styles.filterOptionContainer}>
                      <FilterOption label={this.context.t('location')}
                                    options={locations.map((x) => {
                                      return {name: x.name, id: x.id}
                                    })}
                                    selectedOptions={[]}
                                    onSelectFilter={()=>{}}
                                    type="single-select"
                                    name="selectedLocations">
                      </FilterOption>
                    </div>
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
  const categories = state.referenceData.courseCategories || []
  const locations = state.referenceData.locations || []

  return {
    categories,
    locations
  }
}


export default connect(
  mapStateToProps
)(reduxForm({
  form: 'teacherFilterForm',
  fields: ['key_word', 'category_ids']
})(cssModules(SearchSectionContainer, styles)));
