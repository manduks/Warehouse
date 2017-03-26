const oboe = require('oboe');
/* eslint-disable no-undef */
function filter(query, cb) {
  return fetch(`/api`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function streamProducts(query, cb) {
  oboe('/api?limit=502')
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
