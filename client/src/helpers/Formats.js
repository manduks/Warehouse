const moment = require('moment');

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

const Formats = { centsToDollars, timeAgo };

export default Formats;
