import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

/**
 * `donation-goals` used to display and manage a project's donation goals
 *
 * ## default usage
 *
 * {{donation-goals
 *   add='addActionHandler'
 *   cancel='cancelActionHandler'
 *   project=project
 *   save='saveActionHandler'}}
 *
 * Used as above, the external container, probably a route
 * will receive the 'add', 'save' and 'cancel' actions respectively,
 * with the proper arguments.
 *
 * @class   donation-goals
 * @module  Component
 * @extends EmberComponent
 */
export default Component.extend({
  classNames: ['donation-goals'],

  /**
   * Indicates if the user can add a new donation goal.
   *
   * This is possible if no other donation goal
   * is currently being added or edited.
   *
   * @property canAdd
   * @type {Boolean}
   */
  canAdd: computed.not('_currentlyEditingDonationGoals'),

  /**
   * Indicates if the user can activate donations for this project.
   *
   * This is possible if at least one donation goal has been added.
   *
   * @property canActivateDonations
   * @type {Boolean}
   */
  canActivateDonations: computed.alias('_hasExistingDonationGoals'),

  /**
   * Indicates if the user can cancel adding or editing a donation goal.
   *
   * This is possible if there is already a saved donation goal present.
   *
   * @property canCancel
   * @type {Boolean}
   */
  canCancel: computed.alias('_hasExistingDonationGoals'),

  /**
   * Indicates if the user can start editing a donation goal.
   *
   * This is possible if no other donation goal
   * is currently being added or edited.
   *
   * @property canEdit
   * @type {Boolean}
   */
  canEdit: computed.not('_currentlyEditingDonationGoals'),

  _currentlyEditingDonationGoals: computed.notEmpty('_editedDonationGoals'),
  _editedDonationGoals: computed.filterBy('project.donationGoals', 'isEditing'),
  _existingDonationGoals: computed.setDiff('project.donationGoals', '_newDonationGoals'),
  _hasExistingDonationGoals: computed.notEmpty('_existingDonationGoals'),
  _newDonationGoals: computed.filterBy('project.donationGoals', 'isNew'),

  actions: {
    /**
     * Action which simply sends an 'add' action outwards, with the
     * project as an argument.
     *
     * Allows the external handler to potentially push a new donation goal
     * record into the project's collection.
     *
     * @method add
     */
    add(project) {
      this.sendAction('add', project);
    },

    /**
     * Action which switches the donation goal from edit to view mode.
     *
     * It also sends an 'edit' action outwards, so an external handler can
     * perform any additional work, such as, for example, removing an unpersisted
     * record from the project's collection.
     *
     * @method cancel
     */
    cancel(donationGoal) {
      donationGoal.set('isEditing', false);
      this.sendAction('cancel', donationGoal);
    },

    /**
     * Action which switches a donation goal from view to edit mode.
     *
     * @method edit
     */
    edit(donationGoal) {
      donationGoal.set('isEditing', true);
    },

    /**
     * Action which switches a donation from edit to view mode.
     *
     * Addtionally, it sends a 'save' action outwards, so an external handler
     * can commit any changes to the donation goal.
     *
     * @method save
     */
    save(donationGoal) {
      donationGoal.set('isEditing', false);
      this.sendAction('save', donationGoal);
    }
  }
});
