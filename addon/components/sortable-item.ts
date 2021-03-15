import { action } from '@ember/object';
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
