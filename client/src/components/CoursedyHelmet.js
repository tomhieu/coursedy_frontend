import React  from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


const core = {
  default_title: 'Học trực tuyến - coursedy.com',
  suffix_title: 'COURSEDY',
  description: 'Nền tảng học trực tuyến có tính tương tác trực tiếp giữa người dạy và người học đầu tiên tại Việt Nam với công nghệ video streaming hiện đại',
  keywords: 'Học trực tuyến, Dạy học online, E-Learning, video conferencing, video conference, online learning, screen share',
  contentType: 'website',
  creator: '@COURSEDY',
  fb_app_id: 1054559741372976,
  site_name: 'COURSEDY',
  twitter_card: 'summary_large_image',
  image: 'https://api.coursedy.com/uploads/course/cover_image/67/5e1ef1d180cacf9afaa0f22d47bc791089a7115a.png',
  schema: 'WebSite',
  url: 'https://coursedy.com/',
  lang: 'vi',
  theme_color: '#1CABA0'
};

const getMetaTags = ({
                       title, image, keywords, description, url, contentType, published, updated, category, tags, creator
                     }) => {
  const des = description || core.description;
  title = title ? `${title} - ${core.suffix_title}` : core.default_title;

  const metaTags = [{
    name: 'viewport',
    content: 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  }, {
    'http-equiv': 'x-ua-compatible', content: 'ie=edge'
  }, { name: 'theme-color', content: '#1CABA0' }, {
    itemprop: 'name', content: title || core.default_title
  }, { itemprop: 'description', content: des }, {
    itemprop: 'image', content: image || core.image
  }, { name: 'description', content: des }, {
    name: 'keywords', content: keywords || core.keywords
  }, {
    name: 'twitter:card', content: core.twitter_card
  }, {
    name: 'twitter:site', content: `@${core.site_name}`
  }, { name: 'twitter:title', content: title }, {
    name: 'twitter:description', content: des
  }, {
    name: 'twitter:creator',
    content: `${creator ? `@${creator}` : core.creator}`
  }, {
    name: 'twitter:image:src', content: image || core.image
  }, { property: 'og:title', content: title }, {
    property: 'og:type', content: contentType || core.contentType
  }, { property: 'og:url', content: url || core.url }, {
    property: 'og:image', content: image || core.image
  }, { property: 'og:description', content: des }, {
    property: 'og:site_name', content: core.site_name
  }, { property: 'fb:app_id', content: core.fb_app_id }];

  if (published) {
    metaTags.push({ property: 'article:published_time', content: published });
  }
  if (updated) {
    metaTags.push({ property: 'article:modified_time', content: updated });
  }
  if (category) {
    metaTags.push({ property: 'article:section', content: category });
  }
  if (tags) {
    metaTags.push({ property: 'article:tag', content: tags });
  }

  return metaTags;
};

const CoursedyHelmet = ({
                     schema, title, image,
                     keywords, description, url,
                     contentType, published, updated,
                     category, tags, creator
                   }) => (
  <Helmet
    htmlAttributes={{
      lang: core.lang,
      itemscope: undefined,
      itemtype: `http://schema.org/${schema || core.schema}`
    }}
    title={title ? `${title} - ${core.suffix_title}` : core.default_title}
    link={[{ rel: 'canonical', href: url || core.url }]}
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
    })}
  />
);

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

export default CoursedyHelmet;
