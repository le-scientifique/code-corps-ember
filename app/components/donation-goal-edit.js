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
 *   cancellable=externalCancellableFlag
 *   description=donationGoal.description
 *   cancel=(action externalCancelHandler)
 *   isNew=donationGoal.isNew
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
   * Indicates if "cancel" button should render.
   *
   * Cancel button should only render if one of two cases
   * - the record is already persisted and we are simply editing it
   * - the record is new, but there are other persisted records, so cancelling this one
   *   does not mean there will be no persisted records at all
   *
   * @property canCancel
   * @type {Boolean}
   */
  canCancel: false,

  /**
   * Indicates if the donation goal being edited is a new or existing record
   * Depending on that, the user interface will differ.
   * New records will have a "create" button
   * Existing records will have a "save" button
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
