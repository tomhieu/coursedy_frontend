// Brilliant network wrapper courteousy of
// https://github.com/pburtchaell/redux-promise-middleware
// Works to create requests to a network resource and wraps the requests in
// A promise.  This works great with redux promise middlewares
// See the actions for post to see it in action located in ../actions/post.js
import queryString from 'query-string';
import request from './request';
import config from 'config'

/**
 * @function Network
 * @description Factory function to create a object that can send
 * requests to a specific resource on the server.
 * @param {string} resource The resource used for config
 */
const Network = (res = {}) => {
  const buildUrl = (path, isBBBApi = false) => {
    const { id, resource } = res;
    let parameters = [
      config.apiEndpoint,
      'api',
      'v1'
    ];

    if (isBBBApi) {
      parameters = [
        config.apiEndpoint,
        'bigbluebutton',
        'api'
      ];
    }

    if (path.trim() && path.trim() !== '/') parameters = parameters.concat([path]);

    if (resource) parameters = parameters.concat([resource]);
    if (id) parameters = parameters.concat([id]);
    return parameters.join('/');
  };

  // Default option for every request
  let lang = localStorage.getItem('coursedyLang') || 'vi'
  lang = lang == 'vn' ? 'vi' : lang

  const defaultOptions = {
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'token-type': 'Bearer',
      'access-token': localStorage.getItem('ezyLearningToken'),
      client: localStorage.getItem('ezyLearningClient'),
      uid: localStorage.getItem('ezyLearningUid'),
      'X-Language':  lang,
    }
  };

  return {

    /**
      * @function post
      * @description Make a POST request.
      * @param {string} path
      * @param {object} body
      * @param {object} options
      * @returns {promise}
      */
    post: (path, body, options = {}) => {
      const headers = Object.assign({}, options.headers, defaultOptions.headers)
      return request(buildUrl(path), Object.assign(
        options,
        defaultOptions,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        }
      ));
    },

    /**
      * @function get
      * @description Make a GET request.
      * @param {string} path
      * @param {object} options
      * @returns {promise}
      */
    get: (path, options = {}, isBBBApi = false) => {
      const q = queryString.stringify(options, { arrayFormat: 'bracket' });
      const headers = Object.assign({}, options.headers, defaultOptions.headers)
      return request(`${buildUrl(path, isBBBApi)}?${q}`, Object.assign(
        options,
        defaultOptions,
        {
          method: 'GET',
          headers: headers
        }
      ));
    },

    /**
      * @function edit
      * @description Make a PUT request.
      * @param {string} path
      * @param {object} body
      * @param {object} options
      * @returns {promise}
      */
    update: (path, body, options = {}) => {
      const headers = Object.assign({}, options.headers, defaultOptions.headers)
      return request(buildUrl(path), Object.assign(
        options,
        defaultOptions,
        {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(body)
        }
      ));
    },

    /**
      * @function delete
      * @description Make a DELETE request.
      * @param {string} path
      * @param {object} options
      * @returns {promise}
      */
    delete: (path, options = {}) => {
      const headers = Object.assign({}, options.headers, defaultOptions.headers)
      return request(buildUrl(path), Object.assign(
        options,
        defaultOptions,
        {
          method: 'DELETE',
          headers
        }
      ));
    },

    ping: () => request(buildUrl(), { method: 'GET' })
  };
};

export const getQueryParam = (name, qString) => {
  return queryString.parse(qString)[name];
};

export default Network;
