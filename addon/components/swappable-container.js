import Component from '@ember/component';
import layout from '../templates/components/swappable-container';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { trySet } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['swappable-container'],
    actions: {
        dragStart(item, index) {
            trySet(this, 'group.dragItem', {
                item, index
            });
        },
        swapped(item, index) {
            trySet(this, 'group.swappedItem', {
                item, index
            });
        }
    },
    didInsertElement() {
        this._super(...arguments);
        get(this, 'group.swappable').addContainer(this.element);
        set(this, 'initialItems', get(this, 'items').slice(0));
        get(this, 'group.swappable').on('swappable:swapped', (event) => {
            if (this.element) {
                const items = A(get(this, 'items').toArray());
                const targetContainer = get(event, 'data.dragEvent.data.overContainer');
                const oldContainer = get(event, 'data.dragEvent.data.sourceContainer');
                const itemMovedIndex = get(this, 'group.dragItem.index');
                const itemMoved = get(this, 'group.dragItem.item');
                const itemSwappedIndex = get(this, 'group.swappedItem.index');
                const itemSwapped = get(this, 'group.swappedItem.item');
                //Sorted within this container
                if (this.element.isSameNode(targetContainer) && this.element.isSameNode(oldContainer)) {
                    items.replace(itemSwappedIndex, 1, [itemMoved]);
                    items.replace(itemMovedIndex, 1, [itemSwapped]);
                    tryInvoke(this, 'itemReordered', [items, itemMoved, event]);
                } else if (this.element.isSameNode(targetContainer)) { // added to this container
                    items.replace(itemSwappedIndex, 1, [itemMoved]);
                    tryInvoke(this, 'itemAdded', [items, itemMoved, event]);
                } else if (this.element.isSameNode(oldContainer)) { // removed from this container
                    items.replace(itemMovedIndex, 1, [itemSwapped]);
                    tryInvoke(this, 'itemRemoved', [items, itemMoved, event]);
                }
            }
        });
    },
    willDestroyElement() {
        this._super(...arguments);
        get(this, 'group.swappable').removeContainer(this.element);
    },
}).reopenClass({
    positionalParams: ['items']
});
