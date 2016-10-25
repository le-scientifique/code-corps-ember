import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object
} = Ember;

moduleForComponent('donation-goal', 'Integration | Component | donation goal', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goal}}`);

  assert.equal(this.$('.donation-goal').length, 1, 'Component element is rendered');
});

let mockGoal = Object.create({
  amount: 50000, // cents
  description: 'A test goal'
});

test('it displays the donation goal info', function(assert) {
  assert.expect(2);

  this.set('donationGoal', mockGoal);
  this.render(hbs`{{donation-goal donationGoal=donationGoal}}`);

  assert.equal(this.$('.amount').text().trim(), '$500', 'Correct amount is rendered');
  assert.equal(this.$('.description').text().trim(), 'A test goal', 'Correct description is rendered');
});

test('it displays the edit link', function(assert) {
  assert.expect(1);

  this.set('donationGoal', mockGoal);
  this.render(hbs`{{donation-goal donationGoal=donationGoal}}`);

  assert.equal(this.$('.edit').length, 1, 'Edit button is rendered');
});

test('it sends the edit action when the edit link is clicked', function(assert) {
  assert.expect(1);

  this.set('donationGoal', mockGoal);
  this.set('editHandler', (donationGoal) => {
    assert.deepEqual(mockGoal, donationGoal, 'Handler got called, with donation goal curried');
  });

  this.render(hbs`{{donation-goal donationGoal=donationGoal edit=(action editHandler donationGoal)}}`);

  this.$('.edit').click();
});
