/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise.
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */

import { isObject } from 'utils/commonUtils';
import { clearAuthenticationData } from '../actions/SessionActionCreator';

export default function request(url, options) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          // update token, uid and client_id in browser storage
          const uid = response.headers.get('uid');
          const accessToken = response.headers.get('access-token');
          const client = response.headers.get('client');

          if (accessToken) {
            localStorage.setItem('ezyLearningToken', accessToken);
            localStorage.setItem('ezyLearningClient', client);
            localStorage.setItem('ezyLearningUid', uid);
          }

          const xPage = response.headers.get('X-Page');
          const xPerPage = response.headers.get('X-Per-Page');
          const xTotal = response.headers.get('X-Total');

          if (xPage && xPerPage && xTotal) {
            return response.json().then((r) => {
              resolve({
                headers: {
                  xPage, xPerPage, xTotal
                },
                body: r
              });
            });
          }
          response.json().then((r) => {
            resolve(r);
          });
        } else {
          switch (response.status) {
            case 401:
              clearAuthenticationData();
          }
          response.json().then((r) => {
            const error = isObject(r) ? {
              ...r,
              status: response.status
            } : { errors: [r], status: response.status };
            reject(error);
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
