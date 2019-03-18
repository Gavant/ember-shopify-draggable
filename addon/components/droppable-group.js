import Component from '@ember/component';
import layout from '../templates/components/droppable-group';
import { get, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import BaseGroupMixin from '../mixins/base-group';

export default Component.extend(BaseGroupMixin, {
    layout,
    classNames: ['droppable-group'],
    droppable: alias('shopifyInstance'),
    droppableEvents: A([
        'dropped',
        'returned'
    ]),
    initializePublicEventListeners() {
        this._super(...arguments);
        this.bindEventListenersType('droppable');
    },
    async didInsertElement() {
        this._super(...arguments);
        const { Droppable, Plugins } = await import('@shopify/draggable');
        const plugins = A();
        if (get(this, 'resizeMirror')) {
            plugins.pushObject(Plugins.ResizeMirror);
        }
        if (get(this, 'snappable')) {
            plugins.pushObject(Plugins.Snappable);
        }
        if (get(this, 'collidable')) {
            plugins.pushObject(Plugins.Collidable);
        }
        const shopifyInstance = new Droppable([], {
            draggable: '.draggable-item',
            dropzone: '.droppable-dropzone',
            delay: get(this, 'delay'),
            handle: get(this, 'handle'),
            mirror: get(this, 'mirrorOptions'),
            collidables: get(this, 'collidables'),
            plugins
        });
        setProperties(this, {
            shopifyInstance,
            plugins: Plugins
        });
        this.initializePublicEventListeners();
        this.trigger('setupContainers');
    }
});
