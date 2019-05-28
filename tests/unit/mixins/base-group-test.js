import EmberObject from '@ember/object';
import BaseGroupMixin from '@gavant/ember-shopify-draggable/mixins/base-group';
import { module, test } from 'qunit';

module('Unit | Mixin | base-group', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let BaseGroupObject = EmberObject.extend(BaseGroupMixin);
    let subject = BaseGroupObject.create();
    assert.ok(subject);
  });
});
