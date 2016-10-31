import Ember from 'ember';
import { CanMixin } from 'ember-can';

const {
  get,
  Route
} = Ember;

export default Route.extend(CanMixin, {
  /**
   * An Ember.Route hook
   *
   * Managing donation goals is for owners only, unlike managing
   * organizations generally, which is also allowed for admins.
   *
   * The hook ensures the user is able to manage organization goals.
   *
   * @method beforeModel
   */
  beforeModel() {
    if (this.cannot('manage donation goals in project')) {
      return this.transitionTo('project');
    } else {
      return this._super(...arguments);
    }
  },

  model() {
    return this.modelFor('project');
  },

  afterModel(model) {
    get(this, 'store').queryRecord('stripe-auth', {
      projectId: model.id
    }).then((result) => {
      this.controller.set('stripeAuth', result);
    });
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
