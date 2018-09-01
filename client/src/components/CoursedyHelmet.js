import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const getMetaTags = ({
  title, image, keywords,
  description, url, contentType,
  published, updated, category,
  tags, creator
}, metaTags) => {
  const des = description || metaTags.description;
  title = title ? `${title} - ${metaTags.suffix_title}` : metaTags.default_title;

  const newMetaTags = [
    {
      name: 'viewport',
      content: 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }, {
      'http-equiv': 'x-ua-compatible', content: 'ie=edge'
    }, { name: 'theme-color', content: '#1CABA0' }, {
      itemprop: 'name', content: title || metaTags.default_title
    }, { itemprop: 'description', content: des }, {
      itemprop: 'image', content: image || metaTags.image
    }, { name: 'description', content: des }, {
      name: 'keywords', content: keywords || metaTags.keywords
    }, {
      name: 'twitter:card', content: metaTags.twitter_card
    }, {
      name: 'twitter:site', content: `@${metaTags.site_name}`
    }, { name: 'twitter:title', content: title }, {
      name: 'twitter:description', content: des
    }, {
      name: 'twitter:creator',
      content: `${creator ? `@${creator}` : metaTags.creator}`
    }, {
      name: 'twitter:image:src', content: image || metaTags.image
    }, { property: 'og:title', content: title }, {
      property: 'og:type', content: contentType || metaTags.contentType
    }, { property: 'og:url', content: url || metaTags.url }, {
      property: 'og:image', content: image || metaTags.image
    }, { property: 'og:description', content: des }, {
      property: 'og:site_name', content: metaTags.site_name
    }, { property: 'fb:app_id', content: metaTags.fb_app_id }
  ];

  if (published) {
    newMetaTags.push({ property: 'article:published_time', content: published });
  }

  if (updated) {
    newMetaTags.push({ property: 'article:modified_time', content: updated });
  }

  if (category) {
    newMetaTags.push({ property: 'article:section', content: category });
  }

  if (tags) {
    newMetaTags.push({ property: 'article:tag', content: tags });
  }

  return newMetaTags;
};

class CoursedyHelmet extends Component {
  render() {
    const {
      schema, title, image,
      keywords, description, url,
      contentType, published, updated,
      category, tags, creator
    } = this.props;

    const metaTags = this.context.t('meta_tags');

    return (
      <Helmet
        htmlAttributes={{
          lang: metaTags.lang,
          itemscope: undefined,
          itemtype: `http://schema.org/${schema || metaTags.schema}`
        }}
        title={title ? `${title} - ${metaTags.suffix_title}` : metaTags.default_title}
        link={[{ rel: 'canonical', href: url || metaTags.url }]}
        meta={getMetaTags({
          title,
          image,
          keywords,
          description,
          url,
          contentType,
          published,
          updated,
          category,
          tags,
          creator
        }, metaTags)}
      />
    );
  }
}

CoursedyHelmet.propTypes = {
  schema: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  contentType: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  creator: PropTypes.string
};

CoursedyHelmet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CoursedyHelmet;
