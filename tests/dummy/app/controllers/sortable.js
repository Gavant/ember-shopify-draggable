import Controller from '@ember/controller';
import { action, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class SortableController extends Controller {
    logEvents = false;
    resizeMirror = false;
    snappable = false;
    swapAnimation = false;
    collidable = false;
    collidables = '.container-list > header';

    @tracked list = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
    @tracked listTwo = [{ name: 'Item 4' }, { name: 'Item 5' }, { name: 'Item 6' }];
    @tracked listThree = [{ name: 'Item 7' }, { name: 'Item 8' }, { name: 'Item 9' }];

    @action
    logEvent(name, event) {
        if (get(this, 'logEvents')) {
            //eslint-disable-next-line no-console
            console.log(`${name} fired!`, event);
        }
    }
    @action
    sortableStart(event) {
        this.logEvent('sortable:start', event);
    }
    @action
    sortableSort(event) {
        this.logEvent('sortable:sort', event);
    }
    @action
    sortableSorted(event) {
        this.logEvent('sortable:sorted', event);
    }
    @action
    sortableStop(event) {
        this.logEvent('sortable:stop', event);
    }
    @action
    dragStart(event) {
        this.logEvent('drag:start', event);
    }
    @action
    dragMove(event) {
        this.logEvent('drag:move', event);
    }
    @action
    dragOver(event) {
        this.logEvent('drag:over', event);
    }
    @action
    dragOut(event) {
        this.logEvent('drag:out', event);
    }
    @action
    dragStop(event) {
        this.logEvent('drag:stop', event);
    }
    @action
    snapIn(event) {
        this.logEvent('snap:in', event);
    }
    @action
    snapOut(event) {
        this.logEvent('snap:out', event);
    }
    @action
    collidableIn(event) {
        this.logEvent('collidable:in', event);
    }
    @action
    collidableOut(event) {
        this.logEvent('collidable:out', event);
    }

    @action
    updateItems(name, newArray) {
        this[name] = newArray;
    }
}
