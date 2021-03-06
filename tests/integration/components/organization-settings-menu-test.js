import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

const { Object } = Ember;

moduleForComponent('organization-settings-menu', 'Integration | Component | organization settings menu', {
  integration: true
});

test('when authenticated and can manage organization, it renders properly', function(assert) {
  assert.expect(2);

  let organization = Object.create({ id: 1 });
  let membership = Object.create({
    isAdmin: true,
    organization
  });

  stubService(this, 'session', { isAuthenticated: true });
  stubService(this, 'credentials', { currentUserMembership: membership });

  this.set('organization', organization);

  this.render(hbs`{{organization-settings-menu organization=organization}}`);

  assert.equal(this.$('.organization-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('li a:contains("Organization Profile")').length, 1, 'The organization profile link renders');
});

test('when authenticated and cannot manage organization, it renders properly', function(assert) {
  assert.expect(2);

  let organization = Object.create({ id: 1 });
  let membership = Object.create({ isAdmin: false, organization });

  stubService(this, 'session', { isAuthenticated: true });
  stubService(this, 'credentials', { currentUserMembership: membership });

  this.set('organization', organization);

  this.render(hbs`{{organization-settings-menu organization=organization}}`);

  assert.equal(this.$('.organization-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('li a:contains("Organization Profile")').length, 0, 'The organization profile link does not render');
});

test('when not authenticated, it renders properly', function(assert) {
  assert.expect(2);

  let organization = Object.create({ id: 1 });

  stubService(this, 'session', { isAuthenticated: false });

  this.set('organization', organization);

  this.render(hbs`{{organization-settings-menu organization=organization}}`);

  assert.equal(this.$('.organization-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('li a:contains("Organization Profile")').length, 0, 'The organization profile link does not render');
});
