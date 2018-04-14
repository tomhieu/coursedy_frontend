import React from 'react'
import {TT} from "utils/locale";


const EmptyResultWarning = (props) => {
  return (
    <div className={`${props.styles} row justify-content-center`}>
      <div className="d-flex flex-auto align-items-center">
        <div className="d-flex flex-vertical flex-auto align-items-center">
          <img src="/search-not-found.svg" width={100} height={100} alt="search-not-found"/>
          <h3>{TT.t("search_empty_result", {type: TT.t(props.searchType)})}</h3>
        </div>
      </div>
    </div>
  )
}

EmptyResultWarning.contextTypes = {
  t: React.PropTypes.func.isRequired
}

EmptyResultWarning.defaultProps = {
  styles: ''
}

EmptyResultWarning.propTypes = {
  styles: React.PropTypes.string,
  searchType: React.PropTypes.string,
}

export default EmptyResultWarning
