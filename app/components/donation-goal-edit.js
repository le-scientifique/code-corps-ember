import Ember from 'ember';

const {
  Component
} = Ember;

/**
 * `donation-goal-edit` used to edit new and existing donation goals
 *
 * ## default usage
 *
 * ```handlebars
 * {{donation-goal-edit
 *   amount=donationGoal.amount
 *   description=donationGoal.description
 *   isNew=donationGoal.isNew
 *   cancel=(action externalCancelHandler)
 *   save=(action externalSaveHandler donationGoal)}}
 *
 * Used as above, the `externalSaveHandler` will receive a call with the actual
 * `donationGoal` model as the first argument, and the properties set via the
 * component as the second argument.
 *
 * Likewise, the `externalCancelHandler` will recieve a call with the
 * `donationGoal` as the first and only argument.
 *
 * @class donation-goal-edit
 * @module  Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['donation-goal-edit'],

  /**
   * Indicates if the donation goal being edited is a new or existing record
   * Depending on that, the user interface will differ.
   * New records will have a "create" button
   * Existing records will have "cancel" and "save" button
   *
   * @property isNew
   * @type {Boolean}
   */
  isNew: false,

  actions: {
    /**
     * Action that simply sends a `cancel` action outwards, to the parent
     * container.
     *
     * Fired when user clicks the "Cancel" button
     *
     * @method cancel
     */
    cancel() {
      this.sendAction('cancel');
    },

    /**
     * Action that collects the `amount` and `description` properties and
     * sends them as a `save` action to the parent controller.
     *
     * Fired when a user clicks the "Save" or "Create" button.
     *
     * @method save
     */
    save() {
      let values = this.getProperties('amount', 'description');
      this.sendAction('save', values);
    }
  }
});
