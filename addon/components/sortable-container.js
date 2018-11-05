import Component from '@ember/component';
import layout from '../templates/components/sortable-container';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { next } from '@ember/runloop';
import { trySet } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['sortable-container'],
    items: null,
    didInsertElement() {
        this._super(...arguments);
        get(this, 'group.sortable').addContainer(this.element);
        get(this, 'group.sortable').on('drag:stop',() => {
            next(this, () => {
                const items = get(this, 'items');
                const scheduleAddEvent = get(this, 'scheduleAdd');
                if (scheduleAddEvent) {
                    const element = document.getElementById(get(this, 'scheduleAdd.dragNode.id'));
                    element.parentNode.removeChild(element);
                    items.insertAt(get(scheduleAddEvent, 'targetIndex'), get(scheduleAddEvent, 'item'));
                    tryInvoke(this, 'itemAdded', [items, get(scheduleAddEvent, 'item'), event]);
                    trySet(this, 'scheduleAdd', null);
                }
                trySet(this, 'group.dragItem', null);
            });
        });
        get(this, 'group.sortable').on('sortable:stop', (event) => {
            if (this.element) {
                const items = A(get(this, 'items').toArray());
                const targetContainer = get(event, 'data.newContainer');
                const targetIndex = get(event, 'data.newIndex');
                const oldContainer = get(event, 'data.oldContainer');
                const oldIndex = get(event, 'data.oldIndex');
                const item = get(this, 'group.dragItem');
                //Sorted within this container
                if (this.element.isSameNode(targetContainer) && this.element.isSameNode(oldContainer)) {
                    items.removeAt(oldIndex, 1);
                    items.insertAt(targetIndex, item);
                    tryInvoke(this, 'itemReordered', [items, item, event]);
                } else if (this.element.isSameNode(targetContainer)) { // added to this container
                    //schedule the update to the items array until after we can remove the dragged node. This gives ember the ability to update correctly
                    set(this, 'scheduleAdd', {
                        targetIndex,
                        item,
                        dragNode: get(event, 'data.dragEvent.source')
                    });
                } else if (this.element.isSameNode(oldContainer)) { // removed from this container
                    items.removeAt(oldIndex, 1);
                    tryInvoke(this, 'itemRemoved', [items, item, event]);
                }
            }
        });
    },
    willDestroyElement() {
        this._super(...arguments);
        get(this, 'group.sortable').removeContainer(this.element);
    },
    actions: {
        dragStart(item) {
            trySet(this, 'group.dragItem', item);
        }
    }
}).reopenClass({
    positionalParams: ['items']
});
