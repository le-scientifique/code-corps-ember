import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';

const {
  Object
} = Ember;

moduleForComponent('edit-donation-goal', 'Integration | Component | donation goal edit', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{donation-goal-edit}}`);
  assert.equal(this.$('.donation-goal-edit').length, 1);
});

test('it sends save action, with user input properties as argument, when save button is clicked', function(assert) {
  assert.expect(2);

  this.set('donationGoal', Object.create({ amount: 20, description: 'Some description' }));

  this.set('saveHandler', (donationGoal, properties) => {
    let expected = { amount: 1, description: 'Test' };
    assert.deepEqual(properties, expected, 'submitted values are passed to external action');

    let expectedGoalProperties = this.get('donationGoal').getProperties('amount', 'description');
    let actualGoalProperties = donationGoal.getProperties('amount', 'description');
    assert.deepEqual(expectedGoalProperties, actualGoalProperties, 'donation goal is curried unchanged');
  });

  this.render(hbs`{{donation-goal-edit amount=1 description='Test' save=(action saveHandler donationGoal)}}`);

  this.$('.save').click();
});

test('it sends cancel action, when cancel button is clicked', function(assert) {
  assert.expect(1);

  this.set('donationGoal', Object.create({ amount: 20, description: 'Some description' }));

  this.set('cancelHandler', (donationGoal) => {
    let expectedGoalProperties = this.get('donationGoal').getProperties('amount', 'description');
    let actualGoalProperties = donationGoal.getProperties('amount', 'description');
    assert.deepEqual(expectedGoalProperties, actualGoalProperties, 'donation goal is curried unchanged');
  });

  this.render(hbs`{{donation-goal-edit amount=1 description='Test' cancel=(action cancelHandler donationGoal)}}`);

  this.$('.cancel').click();
});
