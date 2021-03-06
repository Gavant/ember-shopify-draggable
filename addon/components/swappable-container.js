import Component from '@ember/component';
import layout from '../templates/components/swappable-container';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { trySet } from '@ember/object';
import { next } from '@ember/runloop';
import BaseContainerMixin from '../mixins/base-container';

export default Component.extend(BaseContainerMixin, {
    layout,
    classNames: ['swappable-container'],
    _dragStop() {
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
    },
    _swappableStop(event) {
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
    },
    init(){
        this._super(...arguments);
        if(get(this, 'group')) {
            get(this, 'group').on('drag:stop', this, '_dragStop');
            get(this, 'group').on('swappable:stop', this, '_swappableStop');
        }
    },
    willDestroyElement() {
        if(get(this, 'group')) {
            get(this, 'group').off('drag:stop', this, '_dragStop');
            get(this, 'group').off('swappable:stop', this, '_swappableStop');
        }
        this._super(...arguments);
    },
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
    }
}).reopenClass({
    positionalParams: ['items']
});
