import Ember from 'ember';

const {
  Helper: { helper }
} = Ember;

const COMMAS_EVERY_THREE_DIGITS = /(\d)(?=(\d{3})+(?!\d))/g;

/**
 * Used to display an amount (in cents) as currency in the format of
 * $20,000.50
 *
 * - prefixed with a dollar sign
 * - commas every 3 digits
 * - dot as decimal separator
 * - fixed 2-decimal notation
 *
 * @param  {Array[String]} params An array of paramaters provided to the helper in the template
 * @return {String}        Amount formated as $20,000.99
 */
export function formatCurrency(params) {
  let [centsAmountAsString] = params;
  let centsAmount = parseInt(centsAmountAsString);
  let dollarsAmount = centsAmount / 100;

  if (dollarsAmount) {
    return `$${dollarsAmount.toFixed(2).replace(COMMAS_EVERY_THREE_DIGITS, '$1,')}`;
  } else {
    return dollarsAmount;
  }
}

export default helper(formatCurrency);
