import Component from '@ember/component';
import layout from '../templates/components/swappable-group';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { tryInvoke } from '@ember/utils';
import { getOwner } from '@ember/application';

export default Component.extend({
    layout,
    classNames: ['swappable-group'],
    swappable: null,
    constrainDimensions: true,
    resizeMirror: false,
    events: A([
        'swap',
        'swapped',
        'start',
        'stop'
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
    async initializeGroup() {
        //Default swappable group array to be null, these will be added when the sortable groups insert into the DOM
        if (!get(this, 'fastboot.isFastBoot')) {
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
                mirror,
                plugins
            });
            set(this, 'swappable', swappable);
            this.initializeEventListeners();
        }
    },
    init() {
        this.initializeGroup();
        this._super(...arguments);
    },
    willDestroyElement() {
        get(this, 'swappable').destroy();
        this._super(...arguments);
    }
});
