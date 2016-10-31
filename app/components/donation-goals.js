import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['donation-goals'],

  canAdd: computed.not('currentlyEditingDonationGoals'),
  canCancel: computed.alias('hasExistingDonationGoals'),
  canEdit: computed.not('currentlyEditingDonationGoals'),
  currentlyEditingDonationGoals: computed.notEmpty('isEditingDonationGoals'),
  existingDonationGoals: computed.setDiff('project.donationGoals', 'newDonationGoals'),
  hasExistingDonationGoals: computed.notEmpty('existingDonationGoals'),
  isEditingDonationGoals: computed.filterBy('project.donationGoals', 'isEditing'),

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
