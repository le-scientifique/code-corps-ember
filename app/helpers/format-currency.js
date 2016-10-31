import Ember from 'ember';

const {
  Helper: { helper }
} = Ember;

const COMMAS_EVERY_THREE_DIGITS = /(\d)(?=(\d{3})+(?!\d))/g;

export function formatCurrency(params) {
  let [value] = params;
  let floatValue = parseFloat(value);

  if (value) {
    return `$${floatValue.toFixed(2).replace(COMMAS_EVERY_THREE_DIGITS, '$1,')}`;
  } else {
    return value;
  }
}

export default helper(formatCurrency);
