const oboe = require('oboe');

function serializeObject(obj) {
  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');
}
function streamProducts(params, cb) {
  oboe(`http://localhost:3000/api?${serializeObject(params)}`).done(cb).fail((error) => {
    console.log(error); // eslint-disable-line no-console
  });
}
function getEmptyList() {
  // eslint-disable-line class-methods-use-this
  return [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    face: 'no-face',
    id: i,
  }));
}
const API = { streamProducts, getEmptyList };
export default API;
