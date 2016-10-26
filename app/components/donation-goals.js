import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['donation-goals'],

  actions: {
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
