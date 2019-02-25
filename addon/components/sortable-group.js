import Component from '@ember/component';
import layout from '../templates/components/sortable-group';
import { get, setProperties, computed, observer } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { getOwner } from '@ember/application';
import Evented from '@ember/object/evented';

export default Component.extend(Evented, {
    layout,
    classNames: ['sortable-group'],
    sortable: null,
    constrainDimensions: true,
    resizeMirror: false,
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
    fastboot: computed(function() {
        let owner = getOwner(this);
        return owner.lookup('service:fastboot');
    }),
    initializeEventListeners() {
        const sortable = get(this, 'sortable');
        get(this, 'events').forEach(eventName => {
            sortable.on(`sortable:${eventName}`, (event) => {
                tryInvoke(this, eventName, [event]);
            });
        });
    },
    async initializeGroup() {
        //Default sortable group array to be null, these will be added when the sortable groups insert into the DOM
        if (!get(this, 'fastboot.isFastBoot')) {
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
                mirror,
                plugins,
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
        }
    },
    init() {
        this.initializeGroup();
        this._super(...arguments);
    },
    willDestroyElement() {
        get(this, 'sortable').destroy();
        this._super(...arguments);
    }
});
