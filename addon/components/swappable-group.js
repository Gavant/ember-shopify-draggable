import Component from '@ember/component';
import layout from '../templates/components/swappable-group';
import { get, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import BaseGroupMixin from '../mixins/base-group';

export default Component.extend(BaseGroupMixin, {
    layout,
    classNames: ['swappable-group'],
    swappable: alias('shopifyInstance'),
    swappableEvents: A([
        'swap',
        'swapped',
        'start',
        'stop'
    ]),
    _events: A([
        'drag:start',
        'drag:stop',
        'swappable:stop',
        'swappable:swap'
    ]),
    initializePublicEventListeners() {
        this._super(...arguments);
        this.bindEventListenersType('swappable');
    },
    async didInsertElement() {
        this._super(...arguments);
        const { Swappable, Plugins } = await import('@shopify/draggable');
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
        const shopifyInstance = new Swappable([], {
            draggable: '.swappable-item',
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
        //Public Events
        this.initializePublicEventListeners();
        //Private Events
        this.initializePrivateEventListeners();
        this.trigger('setupContainers');
    }
});
