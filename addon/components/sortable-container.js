import Component from '@ember/component';
import layout from '../templates/components/sortable-container';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { next } from '@ember/runloop';
import { trySet } from '@ember/object';
import Evented from '@ember/object/evented';

export default Component.extend(Evented, {
    layout,
    classNames: ['sortable-container'],
    items: null,
    setupSortableContainer() {
        if(get(this, 'group.sortable')) {
            get(this, 'group.sortable').addContainer(this.element);
        }
    },
    destroySortableContainer() {
        if(get(this, 'group.sortable')) {
            get(this, 'group.sortable').removeContainer(this.element);
        }
    },
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
    },
    didInsertElement() {
        this._super(...arguments);
        //if the element is inserted into the dom and group sortable already exists, we can just add the container to the sortable group
        this.setupSortableContainer();
    },
    init(){
        this._super(...arguments);
        //This event is just for the first setup, when sortable doesn't exist yet. This item will be rendered, and then sortable will be imported.
        //Once sortable is imported we send this event to hook everything up
        get(this, 'group').on('setupContainers', this, 'setupSortableContainer');

        get(this, 'group').on('drag:stop', this, '_dragStop');
        get(this, 'group').on('sortable:stop', this, '_sortableStop');
    },
    willDestroyElement() {
        this._super(...arguments);
        if(get(this, 'group')) {
            get(this, 'group').off('setupContainers', this, 'setupSortableContainer');
            get(this, 'group').off('drag:stop', this, '_dragStop');
            get(this, 'group').off('sortable:stop', this, '_sortableStop');
            this.destroySortableContainer();
        }
    },
    actions: {
        dragStart(item) {
            trySet(this, 'group.dragItem', item);
        }
    }
}).reopenClass({
    positionalParams: ['items']
});
