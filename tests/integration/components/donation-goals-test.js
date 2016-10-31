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

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.donation-goal').length, 3, 'Renders correct number of donation-goal components');
});

test('it renders the correct number of subcomponents in view or edit mode', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: false }),
    Object.create({ isEditing: true }),
    Object.create({ isEditing: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.donation-goal').length, 2, 'Renders correct number of donation-goal components');
  assert.equal(this.$('.donation-goal-edit').length, 1, 'Renders correct number of donation-goal-edit components');
});

test('it sets subcomponent to edit when clicking an edit link', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.donation-goal').length, 1, 'Subcomponent is in view mode');
  this.$('.edit').click();
  assert.equal(this.$('.donation-goal-edit').length, 1, 'Subcomponent is in edit mode');
});

test('it sets subcomponent to view mode when cancel button is clicked', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.donation-goal-edit').length, 1, 'Subcomponent is in edit mode');
  this.$('.cancel').click();
  assert.equal(this.$('.donation-goal').length, 1, 'Subcomponent is in view mode');
});

test('it sends "save" action with donation goal as parameter when save button is clicked', function(assert) {
  assert.expect(3);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.set('saveHandler', (donationGoal) => {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  });

  this.render(hbs`{{donation-goals project=project save=(action saveHandler)}}`);

  assert.equal(this.$('.donation-goal-edit').length, 1, 'Subcomponent is in view mode');
  this.$('.save').click();
  assert.equal(this.$('.donation-goal').length, 1, 'Subcomponent is in edit mode');
});

test('it sends "cancel" action with donation goal as parameter when cancel button is clicked', function(assert) {
  assert.expect(3);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.set('cancelHandler', (donationGoal) => {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  });

  this.render(hbs`{{donation-goals project=project cancel=(action cancelHandler)}}`);

  assert.equal(this.$('.donation-goal-edit').length, 1, 'Subcomponent is in view mode');
  this.$('.cancel').click();
  assert.equal(this.$('.donation-goal').length, 1, 'Subcomponent is in edit mode');
});

test('it does not allow cancelling an edited record if that record is the only one, and new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: true })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.cancel').length, 0, 'No cancel button is rendered');
});

test('it allows cancelling an edited record if that record is the only one and not new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.cancel').length, 1, 'Cancel button is rendered');
});

test('it allows cancelling an edited record if that record new, but there are other persisted goals', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: true }),
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.cancel').length, 1, 'Cancel button is rendered');
});

test('it only allows editing a single record at a time', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false }),
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.edit').length, 0, 'A record is being edited, so no other record can be edited');
});

test('it does not allow adding a record if a record is being edited', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));
  this.render(hbs`{{donation-goals project=project}}`);
  assert.equal(this.$('.add').length, 0, 'A record is being edited, so no other record can be added');
});

test('it does not allow adding a record if a record is being added', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: true })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));
  this.render(hbs`{{donation-goals project=project}}`);
  assert.equal(this.$('.add').length, 0, 'A record is being added, so no other record can be added');
});

test('it does not allow adding a record if a record is being added', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));
  this.render(hbs`{{donation-goals project=project}}`);
  assert.equal(this.$('.add').length, 1, 'No record is being added or edited, so a new record can be added');
});

test('it allows activating donations if there are persisted records', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.activate-donations').length, 1, 'The "activate donations" button is rendered');
});

test('it prevents activating donations if there are no persisted records', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: true })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals project=project}}`);

  assert.equal(this.$('.activate-donations').length, 0, 'The "activate donations" button is not rendered');
});
