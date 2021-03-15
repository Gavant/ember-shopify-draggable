import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

import SortableContainer from './sortable-container';

export interface SortableItemArgs {
    item: any;
    container: SortableContainer;
    dragStart: (item: any) => void;
}

export default class SortableItem extends Component<SortableItemArgs> {
    container?: HTMLElement;
    constructor(owner: unknown, args: SortableItemArgs) {
        super(owner, args);
        this.args.container.args.group.on('drag:start', this, '_dragStart');
    }

    /**
     * Get a unique id for the current editor instance
     *
     * @readonly
     * @memberof TinymceEditor
     */
    get uniqueId() {
        return `draggable-container-${guidFor(this)}`;
    }

    willDestroy() {
        this.args.container.args.group.off('drag:start', this, '_dragStart');
    }

    _dragStart(event) {
        const source = event.data.originalSource;
        if (this.container && this.container.isSameNode(source)) {
            this.args.dragStart(this.args.item);
        }
    }

    @action
    setupSortableItem(element: HTMLElement) {
        this.container = element;
    }
}
