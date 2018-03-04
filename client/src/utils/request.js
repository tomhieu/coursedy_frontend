/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise.
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */
import store from "../store/store";
import {HIDE_LOADING_MASK, SHOW_LOADING_MASK} from "actions/actionCreators";

export default function request(url, options) {
  store.dispatch({type: SHOW_LOADING_MASK});
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(url, options)
      .then(response => {
        // update token, uid and client_id in browser storage
        let uid = response.headers.get('uid')
        let accessToken = response.headers.get('access-token')
        let client = response.headers.get('client')

        if (accessToken){
          localStorage.setItem('ezyLearningToken', accessToken)
          localStorage.setItem('ezyLearningClient', client)
          localStorage.setItem('ezyLearningUid', uid)
        }

        return response.json()
      })
      .then(response => {
        if (response.errors) reject(response.errors);
        else resolve(response);
          store.dispatch({type: HIDE_LOADING_MASK});
      })
      .catch(reject)
  });
}
