import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
    logEvents: false,
    snappable: false,

    logEvent(name, event) {
        if(get(this, 'logEvents')) {
            //eslint-disable-next-line no-console
            console.log(`${name} fired!`, event);
        }
    },

    actions: {
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

        droppableDropped(event) {
            this.logEvent('droppable:dropped', event);
        },

        droppableReturned(event) {
            this.logEvent('droppable:returned', event);
        }
    }
});
