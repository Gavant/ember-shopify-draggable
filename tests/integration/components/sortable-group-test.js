import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

module('Integration | Component | sortable-group', function(hooks) {
  setupRenderingTest(hooks);

  test('Renders else block if no items given', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('list', A());
    await render(hbs`
        {{#sortable-group as |group|}}
            {{#group.container list
                itemReordered=(action (mut list))
                itemAdded=(action (mut list))
                itemRemoved=(action (mut list)) as |container|}}
                {{#each container.items as |item|}}
                    {{#container.item item}}
                        {{item.name}}
                    {{/container.item}}
                {{else}}
                    Im Empty
                {{/each}}
            {{/group.container}}
        {{/sortable-group}}`
    );

    assert.equal(this.element.textContent.trim(), 'Im Empty');
  });

  test('Renders list items', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('list', A([
        { name: "Item 1" }
    ]));
    await render(hbs`
        {{#sortable-group as |group|}}
            {{#group.container list
                itemReordered=(action (mut list))
                itemAdded=(action (mut list))
                itemRemoved=(action (mut list)) as |container|}}
                {{#each container.items as |item|}}
                    {{#container.item item}}
                        {{item.name}}
                    {{/container.item}}
                {{else}}
                    Im Empty
                {{/each}}
            {{/group.container}}
        {{/sortable-group}}`
    );

    assert.equal(this.element.textContent.trim(), 'Item 1');
  });
});
