import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | draggable-group', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        // Template block usage:
        await render(hbs`
            {{#draggable-group as |group|}}
                {{#group.container as |container|}}
                    {{#container.item}}Item 1{{/container.item}}
                {{/group.container}}
            {{/draggable-group}}
        `);

        assert.equal(this.element.textContent.trim(), 'Item 1');
    });
});
