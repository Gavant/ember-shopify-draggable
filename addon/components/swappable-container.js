import Component from '@ember/component';
import layout from '../templates/components/swappable-container';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { trySet } from '@ember/object';
import { next } from '@ember/runloop';

export default Component.extend({
    layout,
    classNames: ['swappable-container'],
    actions: {
        dragStart(item, index) {
            trySet(this, 'group.dragItem', {
                item, index
            });
        },
        swapped(item, index, container) {
            trySet(this, 'group.swappedItem', {
                item, index, container
            });
        }
    },
    didInsertElement() {
        this._super(...arguments);
        get(this, 'group.swappable').addContainer(this.element);
        get(this, 'group.swappable').on('drag:stop',() => {
            next(this, () => {
                const scheduleReplaceEvent = get(this, 'scheduleReplace');
                if (scheduleReplaceEvent) {
                    const items = get(scheduleReplaceEvent, 'items');
                    items.replace(get(scheduleReplaceEvent, 'index'), 1, [get(scheduleReplaceEvent, 'item')]);
                    tryInvoke(this, 'itemAdded', [items, get(scheduleReplaceEvent, 'item'), event]);
                    trySet(this, 'scheduleReplace', null);
                }
                trySet(this, 'group.dragItem', null);
                trySet(this, 'group.swappedItem', null);
            });
        });
        get(this, 'group.swappable').on('swappable:stop', (event) => {
            if (this.element) {
                const items = A(get(this, 'items').toArray());
                const targetContainer = get(this, 'group.swappedItem.container');
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
                }
                // else if (this.element.isSameNode(targetContainer)) { // added to this container
                //     set(this, 'scheduleReplace', {
                //         items,
                //         index: itemSwappedIndex,
                //         item: itemMoved
                //     });
                // } else if (this.element.isSameNode(oldContainer)) { // removed from this container
                //     set(this, 'scheduleReplace', {
                //         items,
                //         index: itemMovedIndex,
                //         item: itemSwapped
                //     });
                // }
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
