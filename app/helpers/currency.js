import Ember from 'ember';

const {
  isEmpty,
  Helper
} = Ember;

export function currency([centsString]) {
  if (isEmpty(centsString)) {
    return;
  }
  let value = parseInt(centsString, 10);
  let dollars = Math.floor(value / 100);
  let cents = value % 100;
  let sign = '$';

  if (cents > 0) {
    return `${sign}${dollars}.${cents}`;
  } else {
    return `${sign}${dollars}`;
  }
}

export default Helper.helper(currency);
