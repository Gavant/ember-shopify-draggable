import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { clickMouse, moveMouse, releaseMouse, waitFor } from '../../helpers/mouse-events';

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
                itemRemoved=(action (mut list))
                as |container|
            }}
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

  test('Reordering items triggers actions', async function(assert) {
      assert.expect(2);

      this.set('itemReorderedAction', () => { assert.ok(true, 'itemReordered action fired'); });
      this.set('sortedAction', () => { assert.ok(true, 'sorted action fired'); });

      this.set('list', A([
          { name: "Item 1" },
          { name: "Item 2" }
      ]));

      await render(hbs`
          {{#sortable-group delay=0 sortable=sortable sorted=(action sortedAction) as |group|}}
              {{#group.container list
                  itemReordered=(action itemReorderedAction)
                  as |container|
              }}
                  {{#each container.items as |item|}}
                      {{#container.item item}}
                          {{item.name}}
                      {{/container.item}}
                  {{/each}}
              {{/group.container}}
          {{/sortable-group}}`
      );

      const items = this.element.querySelectorAll('.sortable-item');
      const firstItem = items[0];
      const secondItem = items[1];

      run(this, async () => {
          clickMouse(firstItem);
          //the drag event waits for a configured delay before proceeding
          //so we must wait until that `delay` is elapsed before continuing
          await waitFor(1);
          moveMouse(secondItem);
          releaseMouse(this.get('sortable.source'));
      });
  });

  test('Dragging items between containers triggers actions', async function(assert) {
      assert.expect(2);

      this.set('itemAddedAction', () => { assert.ok(true, 'itemAdded action fired'); });
      this.set('itemRemovedAction', () => { assert.ok(true, 'itemRemoved action fired'); });

      this.set('listOne', A([
          { name: "Item 1" },
          { name: "Item 2" }
      ]));

      this.set('listTwo', A([
          { name: "Item 3" },
          { name: "Item 4" }
      ]));

      await render(hbs`
          {{#sortable-group delay=0 sortable=sortable as |group|}}
              {{#group.container listOne
                  itemAdded=(action itemAddedAction)
                  itemRemoved=(action itemRemovedAction)
                  as |container|
              }}
                  {{#each container.items as |item|}}
                      {{#container.item item}}
                          {{item.name}}
                      {{/container.item}}
                  {{/each}}
              {{/group.container}}
              {{#group.container listTwo
                  itemAdded=(action itemAddedAction)
                  itemRemoved=(action itemRemovedAction)
                  as |container|
              }}
                  {{#each container.items as |item|}}
                      {{#container.item item}}
                          {{item.name}}
                      {{/container.item}}
                  {{/each}}
              {{/group.container}}
          {{/sortable-group}}`
      );

      const items = this.element.querySelectorAll('.sortable-item');
      const firstItem = items[0];
      const thirdItem = items[2];

      run(this, async () => {
          clickMouse(firstItem);
          await waitFor(1);
          moveMouse(thirdItem);
          releaseMouse(this.get('sortable.source'));
      });
  });

  test('Dragging items reorders the list', async function(assert) {
    assert.expect(3);

    this.set('list', A([
        { name: "Item 1" },
        { name: "Item 2" }
    ]));

    await render(hbs`
        {{#sortable-group delay=0 sortable=sortable as |group|}}
            {{#group.container list
                itemReordered=(action (mut list))
                itemAdded=(action (mut list))
                itemRemoved=(action (mut list))
                as |container|
            }}
                {{#each container.items as |item|}}
                    {{#container.item item}}
                        {{item.name}}
                    {{/container.item}}
                {{/each}}
            {{/group.container}}
        {{/sortable-group}}`
    );

    const origItems = this.element.querySelectorAll('.sortable-item');
    const origFirstItem = origItems[0];
    const origSecondItem = origItems[1];
    const origFirstItemText = origFirstItem.textContent.trim();
    const origSecondItemText = origSecondItem.textContent.trim();

    run(this, async () => {
        clickMouse(origFirstItem);
        await waitFor(1);
        moveMouse(origSecondItem);
        releaseMouse(this.get('sortable.source'));

        const newItems = this.element.querySelectorAll('.sortable-item');
        const newFirstItemText = newItems[0].textContent.trim();
        const newSecondItemText = newItems[1].textContent.trim();

        assert.equal(origFirstItemText, newSecondItemText, 'the first item is now the second item in the DOM');
        assert.equal(origSecondItemText, newFirstItemText, 'the second item is now the first item in the DOM');
        assert.equal(this.get('list.firstObject.name'), 'Item 2', 'the original list array has been updated');
    });
  });
});
