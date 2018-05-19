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
            title={media.title}
            description={media.description}
            iconName={media.iconName}
          />
        </div>
      )
    })
  }

  render() {
    const mediaCards = [
      {
        imgUrl: '#',
        title: this.context.t('introduction_interactive_title'),
        description: this.context.t('introduction_interactive_description'),
        iconName: 'interaction'
      },
      {
        imgUrl: '#',
        title: this.context.t('introduction_save_cost_title'),
        description: this.context.t('introduction_save_cost_description'),
        iconName: 'save-money'
      },
      {
        imgUrl: '#',
        title: this.context.t('introduction_save_time_title'),
        description: this.context.t('introduction_save_time_description'),
        iconName: 'save-time'
      }
    ]

    return (
      <section className={styles.introduceSection}>
        <div className="container">
          <div className="row row-padding">
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
