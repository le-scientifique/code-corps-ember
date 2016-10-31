import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed: { alias },
  inject: { service }
} = Ember;

export default Ability.extend({
  credentials: service(),

  _isOwner: alias('_membership.isOwner'),
  _membership: alias('credentials.currentUserMembership'),

  canManageDonationGoals: alias('_isOwner')
});
