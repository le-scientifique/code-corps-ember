import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import projectDonationGoalsPage from '../pages/project/donation-goals';

moduleForAcceptance('Acceptance | Project Donation Goals');

test('it renders existing donation goals', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  server.createList('donation-goal', 3, { project });
  server.createList('donation-goal', 2);

  projectDonationGoalsPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(projectDonationGoalsPage.donationGoals().count, 3, 'All project donation goals are rendered');
  });
});

test('it sets up a new unsaved donation goal if there are no donation goals, which can be added', function(assert) {
  assert.expect(4);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;

  projectDonationGoalsPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(projectDonationGoalsPage.editedDonationGoals().count, 1, 'A single edited donation goal form is rendered');
    let form = projectDonationGoalsPage.editedDonationGoals(0);

    form.amount(200);
    form.description('Lorem ipsum');
    form.clickSave();
  });

  andThen(() => {
    assert.equal(projectDonationGoalsPage.donationGoals().count, 1, 'A single donation goal is rendered.');
    assert.equal(server.schema.donationGoals.all().models.length, 1, 'Donation goal has been saved.');
    assert.ok(server.schema.donationGoals.findBy({ amount: 200, description: 'Lorem ipsum' }), 'Attributes have been saved properly');
  });
});

test('it is possible to add a donation goal when donation goals already exists', function(assert) {
  assert.expect(3);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  server.createList('donation-goal', 1, { project });

  projectDonationGoalsPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectDonationGoalsPage.clickAddNew();
    let form = projectDonationGoalsPage.editedDonationGoals(0);

    form.amount(200);
    form.description('Lorem ipsum');
    form.clickSave();
  });

  andThen(() => {
    assert.equal(projectDonationGoalsPage.donationGoals().count, 2, 'Both donation goals are rendered.');
    assert.equal(server.schema.donationGoals.all().models.length, 2, 'Donation goal has been saved.');
    assert.ok(server.schema.donationGoals.findBy({ amount: 200, description: 'Lorem ipsum' }), 'Attributes have been saved properly');
  });
});

test('it allows editing of existing donation goals', function(assert) {
  assert.expect(3);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  server.createList('donation-goal', 1, { project });

  projectDonationGoalsPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectDonationGoalsPage.donationGoals(0).clickEdit();

    let form = projectDonationGoalsPage.editedDonationGoals(0);
    form.amount(200);
    form.description('Lorem ipsum');
    form.clickSave();
  });

  andThen(() => {
    assert.equal(projectDonationGoalsPage.donationGoals().count, 1, 'A single donation goal is rendered.');
    assert.equal(server.schema.donationGoals.all().models.length, 1, 'Donation goal has been saved as update.');
    assert.ok(server.schema.donationGoals.findBy({ amount: 200, description: 'Lorem ipsum' }), 'Attributes have been saved properly');
  });
});

test('cancelling edit of an unsaved new goal removes that goal from the list', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  server.createList('donation-goal', 1, { project });

  projectDonationGoalsPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectDonationGoalsPage.clickAddNew();

    let form = projectDonationGoalsPage.editedDonationGoals(0);
    form.clickCancel();
  });

  andThen(() => {
    assert.equal(projectDonationGoalsPage.donationGoals().count, 1, 'New goal is not rendered anymore.');
  });
});

test('cancelling edit of an unsaved existing goal keeps that goal in the list', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  server.createList('donation-goal', 1, { project });

  projectDonationGoalsPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectDonationGoalsPage.donationGoals(0).clickEdit();

    let form = projectDonationGoalsPage.editedDonationGoals(0);
    form.clickCancel();
  });

  andThen(() => {
    assert.equal(projectDonationGoalsPage.donationGoals().count, 1, 'Existing goal is still rendered.');
  });
});
