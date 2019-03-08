import Component from '@ember/component';
import layout from '../templates/components/swappable-group';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { tryInvoke } from '@ember/utils';
import { getOwner } from '@ember/application';
import Evented from '@ember/object/evented';

export default Component.extend(Evented, {
    layout,
    classNames: ['swappable-group'],
    swappable: null,
    constrainDimensions: true,
    resizeMirror: false,

    // Draggable options
    // https://github.com/Shopify/draggable/tree/master/src/Draggable#options
    delay: 100,
    handle: null,

    events: A([
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
    fastboot: computed(function() {
        let owner = getOwner(this);
        return owner.lookup('service:fastboot');
    }),
    initializeEventListeners() {
        const swappable = get(this, 'swappable');
        get(this, 'events').forEach(eventName => {
            swappable.on(`swappable:${eventName}`, (event) => {
                tryInvoke(this, eventName, [event]);
            });
        });
    },
    async didInsertElement() {
        this._super(...arguments);
        const { Swappable, Plugins } = await import('@shopify/draggable');
        const plugins = A();
        if (get(this, 'resizeMirror')) {
            plugins.pushObject(Plugins.ResizeMirror);
        }
        const mirror = {
            constrainDimensions: get(this, 'constrainDimensions')
        }
        const swappable = new Swappable([], {
            draggable: '.swappable-item',
            delay: get(this, 'delay'),
            handle: get(this, 'handle'),
            mirror,
            plugins
        });
        set(this, 'swappable', swappable);
        //Public Events
        this.initializeEventListeners();
        //Private Events
        get(this, '_events').forEach(eventName => {
            swappable.on(eventName, (event) => {
                this.trigger(eventName, event);
            });
        });
        this.trigger('setupContainers');
    },
    willDestroyElement() {
        if(get(this, 'swappable')) {
            get(this, 'swappable').destroy();
        }
        this._super(...arguments);
    }
});
