import React, {Component} from 'react'
import './TermOfUse.scss'
import { TT } from 'utils/locale'

class TermsContainer extends Component {
  render() {
    return (
      <div className="terms-of-use full-width-in-container">
        <div className="container">
          <TermOfUseTop />
          <TermOfUseCenter />
        </div>
      </div>
    )
  }
}

TermsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TermsContainer

const TermOfUseTop = () => {
  return (
    <div className="terms-of-use__heading">
      <h1 className="terms-of-use__title">{TT.t('terms_title')}</h1>
      <div className="divider"></div>
      <p><strong>{TT.t('terms_latest_update')}</strong></p>
      <p>{TT.t('terms_description')}</p>
    </div>
  )
}

const TermOfUseCenter = () => {
  return (
    <div className="terms-of-use__main">
      {TT.t('terms').map((term, index) => {
        return <TermsBlock term={term} key={index}/>
      })}
    </div>
  )
}

const TermsBlock = ({term}) => {
  return (
    <div className="terms-of-use__block">
      <h4>{term.heading}</h4>
      <TermList term={term} />
      <TermDescription term={term} />
    </div>
  )
}

const TermList = ({term}) => {
  return (
      term.items.length ? <ul>
        {term.items.map((term, index) => {
          return <li key={index}>{term.content}
            {term.child_content ?
              <TermList term={term.child_content} />: null
            }
          </li>
        })}
    </ul> : null
  )
}

const TermDescription = ({term}) => {
  return (
    term.description ? <p>
      {term.ddescription}
    </p>: null
  )
}
