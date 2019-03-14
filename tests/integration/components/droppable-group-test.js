import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | droppable-group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#droppable-group}}
        template block text
      {{/droppable-group}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
