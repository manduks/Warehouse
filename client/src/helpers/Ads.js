let ads = [];
const numberOfAds = 1000;
const insertEach = 20;

function generateRandomAdd() {
  let adNumber;
  if (ads.length >= numberOfAds) { // if we dont have any more adds
    return -1;
  }
  adNumber = Math.floor(Math.random()* numberOfAds);
  while (ads.indexOf(adNumber) !== -1) {
    adNumber = Math.floor(Math.random()* numberOfAds);
    if (ads.length >= numberOfAds) { // we have used all adds
      adNumber = -1;
      break;
    }
  }
  ads.push(adNumber); // add used add
  return adNumber;
}

function reset() {
  ads = [];
}
const Ads = { generateRandomAdd, insertEach, reset };

export default Ads;
