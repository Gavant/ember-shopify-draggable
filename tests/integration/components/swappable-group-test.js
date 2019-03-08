import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { clickMouse, moveMouse, releaseMouse, waitFor } from '../../helpers/mouse-events';

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
                as |container|
            }}
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
                as |container|
            }}
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

  test('Dragging items fires actions', async function(assert) {
    assert.expect(2);

    this.set('itemReorderedAction', () => { assert.ok(true, 'itemReordered action fired'); });
    this.set('swappedAction', () => { assert.ok(true, 'swapped action fired'); });

    this.set('list', A([
        { name: "Item 1" },
        { name: "Item 2" }
    ]));

    await render(hbs`
        {{#swappable-group delay=0 swappable=swappable swapped=(action swappedAction) as |group|}}
            {{#group.container list
                itemReordered=(action itemReorderedAction)
                as |container|
            }}
                    {{#each container.items as |item index|}}
                        {{#container.item item index=index}}
                            {{item.name}}
                        {{/container.item}}
                    {{/each}}
            {{/group.container}}
        {{/swappable-group}}`
    );

    const origItems = this.element.querySelectorAll('.swappable-item');
    const origFirstItem = origItems[0];
    const origSecondItem = origItems[1];

    run(this, async () => {
        clickMouse(origFirstItem);
        await waitFor(1);
        moveMouse(origSecondItem);
        releaseMouse(this.get('swappable.source'));
    });
  });

  test('Dragging items swap them', async function(assert) {
    assert.expect(3);

    this.set('list', A([
        { name: "Item 1" },
        { name: "Item 2" }
    ]));

    await render(hbs`
        {{#swappable-group delay=0 swappable=swappable as |group|}}
            {{#group.container list
                itemReordered=(action (mut list))
                as |container|
            }}
                    {{#each container.items as |item index|}}
                        {{#container.item item index=index}}
                            {{item.name}}
                        {{/container.item}}
                    {{/each}}
            {{/group.container}}
        {{/swappable-group}}`
    );

    const origItems = this.element.querySelectorAll('.swappable-item');
    const origFirstItem = origItems[0];
    const origSecondItem = origItems[1];
    const origFirstItemText = origFirstItem.textContent.trim();
    const origSecondItemText = origSecondItem.textContent.trim();

    run(this, async () => {
        clickMouse(origFirstItem);
        await waitFor(1);
        moveMouse(origSecondItem);
        releaseMouse(this.get('swappable.source'));

        const newItems = this.element.querySelectorAll('.swappable-item');
        const newFirstItemText = newItems[0].textContent.trim();
        const newSecondItemText = newItems[1].textContent.trim();

        assert.equal(origFirstItemText, newSecondItemText, 'the first item is now the second item in the DOM');
        assert.equal(origSecondItemText, newFirstItemText, 'the second item is now the first item in the DOM');
        assert.equal(this.get('list.firstObject.name'), 'Item 2', 'the original list array has been updated');
    });
  });
});
