import { module, test } from 'qunit';
import { formatCurrency } from 'code-corps-ember/helpers/format-currency';

module('Unit | Helper | format-currency');

test('formats hundreds correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([12300]);
  assert.equal(result, '$123.00');
});

test('formats thousands correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([1234500]);
  assert.equal(result, '$12,345.00');
});

test('formats millions correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([23456789055]);
  assert.equal(result, '$234,567,890.55');
});
