import Component from '@ember/component';
import layout from '../templates/components/sortable-container';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { next } from '@ember/runloop';
import { trySet } from '@ember/object';
import BaseContainerMixin from '../mixins/base-container';

export default Component.extend(BaseContainerMixin, {
    layout,
    classNames: ['sortable-container'],
    items: null,
    _dragStop() {
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
    },
    _sortableStop(event) {
        if (this.element) {
            const items = [...get(this, 'items').toArray()];
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
            } else if (this.element.isSameNode(targetContainer)) {
                // added to this container
                //schedule the update to the items array until after we can remove the dragged node. This gives ember the ability to update correctly
                set(this, 'scheduleAdd', {
                    targetIndex,
                    item,
                    dragNode: get(event, 'data.dragEvent.source')
                });
            } else if (this.element.isSameNode(oldContainer)) {
                // removed from this container
                items.removeAt(oldIndex, 1);
                tryInvoke(this, 'itemRemoved', [items, item, event]);
            }
        }
    },
    didInsertElement() {
        this._super(...arguments);
        //if the element is inserted into the dom and group sortable already exists, we can just add the container to the sortable group
        this.setupContainer();
    },
    init() {
        this._super(...arguments);
        if (get(this, 'group')) {
            get(this, 'group').on('drag:stop', this, '_dragStop');
            get(this, 'group').on('sortable:stop', this, '_sortableStop');
        }
    },
    willDestroyElement() {
        if (get(this, 'group')) {
            get(this, 'group').off('drag:stop', this, '_dragStop');
            get(this, 'group').off('sortable:stop', this, '_sortableStop');
        }
        this._super(...arguments);
    },
    actions: {
        dragStart(item) {
            trySet(this, 'group.dragItem', item);
        }
    }
}).reopenClass({
    positionalParams: ['items']
});
