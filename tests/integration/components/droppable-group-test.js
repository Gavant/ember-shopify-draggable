import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | droppable-group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
      await render(hbs`
          {{#droppable-group as |group|}}
              {{#group.container as |container|}}
                 {{#container.dropzone as |dropzone|}}
                    {{#dropzone.item}}Item 1{{/dropzone.item}}
                 {{/container.dropzone}}
              {{/group.container}}
          {{/droppable-group}}
      `);

      assert.equal(this.element.textContent.trim(), 'Item 1');
  });
});
