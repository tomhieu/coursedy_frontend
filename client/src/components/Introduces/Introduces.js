import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './Introduces.module.scss'
import { MediaCard } from '../Card/MediaCard'


class Introduces extends Component {
  renderMedias(mediaCards) {
    return mediaCards.map((media, index) => {
      return (
        <div className="col-md-4 col-sm-4 col-xs-12" key={index}>
          <MediaCard
            imgUrl={media.imgUrl}
            title={media.title}
            description={media.description}/>
        </div>
      )
    })
  }

  render() {
    const mediaCards = [
      {
        imgUrl: 'http://dev.mindsworthy.com/tutorsci/demo/assets/front/images/icn-video.png',
        title: this.context.t('introduction_interactive_title'),
        description: this.context.t('introduction_interactive_description')
      },
      {
        imgUrl: 'http://dev.mindsworthy.com/tutorsci/demo/assets/front/images/icn-score.png',
        title: this.context.t('introduction_save_cost_title'),
        description: this.context.t('introduction_save_cost_description')
      },
      {
        imgUrl: 'http://dev.mindsworthy.com/tutorsci/demo/assets/front/images/icn-calendar.png',
        title: this.context.t('introduction_save_time_title'),
        description: this.context.t('introduction_save_time_description')
      }
    ]

    return (
      <section>
        <div className="container">
          <div className="row row-margin">
            {this.renderMedias(mediaCards)}
          </div>
        </div>
      </section>
    )
  }
}


Introduces.contextTypes = {
  t: React.PropTypes.func.isRequired
}

Introduces.propTypes = {}

export default cssModules(Introduces, styles)
