import Controller from '@ember/controller';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
    logEvents: false,
    resizeMirror: true,
    snappable: false,
    swapAnimation: true,
    collidable: false,
    collidables: '.container-list > header',
    list: A([
        { name: "Item 1" },
        { name: "Item 2" },
        { name: "Item 3" }
    ]),
    listTwo: A([
        { name: "Item 4" },
        { name: "Item 5" },
        { name: "Item 6" }
    ]),
    listThree: A([
        { name: "Item 7" },
        { name: "Item 8" },
        { name: "Item 9" }
    ]),

    logEvent(name, event) {
        if(get(this, 'logEvents')) {
            //eslint-disable-next-line no-console
            console.log(`${name} fired!`, event);
        }
    },

    actions: {
        sortableStart(event) {
            this.logEvent('sortable:start', event);
        },

        sortableSort(event) {
            this.logEvent('sortable:sort', event);
        },

        sortableSorted(event) {
            this.logEvent('sortable:sorted', event);
        },

        sortableStop(event) {
            this.logEvent('sortable:stop', event);
        },

        dragStart(event) {
            this.logEvent('drag:start', event);
        },

        dragMove(event) {
            this.logEvent('drag:move', event);
        },

        dragOver(event) {
            this.logEvent('drag:over', event);
        },

        dragOut(event) {
            this.logEvent('drag:out', event);
        },

        dragStop(event) {
            this.logEvent('drag:stop', event);
        },

        snapIn(event) {
            this.logEvent('snap:in', event);
        },

        snapOut(event) {
            this.logEvent('snap:out', event);
        },

        collidableIn(event) {
            this.logEvent('collidable:in', event);
        },

        collidableOut(event) {
            this.logEvent('collidable:out', event);
        }
    }
});
