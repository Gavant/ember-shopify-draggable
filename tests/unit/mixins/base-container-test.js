import EmberObject from '@ember/object';
import BaseContainerMixin from 'ember-shopify-draggable/mixins/base-container';
import { module, test } from 'qunit';

module('Unit | Mixin | base-container', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let BaseContainerObject = EmberObject.extend(BaseContainerMixin);
    let subject = BaseContainerObject.create();
    assert.ok(subject);
  });
});
