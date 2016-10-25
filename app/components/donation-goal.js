import Ember from 'ember';

const {
  Component
} = Ember;

/**
 * `donation-goal` used to display information about a donation goal
 *
 * ## default usage
 *
 * ```handlebars
 * {{donation-goal
 *   donationGoal=donationGoal
 *   edit=(action externalEditHandler donationGoal)}}
 *
 * Used as above, the `externalEditHandler` will receive a call
 * with the `donationGoal` as the first and only argument.
 *
 * @class donation-goal
 * @module Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['donation-goal'],

  actions: {
    /**
     * Action which simply sends an `edit` action outwards, to the parent
     * container.
     *
     * Fired when user clicks on the "Edit" link.
     *
     * @method edit
     */
    edit() {
      this.sendAction('edit');
    }
  }
});
