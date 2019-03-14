import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | droppable-dropzone', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#droppable-dropzone}}
        template block text
      {{/droppable-dropzone}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
