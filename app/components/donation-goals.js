import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['donation-goals'],

  canAdd: computed.not('_currentlyEditingDonationGoals'),
  canActivateDonations: computed.alias('_hasExistingDonationGoals'),
  canCancel: computed.alias('_hasExistingDonationGoals'),
  canEdit: computed.not('_currentlyEditingDonationGoals'),

  _currentlyEditingDonationGoals: computed.notEmpty('_editedDonationGoals'),
  _editedDonationGoals: computed.filterBy('project.donationGoals', 'isEditing'),
  _existingDonationGoals: computed.setDiff('project.donationGoals', '_newDonationGoals'),
  _hasExistingDonationGoals: computed.notEmpty('_existingDonationGoals'),
  _newDonationGoals: computed.filterBy('project.donationGoals', 'isNew'),

  actions: {
    add(project) {
      this.sendAction('add', project);
    },

    cancel(donationGoal) {
      donationGoal.set('isEditing', false);
      this.sendAction('cancel', donationGoal);
    },

    edit(donationGoal) {
      donationGoal.set('isEditing', true);
    },

    save(donationGoal) {
      donationGoal.set('isEditing', false);
      this.sendAction('save', donationGoal);
    }
  }
});
