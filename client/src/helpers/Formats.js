const moment = require('moment');

moment.fn.fromNowOrNow = function fromNowOrNow() {
  const secs = Math.abs(moment().diff(this)) / 1000;
  return parseInt(secs, 10);
};

function centsToDollars(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function timeAgo(date) {
  const oneWeekAgo = moment().subtract(7, 'days');
  const mDate = moment(new Date(date));
  if (oneWeekAgo > mDate) {
    return mDate.format('YYYY-MM-DD HH:mm:ss');
  }
  return mDate.fromNow();
}

function secondsPast(date) {
  return moment(new Date(date)).fromNowOrNow();
}
const Formats = { centsToDollars, timeAgo, secondsPast };

export default Formats;
