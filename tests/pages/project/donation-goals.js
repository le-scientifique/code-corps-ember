import {
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable(':organization/:project/donation-goals'),

  donationGoals: collection({
    itemScope: '.donation-goals .donation-goal',
    item: {
      clickEdit: clickable('.edit')
    }
  }),

  editedDonationGoals: collection({
    itemScope: '.donation-goals .donation-goal-edit',
    item: {
      amount: fillable('input[name=amount]'),
      description: fillable('textarea[name=description]'),
      clickSave: clickable('.save'),
      clickCancel: clickable('.cancel')
    }
  }),

  clickAddNew: clickable('.add')
});
