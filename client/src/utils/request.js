/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise.
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */

import {clearAuthenticationData} from "../actions/SessionActionCreator";

function errorHandler(err, reject) {
  switch (err.status) {
    case 401:
      clearAuthenticationData();
    default:
      reject(err);
  }
}

export default function request(url, options) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(url, options)
      .then(response => {
        if (response.ok) {
          // update token, uid and client_id in browser storage
          let uid = response.headers.get('uid')
          let accessToken = response.headers.get('access-token')
          let client = response.headers.get('client')

          if (accessToken){
            localStorage.setItem('ezyLearningToken', accessToken)
            localStorage.setItem('ezyLearningClient', client)
            localStorage.setItem('ezyLearningUid', uid)
          }

          let xPage = response.headers.get('X-Page');
          let xPerPage = response.headers.get('X-Per-Page');
          let xTotal = response.headers.get('X-Total');

          if (xPage && xPerPage && xTotal) {
            return response.json().then(r => {
              resolve({
                headers: {
                  xPage,
                  xPerPage,
                  xTotal
                },
                body: r
              } )
            })
          }
          response.json().then(r => {
            resolve(r)
          })
        } else {
          // handle request error
          errorHandler(response, reject);
        }
      })
      .catch(err => {
        console.error(err);
        reject(err);
      })
  });
}