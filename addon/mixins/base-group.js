import Mixin from '@ember/object/mixin';
import Evented from '@ember/object/evented';
import { get, observer } from '@ember/object';
import { scheduleOnce, bind } from '@ember/runloop';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';

export default Mixin.create(Evented, {
    //plugins
    resizeMirror: false,
    snappable: false,
    swapAnimation: false,
    collidable: false,


    // Draggable options
    // https://github.com/Shopify/draggable/tree/master/src/Draggable#options
    delay: 100,
    handle: null,

    //Draggable Mirror options
    //https://github.com/Shopify/draggable/tree/master/src/Draggable/Plugins/Mirror#options
    mirrorOptions: Object.freeze({
        constrainDimensions: true
    }),

    //SwapAnimation options
    //https://github.com/Shopify/draggable/tree/master/src/Plugins/SwapAnimation#options
    swapAnimationOptions: Object.freeze({
        duration: 150,
        easingFunction: 'ease-in-out',
        horizontal: false
    }),

    //Collidable options
    //https://github.com/Shopify/draggable/tree/master/src/Plugins/Collidable#options
    collidables: null,

    dragEvents: A([
        'start',
        'move',
        'over',
        'out',
        'stop',
        'pressure'
    ]),

    snapEvents: A([
        'in',
        'out'
    ]),

    collidableEvents: A([
        'in',
        'out'
    ]),

    resizeMirrorDidChange: observer('resizeMirror', function() {
        scheduleOnce('afterRender', this, 'togglePlugin', 'ResizeMirror', get(this, 'resizeMirror'));
    }),

    snappableDidChange: observer('snappable', function() {
        scheduleOnce('afterRender', this, 'togglePlugin', 'Snappable', get(this, 'snappable'));
    }),

    collidableDidChange: observer('collidable', function() {
        scheduleOnce('afterRender', this, 'togglePlugin', 'Collidable', get(this, 'collidable'));
    }),

    swapAnimationDidChange: observer('swapAnimation', function() {
        scheduleOnce('afterRender', this, 'togglePlugin', 'SwapAnimation', get(this, 'swapAnimation'));
    }),

    togglePlugin(plugin, enabled) {
        return get(this, 'shopifyInstance')[`${enabled ? 'add' : 'remove'}Plugin`](get(this, `plugins.${plugin}`));
    },

    initializePrivateEventListeners() {
        const shopifyInstance = get(this, 'shopifyInstance');
        get(this, '_events').forEach(eventName => {
            shopifyInstance.on(eventName, bind(this, 'trigger', eventName));
        });
    },

    initializePublicEventListeners() {
        this.bindEventListenersType('drag');
        this.bindEventListenersType('snap');
        this.bindEventListenersType('collidable');
    },

    bindEventListenersType(namespace) {
        const shopifyInstance = get(this, 'shopifyInstance');
        get(this, `${namespace}Events`).forEach(eventName => {
            shopifyInstance.on(`${namespace}:${eventName}`, bind(this, 'fireAction', namespace, eventName));
        });
    },

    fireAction(namespace, eventName, event) {
        const actions = get(this, `${namespace}Actions`);
        tryInvoke(actions, eventName, [event]);
    },
});
