import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

module('Integration | Component | swappable-group', function(hooks) {
  setupRenderingTest(hooks);

  test('Renders else block if no items given', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('list', A());
    await render(hbs`
        {{#swappable-group as |group|}}
            {{#group.container list
                itemReordered=(action (mut list))
                itemAdded=(action (mut list))
                itemRemoved=(action (mut list))
                as |container|}}
                    {{#each container.items as |item index|}}
                        {{#container.item item index=index}}
                            {{item.name}}
                        {{/container.item}}
                    {{else}}
                        Im empty
                    {{/each}}
            {{/group.container}}
        {{/swappable-group}}`
    );

    assert.equal(this.element.textContent.trim(), 'Im empty');
  });

  test('Renders list item', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('list', A([
        { name: "Item 1" }
    ]));
    await render(hbs`
        {{#swappable-group as |group|}}
            {{#group.container list
                itemReordered=(action (mut list))
                itemAdded=(action (mut list))
                itemRemoved=(action (mut list))
                as |container|}}
                    {{#each container.items as |item index|}}
                        {{#container.item item index=index}}
                            {{item.name}}
                        {{/container.item}}
                    {{else}}
                        Im empty
                    {{/each}}
            {{/group.container}}
        {{/swappable-group}}`
    );

    assert.equal(this.element.textContent.trim(), 'Item 1');
  });
});
