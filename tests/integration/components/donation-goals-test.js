import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object
} = Ember;

moduleForComponent('donation-goals', 'Integration | Component | donation goals', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goals}}`);

  assert.equal(this.$('.donation-goals').length, 1, 'Renders the component element');
});

test('it renders the correct number of subcomponents', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({}),
    Object.create({}),
    Object.create({})
  ];

  this.set('donationGoals', mockGoals);

  this.render(hbs`{{donation-goals donationGoals=donationGoals}}`);

  assert.equal(this.$('.donation-goal').length, 3, 'Renders correct number of donation-goal components');
});

test('it renders the correct number of subcomponents in view or edit mode', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: false }),
    Object.create({ isEditing: true }),
    Object.create({ isEditing: false })
  ];

  this.set('donationGoals', mockGoals);

  this.render(hbs`{{donation-goals donationGoals=donationGoals}}`);

  assert.equal(this.$('.donation-goal').length, 2, 'Renders correct number of donation-goal components');
  assert.equal(this.$('.donation-goal-edit').length, 1, 'Renders correct number of donation-goal-edit components');
});

test('it sets subcomponent to edit when clicking an edit link', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: false })
  ];

  this.set('donationGoals', mockGoals);

  this.render(hbs`{{donation-goals donationGoals=donationGoals}}`);

  assert.equal(this.$('.donation-goal').length, 1, 'Subcomponent is in view mode');
  this.$('.edit').click();
  assert.equal(this.$('.donation-goal-edit').length, 1, 'Subcomponent is in edit mode');
});

test('it sets subcomponent to view mode when cancel button is clicked', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('donationGoals', mockGoals);

  this.render(hbs`{{donation-goals donationGoals=donationGoals}}`);

  assert.equal(this.$('.donation-goal-edit').length, 1, 'Subcomponent is in view mode');
  this.$('.cancel').click();
  assert.equal(this.$('.donation-goal').length, 1, 'Subcomponent is in edit mode');
});

test('it sends "save" action with donation goal as parameter when save button is clicked', function(assert) {
  assert.expect(3);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('donationGoals', mockGoals);

  this.set('saveHandler', (donationGoal) => {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  });

  this.render(hbs`{{donation-goals donationGoals=donationGoals save=(action saveHandler)}}`);

  assert.equal(this.$('.donation-goal-edit').length, 1, 'Subcomponent is in view mode');
  this.$('.save').click();
  assert.equal(this.$('.donation-goal').length, 1, 'Subcomponent is in edit mode');
});

