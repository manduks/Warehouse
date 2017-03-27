const oboe = require('oboe');
/* eslint-disable no-undef */
function filter(query, cb) {
  return fetch(`/api`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function serializeObject(obj) {
  return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

function streamProducts(params, cb) {
  oboe(`/api?${serializeObject(params)}`)
   .done(cb)
   .fail(function(error) {
     console.log(error); // eslint-disable-line no-console
   });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const API = { filter, streamProducts };
export default API;
