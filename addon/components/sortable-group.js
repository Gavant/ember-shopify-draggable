import Component from '@ember/component';
import layout from '../templates/components/sortable-group';
import { get, setProperties, observer } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import Evented from '@ember/object/evented';

export default Component.extend(Evented, {
    layout,
    classNames: ['sortable-group'],
    sortable: null,
    constrainDimensions: true,
    resizeMirror: false,

    // Draggable options
    // https://github.com/Shopify/draggable/tree/master/src/Draggable#options
    delay: 100,
    handle: null,

    events: A([
        'sort',
        'sorted',
        'start',
        'stop'
    ]),
    _events: A([
        'drag:start',
        'drag:stop',
        'sortable:stop'
    ]),
    resizeMirrorDidChange: observer('resizeMirror', function() {
        get(this, 'sortable')[`${get(this, 'resizeMirror') ? 'add' : 'remove'}Plugin`](get(this, 'plugins').ResizeMirror);
    }),
    initializeEventListeners() {
        const sortable = get(this, 'sortable');
        get(this, 'events').forEach(eventName => {
            sortable.on(`sortable:${eventName}`, (event) => {
                tryInvoke(this, eventName, [event]);
            });
        });
    },
    async didInsertElement() {
        this._super(...arguments);
        // See https://github.com/ef4/ember-auto-import/issues/98
        const { Sortable, Plugins } = await import('@shopify/draggable');
        const plugins = A();
        if (get(this, 'resizeMirror')) {
            plugins.pushObject(Plugins.ResizeMirror);
        }
        const mirror = {
            constrainDimensions: get(this, 'constrainDimensions')
        }
        const sortable = new Sortable([], {
            draggable: '.sortable-item',
            delay: get(this, 'delay'),
            handle: get(this, 'handle'),
            mirror,
            plugins
        });
        setProperties(this, {
            sortable,
            plugins: Plugins
        });
        //Public Events
        this.initializeEventListeners();
        //Private Events
        get(this, '_events').forEach(eventName => {
            sortable.on(eventName, (event) => {
                this.trigger(eventName, event);
            });
        });
        this.trigger('setupContainers');
    },
    willDestroyElement() {
        this._super(...arguments);
        if (get(this, 'sortable')) {
            get(this, 'sortable').destroy();
        }
    }
});
