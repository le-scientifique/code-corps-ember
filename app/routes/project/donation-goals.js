import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.modelFor('project');
  },

  setupController(controller, project) {
    if (project.get('donationGoals.length') == 0) {
      this._addNewDonationGoal(project);
    }

    controller.set('project', project);
  },

  _addNewDonationGoal(project) {
    let newDonationGoal = project.get('donationGoals').createRecord();
    newDonationGoal.set('isEditing', true);
  },

  actions: {
    addDonationGoal(project) {
      this._addNewDonationGoal(project);
    },

    cancelDonationGoal(donationGoal) {
      if (donationGoal.get('isNew')) {
        donationGoal.destroyRecord();
      }
    },

    saveDonationGoal(donationGoal, properties) {
      donationGoal.setProperties(properties);
      donationGoal.save();
    }
  }
});
