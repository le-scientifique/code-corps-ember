import Ember from 'ember';
import { CanMixin } from 'ember-can';

const {
  get,
  Route,
  RSVP
} = Ember;

/**
 * `project.settings.donations`
 *
 * Route used by organization owners to manage
 * donation goals for an organization project
 *
 * Allows creating new and editing existing donation goals,
 * as well as turning on donations for a project (work in progress)
 *
 * @class   Ember.Route
 * @module  Route
 * @extends Ember.Route
 */
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

  /**
   * An Ember.Route hook
   *
   * Returns a promise hash, meaning hooks that follow the model hook will wait until
   * all promises in the hash resolve
   *
   * @return {RSVP.hash} A promise hash consisting of a project and a stripeAuth record, once resolved
   */
  model() {
    let project = this.modelFor('project');
    let stripeAuth = get(this, 'store').queryRecord('stripe-auth', { projectId: project.id });

    // the project is not actually a promise, but an actual record instead.
    // However, RSVP.hash knows how to deal with that.
    return RSVP.hash({ project, stripeAuth });
  },

  /**
   * An Ember.Route hook
   *
   * If the loaded project has no donation goals, the route
   * should assume the user is here in order to add one.
   *
   * This hook immediately initializes a new donation goal in that case.
   *
   * @method afterModel
   * @param  {DS.Model} modelHash.project The currently loaded project
   */
  afterModel({ project }) {
    if (project.get('donationGoals.length') == 0) {
      this._addNewDonationGoal(project);
    }
  },

  /**
   * An Ember.Route hook
   *
   * Simply assings the project and stripeAuth models as
   * controller properties.
   *
   * @method setupController
   * @param  {Ember.Controller} controller
   * @param  {DS.Model} modelHash.project    The currently loaded project
   * @param  {DS.Model} modelHash.stripeAuth The stripeAuth record, for the current project
   */
  setupController(controller, { project, stripeAuth }) {
    controller.setProperties({ project, stripeAuth });
  },

  /**
   * Initializes a new donationGoal record for the project and
   * sets it to edit mode.
   *
   * @private
   * @param {DS.Model} project The project to initialize the new donationGoal record for
   */
  _addNewDonationGoal(project) {
    let newDonationGoal = project.get('donationGoals').createRecord();
    newDonationGoal.set('isEditing', true);
  },

  actions: {
    /**
     * Action which calls to initialize a new donation goal record
     * for the current project.
     *
     * Triggered when user clicks a button to add a new donation goal
     *
     * @method addDonationGoal
     */
    addDonationGoal(project) {
      this._addNewDonationGoal(project);
    },

    /**
     * Action which switches a donation goal from edit to view mode
     * If the donation goal is a new, unsaved record, it will be destroyed.
     *
     * Triggered when user clicks the cancel button,
     * when editing or adding a donation goal.
     *
     * @method cancelDonationGoal
     * @param  {DS.Model} donationGoal A donation goal record
     */
    cancelDonationGoal(donationGoal) {
      if (donationGoal.get('isNew')) {
        donationGoal.destroyRecord();
      }
    },

    /**
     * Action which commits changes to a donation goal.
     *
     * Triggers when user clicks the save button while edditing or
     * adding a new donation goal.
     *
     * @method saveDonationGoal
     * @param  {DS.Model} donationGoal An unmodified or new donation goal record
     * @param  {Object}   properties   A hash consisting of donation goal properties to update and save
     */
    saveDonationGoal(donationGoal, properties) {
      donationGoal.setProperties(properties);
      donationGoal.save();
    }
  }
});
