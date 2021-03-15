import { action } from '@ember/object';
import { next } from '@ember/runloop';
import Component from '@glimmer/component';

import { insertAt, moveElementTo, removeAt } from '@gavant/ember-shopify-draggable/utils';

export interface SortableContainerArgs {
    group: any;
    items: any[];
    itemAdded?: (items: any[], item: any, event: any) => void;
    itemReordered?: (items: any[], item: any, event: any) => void;
    itemRemoved?: (items: any[], item: any, event: any) => void;
}

export default class SortableContainer extends Component<SortableContainerArgs> {
    container?: HTMLElement;
    scheduleAdd?: {
        targetIndex: number;
        item: any;
        dragNode: HTMLElement;
    } | null = null;
    setupContainer() {
        const instance = this.args.group.shopifyInstance;

        instance?.addContainer(this.container);
    }

    destroyContainer() {
        this.args.group.shopifyInstance?.removeContainer(this.container);
    }

    _dragStop() {
        next(this, () => {
            const items = [...this.args.items];
            const scheduleAddEvent = this.scheduleAdd;
            if (scheduleAddEvent) {
                const element = document.getElementById(scheduleAddEvent.dragNode.id);
                element?.parentNode?.removeChild(element);
                insertAt(items, scheduleAddEvent.targetIndex, scheduleAddEvent.item);
                this.args.itemAdded?.(items, scheduleAddEvent.item, event);
                this.scheduleAdd = null;
            }
            this.args.group.dragItem = null;
        });
    }
    _sortableStop(event) {
        if (this.container) {
            let items = [...this.args.items];
            const targetContainer = event.data.newContainer;
            const targetIndex = event.data.newIndex;
            const oldContainer = event.data.oldContainer;
            const oldIndex = event.data.oldIndex;
            const item = this.args.group.dragItem;
            //Sorted within this container
            if (this.container.isSameNode(targetContainer) && this.container.isSameNode(oldContainer)) {
                items = moveElementTo(items, oldIndex, targetIndex);
                // items = removeAt(items, oldIndex);
                // items = insertAt(items, targetIndex, item);
                this.args.itemReordered?.(items, item, event);
            } else if (this.container.isSameNode(targetContainer)) {
                // added to this container
                //schedule the update to the items array until after we can remove the dragged node. This gives ember the ability to update correctly
                this.scheduleAdd = {
                    targetIndex,
                    item,
                    dragNode: event.data.dragEvent.source
                };
            } else if (this.container.isSameNode(oldContainer)) {
                // removed from this container
                items = removeAt(items, oldIndex);
                this.args.itemRemoved?.(items, item, event);
            }
        }
    }

    constructor(owner: unknown, args: SortableContainerArgs) {
        super(owner, args);
        if (this.args.group) {
            this.args.group.on('setupContainers', this, 'setupContainer');
            this.args.group.on('drag:stop', this, '_dragStop');
            this.args.group.on('sortable:stop', this, '_sortableStop');
        }
    }
    willDestroy() {
        if (this.args.group) {
            this.args.group.off('setupContainers', this, 'setupContainer');
            this.args.group.off('drag:stop', this, '_dragStop');
            this.args.group.off('sortable:stop', this, '_sortableStop');
        }
        this.destroyContainer();
    }

    @action
    dragStart(item) {
        this.args.group.dragItem = item;
    }

    @action
    setupContainerElement(element: HTMLElement) {
        this.container = element;
        this.setupContainer();
    }
}
