import Controller from '@ember/controller';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
    logEvents: false,
    snappable: false,
    swapAnimation: false,
    collidable: false,
    collidables: '.container-list > header',
    list: A([
        { name: "Item 1" },
        { name: "Item 2" },
        { name: "Item 3" },
        { name: "Item 4" },
        { name: "Item 5" },
        { name: "Item 6" }
    ]),

    logEvent(name, event) {
        if(get(this, 'logEvents')) {
            //eslint-disable-next-line no-console
            console.log(`${name} fired!`, event);
        }
    },

    actions: {
        swappableStart(event) {
            this.logEvent('swappable:start', event);
        },

        swappableSwap(event) {
            this.logEvent('swappable:swap', event);
        },

        swappableSwapped(event) {
            this.logEvent('swappable:swapped', event);
        },

        swappableStop(event) {
            this.logEvent('swappable:stop', event);
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
