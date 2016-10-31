import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['donation-goals'],

  hasExistingDonationGoals: computed.gt('existingDonationGoals', 0),
  existingDonationGoals: computed.setDiff('project.donationsGoals', 'newDonationGoals'),
  newDonationGoals: computed.filterBy('project.donationGoals', 'isNew'),

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
